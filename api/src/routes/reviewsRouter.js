const router = require("express").Router();
const { createReviewHandler } = require("../handlers/reviewsHandler");

// const putReview = require("../controllers/putReview");
// const deleteReview = require("../controllers/deleteReview");
reviewsRouter = Router();

// router.get("/", getReviews);
reviewsRouter.post("/", createReviewHandler);
// router.delete("/", deleteReview);
// router.put("/", putReview);

module.exports = router;
