using System;
using System.Collections.Generic;
using System.Text;

namespace Acceloka.Entities
{
    public partial class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHashed { get; set; } = null!;

        public string FullName { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<BookedTicket> BookedTickets { get; set; } = new List<BookedTicket>();
    }
}
