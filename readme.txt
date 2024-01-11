-----------------create a room-----------------
Post request to => /rooms
{
    "name": "room 3",
    "seats": 23,
    "amenities": [
        "AC",
        "Tv"
    ],
    "price_per_hr": "50"
}

-------------- book a room --------------
Post request to => /Bookings

  { 
    "customerName": "name",
    "date": "24",
    "startTime": "1:00" ,
    "endTime": "10:00",
    "roomId":1
  }

----------------- list all Room with Booked Data ----------------- 
Get request to => /rooms/Bookings

----------------- list all customer with Booking Data -----------------
Get request to => /customers/Bookings