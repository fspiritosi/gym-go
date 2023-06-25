const { where, Op } = require("sequelize");
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
};

const findActivitiByName = async (name) => {
  const nameDb = await Activities.findAll({
    where: { title: { [Op.like]: `%${name}%` } },
  });
  console.log(nameDb);
  return nameDb;
};

const putActivities = async (
  id,
  title,
  description,
  image,
  goals,
  difficulty,
  isActive
) => {
  const goalsBd = await Goals.findAll({
    where: { name: goals },
  });

  if (goalsBd.length > 0) {
    const updatedActivity = await Activities.update(
      {
        title,
        description,
        image,
        goals: goalsBd,
        difficulty,
        isActive,
      },
      { where: { id } }
    );
    return updatedActivity;
  }
};

const deleteActivities = async (id) => {
  const activitie = await Activities.findByPk(id);

  if (!activitie) {
    return "no existe la actividad";
  }
  await Activities.destroy({ where: { id: id } });

  return "elemento borrado";
};
module.exports = {
  createActivities,
  findActivitiByName,
  putActivities,
  deleteActivities,
};
