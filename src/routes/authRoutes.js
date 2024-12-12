const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         first_name: 
 *           type: string
 *           example: "James"
 *         last_name: 
 *           type: string
 *           example: "Arua"
 *         phone: 
 *           type: string
 *           example: "08140480701"
 *         email: 
 *           type: string
 *           example: "james@gmail.com"
 *         password:
 *           type: string
 *           example: "password"
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/signup', signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "james@gmail.com"  
 *               password:
 *                 type: string
 *                 example: "password"  
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', login);

module.exports = router;
