using Application.DTOs.Auth;
using FluentValidation;

namespace API.FluentValidation
{
    public class RegisterValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterValidator()
        {
            RuleFor(r => r.FirstName)
                .NotEmpty().WithMessage("First name is required.")
                .MaximumLength(50).WithMessage("First name must not exceed 50 characters.");
            RuleFor(r => r.LastName)
                .NotEmpty().WithMessage("Last name is required.")
                .MaximumLength(50).WithMessage("Last name must not exceed 50 characters.");
            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("A valid email is required.");
            RuleFor(r => r.PhoneNumber)
                .NotEmpty().WithMessage("Phone number is required.");
            RuleFor(r => r.Password)
                .NotEmpty().WithMessage("Password is required.");
                //.MinimumLength(6).WithMessage("Password must be at least 6 characters long.");
        }
    }
}
