

namespace Domain.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        public IUserRepository Users { get; }
        public IRefreshTokenRepository RefreshTokens { get; }
        Task BeginTransactionAsync();
        Task<int> CommitAsync();
    }
}
