
using Microsoft.AspNetCore.Identity;


namespace W23G38.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
    }
}
