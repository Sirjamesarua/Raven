const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../../knexfile').development);

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await knex('users').where({ email }).first();
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await knex('users').insert({ username, email, password: hashedPassword }).returning(['id', 'username', 'email']);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await knex('users').where({ email }).first();
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
