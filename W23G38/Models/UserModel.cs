
namespace W23G38.Models
{
    public class UserModel
    {
        public string? ID { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public List<Role>? Roles { get; set; }
    }
}
