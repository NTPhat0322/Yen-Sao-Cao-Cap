using Domain.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class RefreshToken : BaseEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string HashedToken { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; } = DateTime.UtcNow.AddDays(7);
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        private RefreshToken() { }
        public RefreshToken(string hashedToken, DateTime expiresAt, User user)
        {
            HashedToken = hashedToken;
            ExpiresAt = expiresAt;
            User = user;
        }
    }
}
