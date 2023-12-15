using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Threading.Tasks;
using W23G38.Data;
using W23G38.Models;

namespace W23G38.Controllers
{
    public class UsersController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public UsersController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            var usersFromAspNet = await _userManager.Users.ToListAsync();

            var users = new List<UserModel>();
            foreach (var user in usersFromAspNet)
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var roles = userRoles.Select(roleName => new Role
                {
                    Name = roleName
                }).ToList();

                var userModel = new UserModel
                {
                    ID = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    Surname = user.Surname,
                    Roles = roles
                };

                users.Add(userModel);
            }

            return View(users);
        }


        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            var roles = userRoles.Select(roleName => new Role
            {
                Name = roleName
            }).ToList();

            var userModel = new UserModel
            {
                ID = user.Id,
                Email = user.Email,
                Roles = roles
            };

            return View(userModel);
        }

        public async Task<IActionResult> Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var userModel = new UserModel
            {
                ID = user.Id,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname
            };

            return View(userModel);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("ID, Email, Name, Surname")] UserModel userModel)
        {
            if (id != userModel.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return NotFound();
                }

                var existingUserWithEmail = await _userManager.FindByEmailAsync(userModel.Email);
                if (existingUserWithEmail != null && existingUserWithEmail.Id != user.Id)
                {
                    ModelState.AddModelError("Email", "Email already exists in the database.");
                    return View(userModel);
                }

                user.Email = userModel.Email;
                user.Name = userModel.Name;
                user.Surname = userModel.Surname;

                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return RedirectToAction(nameof(Index));
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }
            return View(userModel);
        }


        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            var roles = userRoles.Select(roleName => new Role
            {
                Name = roleName
            }).ToList();

            var userModel = new UserModel
            {
                ID = user.Id,
                Email = user.Email,
                Roles = roles
                // Map other properties as needed
            };

            return View(userModel);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                var result = await _userManager.DeleteAsync(user);
                if (result.Succeeded)
                {
                    return RedirectToAction(nameof(Index));
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }
            return RedirectToAction(nameof(Delete), new { id = id });
        }
    }
}
