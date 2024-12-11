const express = require('express');
const { updateTransactionStatus } = require('../controllers/webhookController');

const router = express.Router();

/**
 * @swagger
 * /webhook/status:
 *   post:
 *     summary: Handle webhook updates
 *     tags: [Webhook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionId
 *               - status
 *             properties:
 *               transactionId:
 *                 type: string
 *                 description: ID of the transaction
 *               status:
 *                 type: string
 *                 description: New status of the transaction
 *     responses:
 *       200:
 *         description: Webhook processed
 *       500:
 *         description: Failed to process webhook
 */
router.post('/status', updateTransactionStatus);

module.exports = router;
