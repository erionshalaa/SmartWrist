using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using W23G38.Data;
using W23G38.Models;

namespace W23G38.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartItemsAPIController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("UserCartItems")]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetUserCartItems()
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"].ToString();
                if (token.StartsWith("Bearer ") && token.Length > 7)
                {
                    var jwtEncodedString = token.Substring(7); 
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var jwtToken = tokenHandler.ReadToken(jwtEncodedString) as JwtSecurityToken;

                    if (jwtToken != null)
                    {
                        var userId = jwtToken.Subject; 

                        var userCartItems = await _context.CartItems
                            .Where(item => item.UserId == userId)
                            .Include(item => item.Product)
                            .ToListAsync();

                        return Ok(userCartItems);
                    }
                }

                return BadRequest("Invalid token format or missing user ID");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving cart items: {ex.Message}");
            }
        }


        // GET: api/CartItemsAPI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
          if (_context.CartItems == null)
          {
              return NotFound();
          }
            return await _context.CartItems.ToListAsync();
        }

        // GET: api/CartItemsAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(int id)
        {
          if (_context.CartItems == null)
          {
              return NotFound();
          }
            var cartItem = await _context.CartItems.FindAsync(id);

            if (cartItem == null)
            {
                return NotFound();
            }

            return cartItem;
        }
        [HttpPut("UpdateQuantity/{id}")]
        public async Task<IActionResult> UpdateCartItemQuantity(int id, [FromBody] int newQuantity)
        {
            try
            {
                var existingCartItem = await _context.CartItems.FindAsync(id);

                if (existingCartItem == null)
                {
                    return NotFound();
                }

                existingCartItem.Quantity = newQuantity;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating quantity: {ex.Message}");
            }
        }

        // PUT: api/CartItemsAPI/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartItem(int id, CartItem cartItem)
        {
            if (id != cartItem.CartItemId)
            {
                return BadRequest();
            }

            _context.Entry(cartItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CartItemsAPI
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CartItem>> PostCartItem(CartItem cartItem)
        {
          if (_context.CartItems == null)
          {
              return Problem("Entity set 'ApplicationDbContext.CartItems'  is null.");
          }
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCartItem", new { id = cartItem.CartItemId }, cartItem);
        }

        // DELETE: api/CartItemsAPI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            if (_context.CartItems == null)
            {
                return NotFound();
            }
            var cartItem = await _context.CartItems.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/CartItemsAPI
        [HttpDelete]
        public async Task<IActionResult> ClearCart()
        {
            try
            {
                // Retrieve the user's cart items and remove all of them
                var token = HttpContext.Request.Headers["Authorization"].ToString();
                if (token.StartsWith("Bearer ") && token.Length > 7)
                {
                    var jwtEncodedString = token.Substring(7);
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var jwtToken = tokenHandler.ReadToken(jwtEncodedString) as JwtSecurityToken;

                    if (jwtToken != null)
                    {
                        var userId = jwtToken.Subject;

                        var userCartItems = await _context.CartItems
                            .Where(item => item.UserId == userId)
                            .ToListAsync();

                        _context.CartItems.RemoveRange(userCartItems);
                        await _context.SaveChangesAsync();

                        return NoContent();
                    }
                }

                return BadRequest("Invalid token format or missing user ID");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error clearing cart: {ex.Message}");
            }
        }
        private bool CartItemExists(int id)
        {
            return (_context.CartItems?.Any(e => e.CartItemId == id)).GetValueOrDefault();
        }
    }
}
