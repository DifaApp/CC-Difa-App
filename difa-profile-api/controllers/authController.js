// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const config = require('../config/config');

const allowedEmailDomains = /^(gmail\.com|bangkit\.academy)$/;

exports.login =  async(req, res) => {
  const { email, password } = req.body;


  userModel.findUserByEmail(email, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ error: true, message: 'Invalid email or password' });
    }
    const validation = bcrypt.compare(password, user.password)

    if (!validation) {
      return res.status(401).json({error: true, message: 'Invalid email or password'});
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: '1h',
    });

    res.json({
      error: false,
      message: 'success',
      loginResult: {
        userId: user.id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailDomain = email.split('@')[1];

    // Check if the email domain is allowed
    if (!allowedEmailDomains.test(emailDomain)) {
      return res.status(400).json({
        error: true,
        message: 'Invalid email domain. Allowed domains: gmail.com, bangkit.academy',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10)

    userModel.findUserByEmail(email, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
      }

      if (user) {
        return res.status(400).json({ error: true, message: 'Email already exists' });
      }

      userModel.createUser({ name, email, password: hashPassword }, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }

        res.json({
          error: false,
          message: 'User created',
          datas: {
            name,
            email
          }
        });
      });
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;

  userModel.getUser(userId, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }

    res.json({
      error: false,
      message: 'success',
      user,
    });
  });
};