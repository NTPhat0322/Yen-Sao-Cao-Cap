using Application.DTOs.Auth;
using Application.Helpers;
using Application.Interfaces;
using Domain.Entities;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService(IUnitOfWork unitOfWork) : IUserService
    {
        public async Task<GenericResult<LoginResponse>> Login(LoginRequest request)
        {
            //check phone number exist
            var user = await unitOfWork.Users.GetByPhoneNumber(request.PhoneNumber);
            if (user is null)
            {
                return GenericResult<LoginResponse>.Failure("Phone number does not exist");
            }
            //check password
            bool isPasswordValid = PasswordHasher.VerifyPassword(request.Password, user.HashedPassword);
            if (!isPasswordValid)
            {
                return GenericResult<LoginResponse>.Failure("Invalid password");
            }

            //create access and refresh token
            var accessToken = JwtHelper.CreateToken(user);
            var refreshToken = RefreshTokenHelper.GenerateRefreshToken();

            await unitOfWork.BeginTransactionAsync();
            //hash refresh token and store to db
            var hashedRefreshToken = RefreshTokenHelper.HashRefreshToken(refreshToken);
            await unitOfWork.RefreshTokens.AddAsync(new RefreshToken(hashedRefreshToken, DateTime.UtcNow.AddDays(7), user));
            
            var rs = await unitOfWork.CommitAsync();
            if (rs <= 0)
                return GenericResult<LoginResponse>.Failure("login failed by saving refresh token to db.");

            return GenericResult<LoginResponse>.Success(new LoginResponse { 
                RefreshToken = refreshToken,
                AccessToken = accessToken
            }, "Login successful");

        }

        public async Task<GenericResult<string>> Register(RegisterRequest request)
        {
            //check xem phone number or email exist
            var user = await unitOfWork.Users.GetByPhoneNumber(request.PhoneNumber);
            if (user is not null)
            {
                return GenericResult<string>.Failure("Phone number already exists");
            }
            user = await unitOfWork.Users.GetByEmailAsync(request.Email);
            if (user is not null)
            {
                return GenericResult<string>.Failure("Email already exists");
            }
            var hashedPassword = PasswordHasher.HashPassword(request.Password);
            var newUser = new User(email: request.Email, phoneNumber: request.PhoneNumber, firstName: request.FirstName, lastName: request.LastName, hashedPassword: hashedPassword);

            await unitOfWork.BeginTransactionAsync();
            await unitOfWork.Users.AddAsync(newUser);
            int rs = await unitOfWork.CommitAsync();

            if (rs > 0)
            {
                return GenericResult<string>.Success("", message: "Register successful");
            }
            else
            {
                return GenericResult<string>.Failure("Register failed");
            }
        }
    }
}
