const { Op } = require("sequelize");
const { Activities, Goals, Classes, Events } = require("../db");



const getAllActivities = async () => {
  let activities = await Activities.findAll({
    include: [
      {
        model: Goals,
        attributes: ["name"],
        through: { attributes: [] },
      },
      {
        model: Classes,
        attributes: ["startDate", "startTime"],
        include:[
          {model: Events,
          attributes: ['date', 'startTime', 'endTime', 'duration']
        }
        ]
      },
    ],
  });
  activities = activities.map(activity => {
    const transformedGoals = activity.Goals.map(goal => goal.name);
    return { ...activity.toJSON(), Goals: transformedGoals };
  });
  return activities;
}

const searchActivitiesByName = async (title) => {
  filteredActivities = await Activities.findAll({
    include: {
      model: Goals,
      attributes: ['name'],
      through: { attributes: [] }
    },
    where: {
      title: {
        [Op.iLike]: `%${title}%`
      }
    }
  });
  filteredActivities = filteredActivities.map(activity => {
    const transformedGoals = activity.Goals.map(goal => goal.name);
    return { ...activity.toJSON(), Goals: transformedGoals };
  });
  return filteredActivities;
}

const findActivityById = async (id) => {
  let activity = await Activities.findByPk(id, {
    include: {
      model: Goals,
      attributes: ['name'],
      through: { attributes: [] }
    }
  });
  activity = { ...activity.toJSON(), Goals: activity.Goals.map(goal => goal.name) };
  return activity;
};

const createActivities = async (title, description, image, goals, difficulty) => {
  const newActivity = await Activities.create({ title, description, image, difficulty });
  for (const goalStr of goals) {
    const goal = await Goals.findAll({
      where: {
        name: goalStr
      }
    });
    await newActivity.addGoals(goal);
  };
  return newActivity;
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
  const activity = await Activities.findByPk(id);

  if (!activity) {
    return "no existe la actividad";
  }
  await Activities.destroy({ where: { id: id } });

  return "elemento borrado";
};

module.exports = {
  getAllActivities,
  searchActivitiesByName,
  findActivityById,
  createActivities,
  putActivities,
  deleteActivities,
};
