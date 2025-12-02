using Domain.Abstraction;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User : BaseEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string HashedPassword { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public List<RefreshToken> RefreshTokens { get; set; } = new();
        private User() { }
        public User(string email, string phoneNumber, string hashedPassword, string firstName, string lastName)
        {
            Email = email;
            PhoneNumber = phoneNumber;
            HashedPassword = hashedPassword;
            FirstName = firstName;
            LastName = lastName;
        }
    }
}
