﻿using System.ComponentModel;

namespace W23G38.Models
{
    public class Product
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; }
        public string? ImageUrl { get; set; }
        [DisplayName("Status")]
        public string? AvailableUnits { get; set; }
        public string? Description { get; set; }
        public string? CategoryId { get; set; }
        public Category? Category { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
