using Application.DTOs.Auth;
using Application.Helpers;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IUserService userService) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Login()
        {             
            // Placeholder for login logic
            return Ok(new { Message = "Login successful" });
        }

        [HttpPost("/register")]
        public async Task<ActionResult<GenericResult<string>>> Register([FromBody] RegisterRequest request)
        {
            var rs = await userService.Register(request);
            return Ok(rs);
        }
    }
}
