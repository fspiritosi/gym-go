const { Reviews, users, Events} = require("../db");

const getAllReviews = async () => {
  const allReviews = await Reviews.findAll();
  return allReviews;
}

const getReviewById = async (id) => {
  const review = await Reviews.findByPk(id);
  if (!review) throw new Error(`Review with id ${id} not found`);
  return review;
}

const createReview = async (rate, userId, eventId) => {
  if (!rate || !userId || !eventId) throw new Error(`Missing values in body`);
  const user = await users.findByPk(userId);
  if (!user) throw new Error(`User with id ${userId} not found`);
  const event = await Events.findByPk(eventId);
  if (!event) throw new Error(`Event with id ${eventId} not found`);
  const newReview = await Reviews.create({ rate });
  await newReview.setUser(user);
  await newReview.setEvent(event);
  return newReview;
};

const updateReviewById = async (id, rate, userId, eventId) => {
  const user = await users.findByPk(userId);
  if (!user) throw new Error(`User with id ${userId} not found`);
  const event = await Events.findByPk(eventId);
  if (!event) throw new Error(`Event with id ${eventId} not found`);
  const reviewToUpdate = await Reviews.findByPk(id);
  if (!reviewToUpdate) throw new Error(`Review with id ${id} not found`);
  await reviewToUpdate.setUser(user);
  await reviewToUpdate.setEvent(event);
  await reviewToUpdate.update({ rate });
  return reviewToUpdate;
};

const deleteReviewById = async (id) => {
  const reviewToDestroy = await Reviews.findByPk(id);
  if (!reviewToDestroy) throw new Error(`Review with id ${id} not found`);
  const user = await users.findByPk(reviewToDestroy.userId);
  if (!user) throw new Error(`The user ${reviewToDestroy.userId}, owner of the review ${id} doesn't exist`);
  const event = await Events.findByPk(reviewToDestroy.EventId);
  if (!event) throw new Error(`The event ${reviewToDestroy.EventId}, that has the review ${id} doesn't exist`);
  await user.removeReview(reviewToDestroy);
  await event.removeReview(reviewToDestroy);
  await reviewToDestroy.destroy();
  const remainingReviews = await Reviews.findAll();
  return remainingReviews;
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReviewById,
  deleteReviewById
};
