const express = require('express');
const router = express.Router();
const { User } = require('../database/models');

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

module.exports = router;