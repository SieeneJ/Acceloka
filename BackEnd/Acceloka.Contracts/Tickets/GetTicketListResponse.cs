namespace Acceloka.Contracts.Tickets
{
    public class GetTicketListResponse 
    {
        public List<TicketResponse> Tickets { get; set; } = new();
        public int TotalTickets { get; set; }
    }
}
