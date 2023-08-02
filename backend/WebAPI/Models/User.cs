using System.Collections.Generic;

namespace WebAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string FullLastName { get; set; }
        public string NameUser { get; set; }
        public string Email { get; set; }
        public int Password { get; set; }
        public string Date { get; set; }
    }
}
