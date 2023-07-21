const { Router } = require("express");
const {
  getAllReviewsHandler,
  getReviewByIdHandler,
  createReviewHandler,
  updateReviewByIdHandler,
  deleteReviewByIdHandler,
} = require("../handlers/reviewsHandler");

const reviewsRouter = Router();

reviewsRouter.get("/", getAllReviewsHandler);
reviewsRouter.get("/:id", getReviewByIdHandler);
reviewsRouter.post("/", createReviewHandler);
reviewsRouter.put("/:id", updateReviewByIdHandler);
reviewsRouter.delete("/:id", deleteReviewByIdHandler);

module.exports = reviewsRouter;
