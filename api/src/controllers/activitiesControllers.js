const { where } = require("sequelize");
const { Activities, Goals } = require("../db");

const createActivities = async (
  title,
  description,
  image,
  goals,
  difficulty,
  isAcive
) => {
  console.log(goals);
  const goalsBd = await Goals.findAll({
    where: { name: goals },
  });

  console.log("este es goalBd: " + goalsBd);
  if (goalsBd.length > 0) {
    const newActivitie = await Activities.create({
      title,
      description,
      image,
      goals: goalsBd,
      difficulty,
      isAcive,
    });
    return newActivitie;
  } else {
    return "debe ingresar una goals que exista";
  }
  // console.log(goalsBd.name);
  // newActivitie.addGoals(goalsBd.name);
};

module.exports = {
  createActivities,
};
