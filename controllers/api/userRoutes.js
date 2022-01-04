
const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.Create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,

        });

        res.status(200).json(userData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)

    }
})
module.exports = router;