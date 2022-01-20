const router = require("express").Router();
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAndCountAll({
      limit: 10,
      offset: 0,
      include: [
        { model: User, attributes: { exclude: ["password"] } },
        { model: Comment },
      ],
    });
    console.log(blogData);
    res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// need to work thru this further and figure out how to update req.body.body with new input from user.
router.put("/:id", async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
