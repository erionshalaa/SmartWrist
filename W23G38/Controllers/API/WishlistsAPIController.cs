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
    public class WishlistsAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WishlistsAPIController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("UserItems")]
        public async Task<ActionResult<IEnumerable<Wishlist>>> GetUserWishlistItems()
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

                        var userWishlistItems = await _context.Wishlist
                            .Where(item => item.UserId == userId)
                            .Include(item => item.Product)
                            .ToListAsync();

                        return Ok(userWishlistItems);
                    }
                }

                return BadRequest("Invalid token format or missing user ID");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving wishlist items: {ex.Message}");
            }
        }


        // GET: api/WishlistsAPI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wishlist>>> GetWishlist()
        {
            if (_context.Wishlist == null)
            {
                return NotFound();
            }
            return await _context.Wishlist.ToListAsync();
        }

        // GET: api/WishlistsAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Wishlist>> GetWishlist(int id)
        {
            if (_context.Wishlist == null)
            {
                return NotFound();
            }
            var wishlist = await _context.Wishlist.FindAsync(id);

            if (wishlist == null)
            {
                return NotFound();
            }

            return wishlist;
        }

        // PUT: api/WishlistsAPI/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishlist(int id, Wishlist wishlist)
        {
            if (id != wishlist.Id)
            {
                return BadRequest();
            }

            _context.Entry(wishlist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishlistExists(id))
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

        // POST: api/WishlistsAPI
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Wishlist>> PostWishlist(Wishlist wishlist)
        {
            if (_context.Wishlist == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Wishlist'  is null.");
            }
            _context.Wishlist.Add(wishlist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWishlist", new { id = wishlist.Id }, wishlist);
        }

        // DELETE: api/WishlistsAPI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishlist(int id)
        {
            if (_context.Wishlist == null)
            {
                return NotFound();
            }
            var wishlist = await _context.Wishlist.FindAsync(id);
            if (wishlist == null)
            {
                return NotFound();
            }

            _context.Wishlist.Remove(wishlist);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WishlistExists(int id)
        {
            return (_context.Wishlist?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpDelete]
        public async Task<IActionResult> ClearWishlist()
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

                        var userWishlistItems = await _context.Wishlist
                            .Where(item => item.UserId == userId)
                            .ToListAsync();

                        _context.Wishlist.RemoveRange(userWishlistItems);
                        await _context.SaveChangesAsync();

                        return NoContent();
                    }
                }

                return BadRequest("Invalid token format or missing user ID");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error clearing wishlist: {ex.Message}");
            }
        }
    }
}
