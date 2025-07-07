const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB(); // Connexion à la base de données

const app = express();
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const reportRoutes = require('./routes/reportRoutes');
const AlertstockRoutes = require('./routes/AlertstockRoutes')


app.get('/', (req, res) => res.send('Backend opérationnel'));
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/Alertstock', AlertstockRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
});
