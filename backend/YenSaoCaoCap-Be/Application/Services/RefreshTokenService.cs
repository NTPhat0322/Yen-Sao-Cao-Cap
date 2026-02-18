using Application.DTOs.Auth;
using Application.Helpers;
using Application.Interfaces;
using Domain.Entities;
using Domain.Repositories;

namespace Application.Services
{
    public class RefreshTokenService(IUnitOfWork unitOfWork) : IRefreshTokenService
    {
        public async Task<GenericResult<RefreshTokenResponse>> RefreshTokenAsync(RefreshTokenRequest request)
        {
            await unitOfWork.BeginTransactionAsync();
            //get all refresh tokens from db
            var refreshTokens = await unitOfWork.RefreshTokens.GetAllAsync(true);
            //check if the provided refresh token exists in the db
            //if (!refreshTokens.Any(rt => RefreshTokenHelper.VerifyRefreshToken(request.RefreshToken, rt.HashedToken)))
            //{
            //    return GenericResult<RefreshTokenResponse>.Failure("Invalid refresh token.");
            //}
            RefreshToken? rs = null;
            foreach (var rf in refreshTokens)
            {
                if(RefreshTokenHelper.VerifyRefreshToken(request.RefreshToken, rf.HashedToken))
                {
                    rs = rf;
                    break;
                }
            }
            if (rs == null)
            {
                return GenericResult<RefreshTokenResponse>.Failure("Invalid refresh token.");
            }

            //get user associated with the refresh token
            var user = await unitOfWork.Users.GetByIdAsync(rs.UserId);

            //generate new access token
            var newAccessToken = JwtHelper.CreateToken(rs.User);

            return GenericResult<RefreshTokenResponse>.Success(new RefreshTokenResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = request.RefreshToken
            }, "renew access token successfully");
        }
    }
}
