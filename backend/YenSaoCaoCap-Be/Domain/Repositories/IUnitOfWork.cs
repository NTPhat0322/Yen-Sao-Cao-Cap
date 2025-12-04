

namespace Domain.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        Task BeginTransactionAsync();
        Task<int> CommitAsync();
    }
}
