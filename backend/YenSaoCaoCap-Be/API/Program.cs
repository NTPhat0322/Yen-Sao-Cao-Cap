using API.FluentValidation;
using API.Middlewares;
using Application.DTOs.Auth;
using Application.Interfaces;
using Application.Services;
using Domain.Repositories;
using DotNetEnv;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Threading.RateLimiting;

Env.Load();
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new() { Title = "API Gateway", Version = "v1" });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter token"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

//database
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

//rate limitng 
builder.Services.AddRateLimiter(RateLimiterOptions =>
{
    RateLimiterOptions.AddSlidingWindowLimiter("sliding", o =>
    {
        o.PermitLimit = 60;
        o.Window = TimeSpan.FromSeconds(10);
        o.SegmentsPerWindow = 6;
        o.QueueLimit = 2;
        o.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });
    RateLimiterOptions.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
});

//DI
//builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();

//DI for FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddTransient<IValidator<RegisterRequest>, RegisterValidator>();

//cors policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // change to your frontend URL
                  .AllowAnyHeader()                 
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

var app = builder.Build();

//auto migrate and seed database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    var retries = 5;
    for (int i = 0; i < retries; i++)
    {
        try
        {
            // Create DB if it doesnt exist and apply all migrations
            await db.Database.MigrateAsync();
            Console.WriteLine("Database migrated and seeded successfully.");
            break;
        }
        catch (Exception)
        {
            Console.WriteLine($"Database not ready, retrying in 5s... ({i + 1}/{retries})");
            await Task.Delay(5000);
            if (i == retries - 1) throw;
        }
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseMiddleware<GlobalExceptionHandler>();
app.UseAuthorization();

app.UseRateLimiter();

app.MapControllers().RequireRateLimiting("sliding");

app.Run();
