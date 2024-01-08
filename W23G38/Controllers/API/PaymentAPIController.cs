using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using W23G38.Models;

namespace W23G38.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentAPIController : ControllerBase
    {
        private readonly StripeSettings _stripeOptions;

        public PaymentAPIController(IOptions<StripeSettings> stripeOptions)
        {
            _stripeOptions = stripeOptions.Value;
            StripeConfiguration.ApiKey = _stripeOptions.SecretKey;
        }

        [HttpPost]
        [Route("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] List<CartItem> cartItems)
        {
            try
            {
                StripeConfiguration.ApiKey = "sk_test_51OVAlQI0XTOHhZpHwTbWajt0HeXbwI5zjAapFEL77QpjEc8Hcezxk1Q4AOTRcyTfsU18uLcl6fwqWscw25W2fWcg00ZR2wTivE";

                if (cartItems == null || cartItems.Count == 0)
                {
                    return BadRequest(new { error = "No cart items provided" });
                }

                var lineItems = new List<SessionLineItemOptions>();

                foreach (var item in cartItems)
                {
                    var lineItem = new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = item.Product.Name,
                            },
                            UnitAmount = (long?)((float)item.Product.Price * 100),
                        },
                        Quantity = item.Quantity,
                    };

                    lineItems.Add(lineItem);
                }

                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string> { "card" },
                    LineItems = lineItems,
                    Mode = "payment",
                    SuccessUrl = "http://localhost:3000/success",
                    CancelUrl = "http://localhost:3000/checkout",
                };


                var service = new SessionService();
                var session = await service.CreateAsync(options);

                return Ok(new { id = session.Id });
            }
            catch (StripeException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while creating checkout session" });
            }
        }
    }
}
