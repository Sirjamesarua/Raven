const express = require('express');
const { sendMoney, getTransactions } = require('../controllers/transactionController');

const router = express.Router();

/**
 * @swagger
 * /transactions/send:
 *   post:
 *     summary: Send money to another account
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - recipient_bank_code
 *               - recipient_account_number
 *               - narration
 *               - recipient_account_name
 *               - recipient_bank
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to send
 *                 example: 100
 *               recipient_bank_code:
 *                 type: string
 *                 description: Bank code of the recipient
 *                 example: "044"
 *               recipient_bank:
 *                 type: string
 *                 description: Bank Name of the recipient
 *                 example: "BestStar MFB"
 *               recipient_account_number:
 *                 type: string
 *                 description: Recipient's account number
 *                 example: "6000173564"
 *               recipient_account_name:
 *                 type: string
 *                 description: Recipient Account Name
 *                 example: "BST/TestLtd - James Arua"
 *               narration:
 *                 type: string
 *                 description: Transaction description
 *                 example: "My account narration"
 *     responses:
 *       200:
 *         description: Transfer successful
 *       500:
 *         description: Transfer failed
 */
router.post('/send', sendMoney);


/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Fetch transactions
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: Transactions
 *       404:
 *         description: not found
 */
router.get('/', getTransactions);

module.exports = router;
