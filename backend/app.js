require('dotenv').config();
const express = require('express');
const createHttpError = require('http-errors');
const BuyerRouter = require('./src/routes/buyer');
const CompanyRouter = require('./src/routes/company');
const ProductRouter = require('./src/routes/products');
const OrderRouter = require('./src/routes/order');
const fileUpload = require('express-fileupload');
const nodemailer = require("nodemailer");
const cors = require('cors');

const OrderModel = require('./src/model/adoptions');
const BuyerModel = require('./src/model/users');
const PetModel = require('./src/model/pets');

const app = express();

app.use(fileUpload());
app.use('/public/pets', express.static('public/pets'));

// CORS
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/users', BuyerRouter);
app.use('/api/v1/admin', CompanyRouter);
app.use('/api/v1/pets', ProductRouter);
//app.use('/api/v1/adoptions', OrderRouter);

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS,   // Use environment variable
    }
});

// Email sending route
app.post("/send", (req, res) => {
    const mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.message
    };

    console.log("From API SEND route: ", mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); // Log the error details
            return res.status(500).send(error.message); // Send the error message in the response
        }
        res.status(200).send("Email sent successfully");
    });
});

// Assuming you have an Express app and OrderModel defined
app.delete('/api/v1/requests/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await OrderModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: 'Request not found' });
        }
        res.status(200).send({ message: 'Request deleted successfully' });
    } catch (error) {
        next(error);
    }
});
app.post('/api/v1/adoptions', async (req, res, next) => {
    const user_id = req.body.user_id;
    const pet_id = req.body.pet_id;

    try {
        // Validate input
        if (!user_id || !pet_id) {
            throw createHttpError(400, 'Missing required parameters');
        }

        // Check if user exists and get their email
        const isUser = await BuyerModel.findById(user_id).exec();
        if (!isUser) {
            throw createHttpError(400, 'User  does not exist');
        }

        // Check if pet exists
        const isPet = await PetModel.findById(pet_id).exec();
        if (!isPet) {
            throw createHttpError(400, 'Pet does not exist');
        }

        // Create a new adoption order
        const order = new OrderModel({
            user_id: user_id,
            user_name: isUser.name,
            pet_id: pet_id,
            pet_name: isPet.petname,
            email: isUser.email, // Get the user's email
            status: "Request",
            date: new Date().toISOString()
        });

        // Save the order
        const result = await order.save();

        // Respond with the created order
        res.status(201).send(result);

    }catch (error) {
        next(error);
    }
});

app.get('/api/v1/requests', async (req, res, next) => {
    try {
        const result = await OrderModel.find({ status: "Request" }).exec();
        
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});


// Error handling middleware
app.use((err, req, res, next) => {
    if (createHttpError.isHttpError(err)) {
        res.status(err.status).send({ message: err.message });
    } else {
        res.status(500).send({ message: "Error Unknown" });
    }
});

module.exports = app;