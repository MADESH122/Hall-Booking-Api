const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

let rooms = [{
    id: 1,
    name: 'room 1',
    seats: 50,
    amenities: ['AC', "Tv"],
    price_per_hr: 50,
    bookings: []
},
{
    id: 2,
    name: 'room 2',
    seats: 40,
    amenities: ['AC', "Tv"],
    price_per_hr: 40,
    bookings: []
}]

app.get('/', (req, res) => {
    try {
        res.status(200).send('<h1>Welcome to hall booking</h1>' + JSON.stringify(rooms))
    }
    catch (error) {
        res.status(400).send({
            message: 'internet connection error',
            error: error.message,
         })
    }
})

let bookings = []

//------------------------Creat a Room-------------------------// 
app.post('/rooms', (req, res) => {
    try {
        const { name, seats, amenities, price_per_hr } = req.body
        const newRoom = {
            id: rooms.length + 1,
            name,
            seats,
            amenities,
            price_per_hr,
            bookings: []
        }
        rooms.push(newRoom)
        res.status(200).send({
            message: "data send sucessfully"
        })
        console.log(rooms)
    }
    catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
})

//------------------------Book a Room-------------------------// 
app.post('/Bookings', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    const room = rooms.find(room => room.id === roomId)
    // console.log(rooms.find(room => room.id === roomId ))
    if (!room) {
        return res.status(404).send('Room not found');
    }

    const booking = {
        id: bookings.length + 1,
        customerName,
        date,
        startTime,
        endTime,
        roomId,
        status: 'Booked'
    }

    bookings.push(booking)
    room.bookings.push(booking)
    res.status(201).json(booking)
    console.log(bookings)
})

//---------------list all rooms with Booked Data---------------//
app.get('/rooms/Bookings', (req, res) => {
    try {
        const roomsWithBookings = rooms.map(room => {
            const bookedData = room.bookings.map(booking => ({
                roomName: room.name,
                bookedStatus: booking.status,
                customerName: booking.customerName,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime
            }));
            return {
                ...room,
                bookedData
            };
        });
        res.json(roomsWithBookings);
        console.log(roomsWithBookings);
    }
    catch (error) {
        res.status(200).send({
            error: error.message,
         })
    }
});

// -----------------list all Rooms with Booked Data ----------------- //
app.get('/customers/Bookings', (req, res) => {
    try {
        const customersWithBoookings = bookings.map(booking => ({
            customerName: booking.customerName,
            roomName: rooms.find(room => room.id === booking.roomId).name,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        }))
        res.json(customersWithBoookings)
    } catch (error) {
        res.status(200).send({
            error: error.message,
         })
    }
})

// -----------------list all customer with Booking Data----------------- //
app.get('/customers/customerName/Booking', (req, res) => {

    try {
        const { customerName } = req.params;
        const customerBookings = bookings.filter(booking => booking.customerName === customerName)
        res.json(customerBookings);
    }
    catch (error) {
        res.status(200).send({
            error: message.error
        })
    }
})


const port = 8000;
app.listen(port, () => console.log('Server Start Sucessfully'))