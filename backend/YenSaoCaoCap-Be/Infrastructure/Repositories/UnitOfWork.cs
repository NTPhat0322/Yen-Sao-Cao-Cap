

using Domain.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore.Storage;

namespace Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private IDbContextTransaction? _transaction;

        public IUserRepository Users { get; }
        public IRefreshTokenRepository RefreshTokens { get; }

        public UnitOfWork(AppDbContext context, IUserRepository users, IRefreshTokenRepository refreshTokens)
        {
            _context = context;
            Users = users;
            RefreshTokens = refreshTokens;
        }

        public async Task BeginTransactionAsync()
        {
            if (_transaction is null)
            {
                _transaction = await _context.Database.BeginTransactionAsync();
            }
        }

        public async Task<int> CommitAsync()
        {
            try
            {
                int result = await _context.SaveChangesAsync();
                if (_transaction is not null)
                {
                    await _transaction.CommitAsync();
                }
                return result;
            }
            catch
            {
                await RollbackAsync();
                await DisposeTransactionAsync();
                throw;
            }
            finally
            {
                await DisposeTransactionAsync();
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        private async Task RollbackAsync()
        {
            if (_transaction is not null)
            {
                await _transaction.RollbackAsync();
            }
        }

        private async Task DisposeTransactionAsync()
        {
            if (_transaction is not null)
            {
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

    }
}
