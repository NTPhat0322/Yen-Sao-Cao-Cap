

namespace Domain.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        public IUserRepository Users { get; }
        Task BeginTransactionAsync();
        Task<int> CommitAsync();
    }
}
