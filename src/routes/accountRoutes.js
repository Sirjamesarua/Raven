const express = require('express');
const { createAccount, fetchAccounts } = require('../controllers/accountController');

const router = express.Router();

/**
 * @swagger
 * /accounts/create:
 *   post:
 *     summary: Create a new bank account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "James"  
 *               last_name:
 *                 type: string
 *                 example: "Arua"  
 *               email:
 *                 type: string
 *                 example: "james@gmail.com.com"  
 *               phone:
 *                 type: string
 *                 example: 08140480701 
 *     responses:
 *       201:
 *         description: Account created successfully
 *       500:
 *         description: Failed to create account
 */
router.post('/create', createAccount);

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Fetch accounts for a user
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: List of user accounts
 *       404:
 *         description: User not found
 */
router.get('/', fetchAccounts);

module.exports = router;
