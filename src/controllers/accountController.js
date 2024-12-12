const knex = require('knex')(require('../../knexfile').development);
const axios = require('axios');
const { check, validationResult } = require('express-validator');

exports.createAccount = async (req, res) => {
    try {
        await check('first_name', 'First name is required').notEmpty().run(req);
        await check('last_name', 'Last name is required').notEmpty().run(req);
        await check('phone', 'Phone number is required')
          .notEmpty()
          .matches(/^\+?[1-9]\d{1,14}$/)
          .withMessage('Phone number must be in valid E.164 format')
          .run(req);
        await check('email', 'Valid email is required').isEmail().run(req);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({
                message: err.msg, 
                field: err.param
            }));
            return res.status(400).json({ errors: formattedErrors });
        }
  
      const user_id = req.user.id;
  
      if (!user_id) {
        return res.status(400).json({ error: 'User ID not found. Please log in again.' });
      }
  
      const { first_name, last_name, phone, email } = req.body;
  
      if (!process.env.RAVEN_API_URL) {
        return res.status(500).json({ error: 'Raven API URL is not configured in .env' });
      }
  
      const response = await axios.post(`${process.env.RAVEN_API_URL}/generate_account`, {
        first_name,
        last_name,
        phone,
        email,
        amount: '0',
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.RAVEN_API_KEY}`
        },
      });
      

      console.log('james>>>>',response);
      
  
      if (!response.data || !response.data.data.account_number) {
        return res.status(500).json({ error: 'Failed to generate account from Raven API' });
      }
  
      const accountId = await knex('accounts').insert({
        user_id,
        account_number: response.data.data.account_number,
        account_name: response.data.data.account_name,
        bank: response.data.data.bank,
        balance: response.data.data.amount, 
      }).returning('id');


      const account = await knex('accounts').select('*').where({ id: accountId[0] });

      res.status(201).json({ message: 'Account created successfully', account: account[0] });
  
    //   res.status(201).json({ message: 'Account created successfully', account });
  
    } catch (error) { 
      res.status(500).json({ error: error.message });
    }
  };


exports.fetchAccounts = async (req, res) => {
    try {
        const user_id = req.user.id;
  
      const accounts = await knex('accounts').where({ user_id });
      res.status(200).json({ accounts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  