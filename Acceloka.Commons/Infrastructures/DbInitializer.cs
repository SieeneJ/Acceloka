using Acceloka.Entities;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Commons.Infrastructure;

public static class DbInitializer
{
    public static async Task InitializeAsync(AccelokaContext context)
    {
        await context.Database.MigrateAsync();

        if (await context.Categories.AnyAsync())
            return;

        var categories = new List<Category>
        {
            new Category { CategoryName = "Concert" },
            new Category { CategoryName = "Cinema" },
            new Category { CategoryName = "Hotel" },
            new Category { CategoryName = "Transportasi Darat" },
            new Category { CategoryName = "Transportasi Laut" },
            new Category { CategoryName = "Transportasi Udara" }
        };

        await context.Categories.AddRangeAsync(categories);
        await context.SaveChangesAsync();

        var concert = categories.First(c => c.CategoryName == "Concert");
        var cinema = categories.First(c => c.CategoryName == "Cinema");

        var tickets = new List<Ticket>
        {
            // CONCERT
            new Ticket { TicketCode = "CON001", TicketName = "Coldplay World Tour", EventDate = DateTime.UtcNow.AddMonths(3), Price = 2500000, Quota = 500, CategoryId = 1 },
            new Ticket { TicketCode = "CON002", TicketName = "Tulus Live in Jakarta", EventDate = DateTime.UtcNow.AddMonths(2), Price = 1200000, Quota = 300, CategoryId = 1 },
            new Ticket { TicketCode = "CON003", TicketName = "Festival Musik Musim Panas", EventDate = DateTime.UtcNow.AddMonths(4), Price = 850000, Quota = 800, CategoryId = 1 },

            // CINEMA
            new Ticket { TicketCode = "CIN001", TicketName = "Marvel: Secret Wars IMAX", EventDate = DateTime.UtcNow.AddDays(10), Price = 75000, Quota = 150, CategoryId = 2 },
            new Ticket { TicketCode = "CIN002", TicketName = "Avatar 3 Premiere Night", EventDate = DateTime.UtcNow.AddDays(20), Price = 100000, Quota = 120, CategoryId = 2 },

            // HOTEL
            new Ticket { TicketCode = "HOT001", TicketName = "Voucher Hotel Bintang 5 Bali", EventDate = DateTime.UtcNow.AddMonths(6), Price = 2500000, Quota = 50, CategoryId = 3 },
            new Ticket { TicketCode = "HOT002", TicketName = "Staycation Jakarta Luxury Suite", EventDate = DateTime.UtcNow.AddMonths(1), Price = 1800000, Quota = 40, CategoryId = 3 },

            // DARAT
            new Ticket { TicketCode = "DAR001", TicketName = "Bus Eksekutif Jakarta-Bandung", EventDate = DateTime.UtcNow.AddDays(5), Price = 150000, Quota = 100, CategoryId = 4 },
            new Ticket { TicketCode = "DAR002", TicketName = "Kereta Argo Bromo Anggrek", EventDate = DateTime.UtcNow.AddDays(7), Price = 600000, Quota = 80, CategoryId = 4 },

            // LAUT
            new Ticket { TicketCode = "SEA001", TicketName = "Ferry Express Merak-Bakauheni", EventDate = DateTime.UtcNow.AddDays(12), Price = 250000, Quota = 200, CategoryId = 5 },
            new Ticket { TicketCode = "SEA002", TicketName = "Cruise Singapore 3D2N", EventDate = DateTime.UtcNow.AddMonths(2), Price = 3500000, Quota = 60, CategoryId = 5 },

            // UDARA
            new Ticket { TicketCode = "AIR001", TicketName = "Jakarta-Bali Economy", EventDate = DateTime.UtcNow.AddDays(15), Price = 1100000, Quota = 90, CategoryId = 6 },
            new Ticket { TicketCode = "AIR002", TicketName = "Jakarta-Singapore Business", EventDate = DateTime.UtcNow.AddDays(18), Price = 4500000, Quota = 25, CategoryId = 6 },
        };

        await context.Tickets.AddRangeAsync(tickets);
        await context.SaveChangesAsync();
    }
}
