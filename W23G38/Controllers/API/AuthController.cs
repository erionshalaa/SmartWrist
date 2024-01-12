using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using W23G38.Data;
using W23G38.Models;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;

namespace W23G38.Controllers.API
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _context;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration config, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _context = context;
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUserProfile()
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString();
            var userId = "";
            if (token.StartsWith("Bearer ") && token.Length > 7)
            {
                var jwtEncodedString = token.Substring(7);
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(jwtEncodedString) as JwtSecurityToken;

                if (jwtToken != null)
                {
                    userId = jwtToken.Subject;
                }
            }

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new { Message = "User ID not found in claims" });
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            var userProfile = new
            {
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                Id = user.Id,
                Roles = userRoles
            };

            return Ok(new { Message = "User profile retrieved successfully", Data = userProfile });
        }

        [HttpPut("updateuser")]
        public async Task<IActionResult> UpdateUserProfile(UserModel model)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString();
            var userId = "";
            if (token.StartsWith("Bearer ") && token.Length > 7)
            {
                var jwtEncodedString = token.Substring(7);
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(jwtEncodedString) as JwtSecurityToken;

                if (jwtToken != null)
                {
                    userId = jwtToken.Subject;
                }
            }

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new { Message = "User ID not found in claims" });
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            var existingUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingUser != null && existingUser.Id != user.Id)
            {
                return BadRequest(new { Message = "Email is already in use" });
            }

            user.Name = model.Name;
            user.Surname = model.Surname;
            user.Email = model.Email;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok(new { Message = "User profile updated successfully" });
            }
            else
            {
                return BadRequest(new { Message = "Failed to update user profile" });
            }
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Issuer"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(120), 
                    signingCredentials: creds
                );

                return Ok(new
                {
                    Message = "Login successful",
                    Token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            else
            {
                return BadRequest(new { Message = "Invalid login attempt" });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {

            var user = new ApplicationUser { UserName = model.Email, Name = model.Name, Surname = model.Surname, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "User");
                return Ok(new { Message = "Registration successful" });
            }
            else
            {
                return BadRequest(new { Message = "Registration failed" });
            }
        }
    }
}
