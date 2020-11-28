const express = require('express');
const router = express.Router();
const { Reward } = require('../database/models');

/**
 * @swagger
 * definitions:
 *   Reward:
 *     required:
 *       - name
 *       - amount
 *       - expiryDate
 *     properties:
 *       name:
 *         type: string
 *       amount:
 *         type: integer
 *       expiryDate:
 *         type: string
 *         format: date-time
 */


/**
 * @swagger
 * /rewards:
 *   get:
 *     description: Returns rewards
 *     tags:
 *      - Rewards
 *     responses:
 *       200:
 *         description: rewards
 */
router.get('/', async (req, res) => {
    try {
        const rewards = await Reward.findAll();
        res.json(rewards);
    } catch (err) {
        res.status(400).json({ err })
    }
});

/**
* @swagger
* /rewards:
*   post:
*       tags: [Rewards]
*       produces:
*           - application/json
*       consumes:
*           - application/json
*       parameters:
*           - in: body
*             name: body
*             required: true
*             schema:
*               $ref: "#/definitions/Reward"
*       responses:
*           201:
*               description: reward
*/
router.post('/', async (req, res) => {
    try {
        const reward = await Reward.create(req.body)
        res.status(201).json(reward.toJSON())
    } catch (err) {
        res.status(400).json({ err })
    }
});

module.exports = router;