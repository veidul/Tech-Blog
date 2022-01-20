const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        { model: Comment },
      ],
      order: [["createdAt", "DESC"]],
    });
    console.log(blogData);
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);

    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/home", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        { model: Comment, include: [{ model: User, attributes: ["name"] }] },
      ],
      order: [["createdAt", "DESC"]],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newblog", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("newBlog", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/updateblog", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const blog_id = req.query.blog_id;
    const blog_body = req.query.blog_body;
    const blog_title = req.query.blog_title;
    res.render("newBlog", {
      blog_id,
      blog_body,
      blog_title,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/updatecomment", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const blog_id = req.query.blog_id;
    const comment_id = req.query.comment_id;
    const comment_body = req.query.comment_body;
    res.render("newComment", {
      blog_id,
      comment_id,
      comment_body,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/newcomment", withAuth, async (req, res) => {
  try {
    const blog_id = req.query.blog_id;
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render("newComment", {
      ...user,
      blog_id,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
