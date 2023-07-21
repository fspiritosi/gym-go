const { Reviews, users, Events, Coaches, Activities, Classes } = require("../db");

const getAllReviews = async () => {
  const allReviews = await Reviews.findAll({
    attributes: ["id", "rate", "isActive", "createdAt", "updatedAt"],
    include: [
      {
        model: users,
        attributes: ['id', 'email', 'username'],
      },
      {
        model: Coaches,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Events,
        attributes: ["id"],
        include: {
          model: Classes,
          attributes: ["id"],
          include: {
            model: Activities,
            attributes: ["id", "title"],
          }
        }
      }
    ]
  });
  return allReviews;
}

const getReviewById = async (id) => {
  const review = await Reviews.findByPk(id);
  if (!review) throw new Error(`Review with id ${id} not found`);
  return review;
}

const createReview = async (rate, comment, userId, eventId, coachId) => {
  if (!rate || !userId || !eventId || !coachId) throw new Error(`Body must contain rate, comment, userId, eventId and coachId`);
  const user = await users.findByPk(userId);
  if (!user) throw new Error(`User with id ${userId} not found`);
  const event = await Events.findByPk(eventId);
  if (!event) throw new Error(`Event with id ${eventId} not found`);
  const coach = await Coaches.findByPk(coachId);
  if (!coach) throw new Error(`Coach with id ${coachId} not found`);
  const newReview = await Reviews.create({ rate });
  await newReview.setUser(user);
  await newReview.setEvent(event);
  await newReview.setCoach(coach);
  return newReview;
};

const updateReviewById = async (id, rate, comment, userId, eventId, coachId) => {
  const reviewToUpdate = await Reviews.findByPk(id);
  if (!reviewToUpdate) throw new Error(`Review with id ${id} not found`);
  if (userId) {
    const user = await users.findByPk(userId);
    await reviewToUpdate.setUser(user);
  }
  if (eventId) {
    const event = await Events.findByPk(eventId);
    await reviewToUpdate.setEvent(event);
  }
  if (coachId) {
    const coach = await Coaches.findByPk(coachId);
    await newReview.setCoach(coach);
  }
  await reviewToUpdate.update({ rate });
  return reviewToUpdate;
};

const deleteReviewById = async (id) => {
  const reviewToDestroy = await Reviews.findByPk(id);
  if (!reviewToDestroy) throw new Error(`Review with id ${id} not found`);
  const user = await users.findByPk(reviewToDestroy.userId);
  if (!user) throw new Error(`The user ${reviewToDestroy.userId} owner of the review ${id} doesn't exist`);
  const event = await Events.findByPk(reviewToDestroy.EventId);
  if (!event) throw new Error(`The event ${reviewToDestroy.EventId} that has the review ${id} doesn't exist`);
  const coach = await Coaches.findByPk(reviewToDestroy.CoachId);
  if (!coach) throw new Error(`The coach ${reviewToDestroy.CoachId} that has the review ${id} doesn't exist`);
  await user.removeReview(reviewToDestroy);
  await event.removeReview(reviewToDestroy);
  await coach.removeReview(reviewToDestroy);
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
