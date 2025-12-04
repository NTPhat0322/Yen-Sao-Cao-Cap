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
        public Task<GenericResult<LoginResponse>> Login(LoginRequest request)
        {
            throw new NotImplementedException();
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
