const { createReview } = require("../controllers/reviewsControllers.js");

const createReviewHandler = async (req, res) => {
  try {
    const result = await createReview(req.body);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  createReviewHandler,
};
