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
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

// routes
const userRouter = require('./routes/userRoutes');
const studyRouter = require('./routes/studyRoutes');
app.use('/api/users', userRouter);
app.use('/api/study', studyRouter);

// deployment
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
// }

// port
const port = process.env.PORT || 9000;

// listener
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));