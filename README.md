# Acceloka Ticket Booking API

Acceloka Ticket Booking API is a RESTful backend service built with *.NET 10*, following the *MARVEL* architecture pattern.

## ✨ Features
1. View Available Tickets
2. Booking Ticket
3. View Booked Ticket
4. Update Booked Ticket
5. Revoke Booked Ticket

## 🛠️ Technical Specifications

- Framework: ASP.NET 10.
- Database: SQL Server or PostgreSQL.
- Architecture Pattern: MARVEL Pattern.
- Core Libraries: MediatR for command handling and FluentValidation for data validation.
- Logging: Serilog with File Sink configuration.
  - Level: Information.
  - Path: /logs folder.
  - Naming Convention: Log-{yyyyMMdd}.txt.
 
## 📁 Architecture
```
Acceloka
├── WebApi        → Controllers (API Layer)
├── Contracts     → Request & Response Models
├── Entities      → DbContext & Database Models
└── Commons       → MediatR Handlers (Business Logic)
```

## Connecting to Database
This project uses .NET User Secrets to securely store the SQL Server connection string.

Initialize user secrets (if not already initialized):
```bash
# Go to the API Project
cd Acceloka.WebApi

# Initialize and set string to connect DB
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:SQLServerDB" "Server={YOUR_SERVER_NAME};Database={YOUR_DATABASE_NAME};Trusted_Connection=True;Encrypt=false"
```
Make sure your SQL Server Instance is Running

## 🚀 Run the Application
```
dotnet run
```
The API will run on
```
http://localhost:5235
```

# API Endpoints
### 1. Available Tickets View
Endpoint: `GET api/v1/get-available-ticket.`  
Functionality: Displays tickets with remaining quota.
Features:
1. Search: Filter by Category Name, Ticket Code, Ticket Name, Price (max price), and Event Date range.
    - GET `/api/v1/tickets?categoryName=Concert&maxPrice=2000000`
2. Sorting: Supports ordering by any displayed column in Ascending or Descending state.
    - GET `/api/v1/tickets?orderBy=price&orderState=desc`
3. Default Behavior: If no sort is provided, it defaults to Ticket Code (Ascending).
4. Pagination: Includes pagination with 10 items per page and a total ticket count.
    - GET `/api/v1/tickets?pageNumber=2`

### 2. Ticket Booking
Endpoint: POST `api/v1/book-ticket.`  
Functionality: Book ticket according to TicketCode and Quantity

### 3. Booking Details
Endpoint: GET `api/v1/get-booked-ticket/{BookedTicketId}.`  
Functionality: Retrieves details of a specific booking and grouped by ticket category.

### 4. Edit Booking
Update: PUT `api/v1/edit-booked-ticket/{BookedTicketId}`  
Functionality: Modify ticket quantities while respecting available quota.  

### 5. Revoke Booking
Revoke: DELETE `api/v1/revoke-ticket/{BookedTicketId}/{TicketCode}/{Qty}`  
Functionality: Partially or fully cancel a booking.

# 🛡️ Validation Rules
- Ticket must exist
- Ticket quota must be sufficient
- Event date must not be expired
- Quantity must be greater than 0
