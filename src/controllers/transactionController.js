const knex = require('knex')(require('../../knexfile').development);

exports.sendMoney = async (req, res) => {
  try {
    const { sender_id, recipient_id, amount } = req.body;

    const senderAccount = await knex('accounts').where({ user_id: sender_id }).first();
    if (!senderAccount || senderAccount.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance or account not found' });
    }

    const recipientAccount = await knex('accounts').where({ user_id: recipient_id }).first();
    if (!recipientAccount) return res.status(404).json({ error: 'Recipient account not found' });

    await knex('accounts').where({ user_id: sender_id }).update({ balance: senderAccount.balance - amount });
    await knex('accounts').where({ user_id: recipient_id }).update({ balance: recipientAccount.balance + amount });

    const [transaction] = await knex('transactions').insert({
      sender_id,
      recipient_id,
      amount,
      status: 'completed',
    }).returning('*');

    res.status(200).json({ message: 'Transaction successful', transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
