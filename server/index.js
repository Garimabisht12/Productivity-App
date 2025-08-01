const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./routes/auth')
const noteRoutes = require('./routes/notes');
const todoRoutes = require('./routes/todos');
const habitRoutes = require('./routes/habits');
const financeRoutes = require('./routes/finance');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/todos', todoRoutes); 
app.use('/api/habits', habitRoutes)
app.use('/api/finance', financeRoutes)



const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONOGO_URI)
    .then(() =>{
        console.log("MongoDB successfully connected!!!")
        app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
    })
    .catch(err =>{
        console.log(`error connecting db: ${err}`)
    })


