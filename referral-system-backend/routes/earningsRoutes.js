const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Earnings = require('../models/Earnings');
const Purchases = require("../models/Purchases")
const { userConnections } = require('../websocket')

// Handle purchases and distribute profits
router.post('/purchase', async (req, res) => {
  const { userId, purchaseAmount } = req.body;


 

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await Purchases.create({
      userId: user.id,
      purchaseAmount: purchaseAmount,
    });

    if (purchaseAmount < 1000) {
      return res.status(200).json({ message: 'Purchase processed successfully' });
    }


    let parentUserEmail = user.referredBy;
    let userLevel = user.level;
    let currentLevel = 1;
    let profitableEarning = purchaseAmount

    while (parentUserEmail && userLevel >0 && currentLevel<=2) {
      const parentUser = await User.findOne({ where: { email: parentUserEmail } });

      if (parentUser) {
        const profitPercentage = currentLevel === 1 ? 0.05 : 0.01; 
        let earnings = profitableEarning * profitPercentage;

        const existingEarningsUser = await Earnings.findOne( {
          where: {
            userId: parentUser.id
          }
        })

        if (existingEarningsUser) {
          existingEarningsUser.directEarnings += currentLevel === 1 ? earnings : 0;
          existingEarningsUser.indirectEarnings += currentLevel > 1 ? earnings : 0;
        
          await existingEarningsUser.save();
        } else {
          await Earnings.create({
            userId: parentUser.id,
            referredUserId: userId,
            directEarnings: currentLevel === 1 ? earnings : 0,
            indirectEarnings: currentLevel > 1 ? earnings : 0,
          });
        }


        const parentConnection = userConnections?.get(parentUser.id.toString());
        if (parentConnection) {
          parentConnection.send(
            JSON.stringify({
              message: `You have received new earnings of Rs. ${earnings} from ${user.name}`,
              userId: parentUser.id,
              earnings: {
                direct: currentLevel === 1 ? earnings : 0,
                indirect: currentLevel > 1 ? earnings : 0,
              },
            })
          );
        }
       

        if(userLevel===1)
          break;
        parentUserEmail = parentUser.referredBy;
        profitableEarning = earnings;
        currentLevel++;
      } else {
        break;
      }
    }

    res.status(200).json({ message: 'Purchase processed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/getPurchaseDetails/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const purchaseDetails = await Purchases.findAll({ where: { userId } });
    
    res.status(200).json(purchaseDetails || []);
  } catch (err) {
    console.error('Error fetching purchase details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/getEarningDetails/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const earningDetails = await Earnings.findAll({ where: { userId } });
    res.status(200).json(earningDetails || []);
  } catch (err) {
    console.error('Error fetching earning details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});









module.exports = router;
