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
            new Category { CategoryName = "Train" },
            new Category { CategoryName = "Boat" },
            new Category { CategoryName = "Flight" }
        };

        await context.Categories.AddRangeAsync(categories);
        await context.SaveChangesAsync();

        var concert = categories.First(c => c.CategoryName == "Concert");
        var cinema = categories.First(c => c.CategoryName == "Cinema");
        var hotel = categories.First(c => c.CategoryName == "Hotel");
        var train = categories.First(c => c.CategoryName == "Train");
        var boat = categories.First(c => c.CategoryName == "Boat");
        var plane = categories.First(c => c.CategoryName == "Flight");

        var tickets = new List<Ticket>
        {
            // CONCERT
            new Ticket { TicketCode = "CON001", TicketName = "Coldplay World Tour", EventDate = DateTime.UtcNow.AddMonths(3), Price = 2500000, Quota = 500, CategoryId = concert.CategoryId },
            new Ticket { TicketCode = "CON002", TicketName = "Tulus Live in Jakarta", EventDate = DateTime.UtcNow.AddMonths(2), Price = 1200000, Quota = 300, CategoryId = concert.CategoryId },
            new Ticket { TicketCode = "CON003", TicketName = "Festival Musik Musim Panas", EventDate = DateTime.UtcNow.AddMonths(4), Price = 850000, Quota = 800, CategoryId = concert.CategoryId },

            // CINEMA
            new Ticket { TicketCode = "CIN001", TicketName = "Marvel: Secret Wars IMAX", EventDate = DateTime.UtcNow.AddDays(10), Price = 75000, Quota = 150, CategoryId = cinema.CategoryId },
            new Ticket { TicketCode = "CIN002", TicketName = "Avatar 3 Premiere Night", EventDate = DateTime.UtcNow.AddDays(20), Price = 100000, Quota = 120, CategoryId = cinema.CategoryId },

            // HOTEL
            new Ticket { TicketCode = "HOT001", TicketName = "Voucher Hotel Bintang 5 Bali", EventDate = DateTime.UtcNow.AddMonths(6), Price = 2500000, Quota = 50, CategoryId = hotel.CategoryId },
            new Ticket { TicketCode = "HOT002", TicketName = "Staycation Jakarta Luxury Suite", EventDate = DateTime.UtcNow.AddMonths(1), Price = 1800000, Quota = 40, CategoryId = hotel.CategoryId },

            // LAND
            new Ticket { TicketCode = "TRA001", TicketName = "Kereta Argo Nusantara Prima", EventDate = DateTime.UtcNow.AddDays(5), Price = 550000, Quota = 100, CategoryId = train.CategoryId },
            new Ticket { TicketCode = "TRA002", TicketName = "Kereta Argo Bromo Anggrek", EventDate = DateTime.UtcNow.AddDays(7), Price = 600000, Quota = 80, CategoryId = train.CategoryId },

            // SEA
            new Ticket { TicketCode = "SEA001", TicketName = "Ferry Express Merak-Bakauheni", EventDate = DateTime.UtcNow.AddDays(12), Price = 250000, Quota = 200, CategoryId = boat.CategoryId },
            new Ticket { TicketCode = "SEA002", TicketName = "Cruise Singapore 3D2N", EventDate = DateTime.UtcNow.AddMonths(2), Price = 3500000, Quota = 60, CategoryId = boat.CategoryId },

            // AIR
            new Ticket { TicketCode = "AIR001", TicketName = "Jakarta-Bali Economy", EventDate = DateTime.UtcNow.AddDays(15), Price = 1100000, Quota = 90, CategoryId = plane.CategoryId },
            new Ticket { TicketCode = "AIR002", TicketName = "Jakarta-Singapore Business", EventDate = DateTime.UtcNow.AddDays(18), Price = 4500000, Quota = 25, CategoryId = plane.CategoryId },
        };

        await context.Tickets.AddRangeAsync(tickets);
        await context.SaveChangesAsync();
    }
}
