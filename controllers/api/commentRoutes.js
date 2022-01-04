const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// need to update
router.get('/', async (req, res) =>{
    try{
        const commentData = await Comment.findAll({
            limit: 10,
            offset: 0,
            include: [
                {model: User, attributes: { exclude: ['password']}},
                {model: Blog, attributes: [] }
            ]
        })
        res.status(200).json(commentData)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/', withAuth, async (req, res) =>{
    try {
        const commentData = await Comment.create({...req.body, user_id: req.session.user_id,})
        res.status(200).json(commentData)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

// need to work thru this further and figure out how to update req.body.body with new input from user.
router.put('/:id', async (req, res) =>{
    try{
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(commentData)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(commentData)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})
module.exports = router;