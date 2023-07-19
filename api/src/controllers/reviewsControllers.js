const { Reviews, Users } = require("../db");

const createReview = async (body) => {
  if ((await Users.findByPk(body.userId)).isActive) {
    throw "User deactivated";
  }

  const { userId, classesId, rate, comment = null, image = null } = body;
  const postReview = await Reviews.create({
    userId,
    recipeId,
    rate,
    comment,
    image,
  });

  return postReview;
};

module.exports = {
  createReview,
};
