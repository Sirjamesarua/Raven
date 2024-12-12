const knex = require('knex')(require('../../knexfile').development);
const axios = require('axios');

function generateUniqueReference() {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 10000);
  return `${timestamp}-${randomPart}`;
}

exports.sendMoney = async (req, res) => {
  // try {
    const { recipient_bank_code, recipient_account_number, recipient_account_name, amount, narration, recipient_bank } = req.body;

    const sender_id = req.user.id;

    const senderAccount = await knex('accounts').where({ user_id: sender_id }).first();

    const transferData = {
      amount: amount,
      bank_code: recipient_bank_code,
      bank: recipient_bank,
      account_number: recipient_account_number,
      account_name: recipient_account_name,
      narration: narration,
      reference: generateUniqueReference(),
      currency: 'NGN'
    };


    const ravenResponse = await axios.post(
      `${process.env.RAVEN_API_URL}/transfers/create`,
      transferData,
      {
          headers: {
              'Authorization': `Bearer ${process.env.RAVEN_API_KEY}`
          }
      }
    );

    console.log(ravenResponse);
    


        // Handle Raven API response
        if (ravenResponse.status === 200) {
          // Update sender's balance and create transaction record
          await knex('accounts').where({ user_id: sender_id }).update({ balance: senderAccount.balance - amount });
          await knex('transactions').insert({
              sender_id,
              recipient_account_number,
              amount,
              status: 'initiated' 
          });

          res.status(200).json({ message: 'Transfer initiated successfully', transactionId: transactionId });
      } else {
          // Handle Raven API errors
          res.status(500).json({ error: 'Transfer failed. Please try again later.' });
      }
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};
 



exports.getTransactions = async (req, res) => {
  try {
    const user_id = req.user.id;

    if (!user_id) {
      return res.status(400).json({ error: 'User ID not found. Please log in again.' });
    }

    const ravenTransactions = await getTransactionsFromRavenApi(user_id);

    res.status(200).json({ transactions: ravenTransactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function getTransactionsFromRavenApi(userId) {
  try {
    const response = await axios.get(
      `${process.env.RAVEN_API_URL}/accounts/transactions`,
      // `${process.env.RAVEN_API_URL}/accounts/${userId}/transactions`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.RAVEN_API_KEY}`,
        },
      }
    );

    return response.data.data.transactions;
  } catch (error) {
    throw new Error('Failed to retrieve transactions from Raven API: ' + error.message);
  }
}