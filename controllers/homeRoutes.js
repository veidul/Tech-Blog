const router = require('express').Router();
const { Blog, User, Comment } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            include: [
                {
                    model:User,
                    attributes: ['name'],
                },
                {model: Comment},
            ],
            order: [['createdAt', 'DESC']]
        })

        const blogs = blogData.map((blog) => blog.get({ plain: true}))

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        })
    }catch(err){res.status(500).json(err)}
})
router.get('/login', async (req, res) => {
    try{
        if(req.session.logged_in){
            res.redirect('/profile');
            return;
        }
        res.render('login');
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router