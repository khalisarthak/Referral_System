const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/Users');

router.post('/register', async (req, res) => {
  const { name, email, password, referredBy } = req.body;

  try {
    const parentUser = referredBy ? await User.findOne({ where: { email: referredBy } }) : null;
    console.log(parentUser);
    
    if (parentUser && parentUser.referrals >= 8) {
      return res.status(400).json({ message: 'Referral limit exceeded' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      referredBy,
      level: parentUser ? parentUser.level + 1 : 0,
    });

    if (parentUser) {
      await parentUser.increment('referrals');
    }

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// Generate a token (optional, if using authentication tokens)
    // Example: JWT token generation
    /*
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    */
