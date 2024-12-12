const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile').development);

exports.updateTransactionStatus = async (req, res) => {
    try {
      
      const event = req.body.event;
      const transactionId = req.body.transaction_id;
      const status = req.body.status;

      await knex('transactions').where({ id: transactionId }).update({ status });

      res.status(200).send('Webhook received successfully');
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).send('Error processing webhook');
    }
  };
  