const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const swaggerSetup = require('./swagger');
const { authenticateToken } = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);

apiRouter.use('/accounts', authenticateToken, accountRoutes);
apiRouter.use('/transactions', authenticateToken, transactionRoutes);
apiRouter.use('/webhooks', authenticateToken, webhookRoutes);

app.use('/api', apiRouter);

swaggerSetup(app);

module.exports = app;
