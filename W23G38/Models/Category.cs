namespace W23G38.Models
{
    public class Category
    {
        public string? Id { get; set; }
        public string? Name { get; set; }

        // Navigation property to represent the relationship with products
        public ICollection<Product>? Products { get; set; }
    }
}