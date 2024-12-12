const express = require('express');
const { connectDB } = require('./config/db');
const User = require('./models/Users');
const Earnings = require('./models/Earnings');
const Purchases = require("./models/Purchases")
const cors = require('cors')
const { wss } = require('./websocket')

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
const userRoutes = require('./routes/userRoutes');
const earningRoutes = require("./routes/earningsRoutes")
app.use('/api', userRoutes);
app.use("/api",earningRoutes);

connectDB();
(async () => {
  try {
    await User.sync({ alter: true });
    await Earnings.sync({ alter: true }); 
    await Purchases.sync({alter: true});
    console.log('Tables synced');
  } catch (err) {
    console.error('Error syncing tables:', err);
  }
})();


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
