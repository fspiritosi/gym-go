const { Op } = require("sequelize");
const { Activities, Goals, Classes, Events, Coaches } = require("../db");

const getAllActivities = async () => {
  let activities = await Activities.findAll({
    include: [
      {
        model: Goals,
        attributes: ["name"],
        // through: { attributes: [] },
      },
      {
        model: Coaches,
        attributes: ['id', 'firstName', 'lastName'],
        through: { attributes: [] }
      }
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
      attributes: ['id', 'name', 'description'],
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
  const activity =  await Activities.findByPk(id, {
    
    include: [
      {
        model: Goals,
        attributes: ["id", "name", "description"],
        through: { attributes: [] },
      },
      {
        model: Coaches,
        attributes: ["id", "firstName", "lastName"],
        through: { attributes: [] },
      },
      {
        model: Classes,
        attributes: ["startDate", "endDate", "startTime", "endTime", "difficulty", "quota", "ActivityId", "CoachId"],
        include: [
          {
            model: Events,
            attributes: [
              "id",
              "date",
              "startTime",
              "endTime",
              "duration",
              "eventQuota",
            ],
          },
          {
            model: Coaches,
            attributes: ["id", "firstName", "lastName", "profilePicture"]
          },
        ],
      },
    ],
  });
  return activity;
};

const createActivity = async (title, description, image, goals) => {
  const newActivity = await Activities.create({ title, description, image });
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

const updateActivity = async (id, title, description, image, goals, isActive) => {
  const activity = await Activities.findByPk(id, {
    include: [
      {
      model: Goals,
      attributes: ['id', 'name', 'description'],
      through: { attributes: [] },
      },
    ]
  });
  await activity.update({title, description, image, goals, isActive })
  return activity;
};

const deleteActivity = async (id) => {
  const activity = await Activities.findByPk(id);
  if (!activity) return null;
  await activity.destroy();
  let remainingActivites = await Activities.findAll({
    include: {
        model: Goals,
        attributes: ["name"],
        through: { attributes: [] },
    }
  });
  remainingActivites = remainingActivites.map(activity => {
    const transformedGoals = activity.Goals.map(goal => goal.name);
    return { ...activity.toJSON(), Goals: transformedGoals };
  });
  return remainingActivites;
};

module.exports = {
  getAllActivities,
  searchActivitiesByName,
  findActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
