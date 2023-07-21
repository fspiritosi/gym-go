const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReviewById,
  deleteReviewById,
} = require("../controllers/reviewsControllers.js");

const getAllReviewsHandler = async (req, res) => {
  try {
    const allReviews = await getAllReviews();
    res.status(200).json(allReviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReviewByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createReviewHandler = async (req, res) => {
  try {
    const { rate, userId, eventId, coachId } = req.body;
    const newReview = await createReview(rate, userId, eventId, coachId);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateReviewByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { rate, userId, eventId, coachId } = req.body;
    const updatedReview = await updateReviewById(id, rate, userId, eventId, coachId);
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteReviewByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const remainingReviews = await deleteReviewById(id);
    res.status(200).json(remainingReviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllReviewsHandler,
  getReviewByIdHandler,
  createReviewHandler,
  updateReviewByIdHandler,
  deleteReviewByIdHandler,
};
