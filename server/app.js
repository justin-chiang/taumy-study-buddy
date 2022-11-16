const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

// db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB CONNECTED'))
.catch(err => console.log('DB CONNECTION ERROR', err));

// middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// routes
const userRouter = require('./routes/user.routes');
const dashboardRouter = require('./routes/dashboard.routes');
app.use('/users', userRouter);
app.use('/dashboard', dashboardRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'ok',
    });
});

// port
const port = process.env.PORT || 9000;

// listener
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));