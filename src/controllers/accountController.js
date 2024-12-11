const knex = require('knex')(require('../../knexfile').development);
const axios = require('axios');

exports.createAccount = async (req, res) => {
  try {
    const { user_id, first_name, last_name, phone, email } = req.body;

    const response = await axios.post('https://integrations.getravenbank.com/v1/pwbt/generate_account', {
      first_name,
      last_name,
      phone,
      email,
      amount: '1000',
    });

    const account = await knex('accounts').insert({
      user_id,
      account_number: response.data.account_number,
      balance: 0,
    }).returning('*');

    res.status(201).json({ message: 'Account created successfully', account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.fetchAccounts = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      const accounts = await knex('accounts').where({ user_id });
      res.status(200).json({ accounts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  