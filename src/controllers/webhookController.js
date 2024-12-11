exports.updateTransactionStatus = async (req, res) => {
    try {
      const { transaction_id, status } = req.body;
  
      await knex('transactions').where({ id: transaction_id }).update({ status });
      res.status(200).json({ message: 'Transaction status updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  