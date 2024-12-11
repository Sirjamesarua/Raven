const express = require('express');
const { sendMoney } = require('../controllers/transactionController');

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
 *               - bankCode
 *               - accountNumber
 *               - narration
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to send
 *               bankCode:
 *                 type: string
 *                 description: Bank code of the recipient
 *               accountNumber:
 *                 type: string
 *                 description: Recipient's account number
 *               narration:
 *                 type: string
 *                 description: Transaction description
 *     responses:
 *       200:
 *         description: Transfer successful
 *       500:
 *         description: Transfer failed
 */
router.post('/send', sendMoney);

module.exports = router;
