const express = require('express');
const router = express.Router();
const { User, RelUserReward } = require('../database/models');

/**
 * @swagger
 * definitions:
 *   User:
 *     required:
 *       - name
 *       - email
 *       - phone
 *       - country
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       phone:
 *         type: string
 *       country:
 *         type: string
 */


/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns users
 *     tags:
 *      - Users
 *     responses:
 *       200:
 *         description: users
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(400).json({ err })
    }
});

/**
* @swagger
* /users:
*   post:
*       tags: [Users]
*       produces:
*           - application/json
*       consumes:
*           - application/json
*       parameters:
*           - in: body
*             name: body
*             required: true
*             schema:
*               $ref: "#/definitions/User"
*       responses:
*           201:
*               description: user
*/
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json(user.toJSON())
    } catch (err) {
        res.status(400).json({ err })
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Returns user with rewards
 *     tags:
 *      - Users
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *     responses:
 *       200:
 *         description: rewards
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: RelUserReward,
                attributes: ['rewardId'],
                as: 'rewards'
            }
        });
        res.json(user);
    } catch (err) {
        res.status(400).json({ err })
    }
});



/**
 * @swagger
 * /users/{userId}/reward/{rewardId}:
 *   post:
 *     description: Returns relation 
 *     tags:
 *      - Users
 *     parameters:
 *      - name: rewardId
 *        in: path
 *        required: true
 *      - name: userId
 *        in: path
 *        required: true
 *     responses:
 *       201:
 *         description: relation
 */
router.post('/:userId/reward/:rewardId', async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId } });
        if (!user) {
            res.status(404).json({ message: 'invalid user id' })
            return;
        }
        const relUserReward = await RelUserReward.create(req.params)
        res.status(201).json(relUserReward.toJSON())
    } catch (err) {
        res.status(400).json({ err })
    }
})

module.exports = router;