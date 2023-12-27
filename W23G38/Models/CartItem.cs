using W23G38.Data;

namespace W23G38.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }
        public string? UserId { get; set; }
        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public ApplicationUser? User { get; set; }
        public Product? Product { get; set; }
    }
}
