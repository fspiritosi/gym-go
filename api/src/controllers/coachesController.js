const {Coaches, Classes, Activities, Events} = require('../db')

const getAllCoaches = async () => {
  const allCoaches = await Coaches.findAll({
    include: [
      {
        model: Activities,
        attributes: ['id', 'title'],
        through: { attributes: [] }
      }
    ],
  });
  return allCoaches;
};

const getCoachById = async (id) => {
  const coach = await Coaches.findByPk(id, {
    include: [
      {
        model: Activities,
        attributes: ['id', 'title', 'description'],
        through: { attributes: [] }
      },
      {
        model: Classes,
        attributes: ['id', 'difficulty', 'ActivityId', 'startDate', 'endDate'],
        include: [
          {
            model: Events,
            attributes: ["id", "date", "startTime", "endTime",],
          },
          {
            model: Coaches,
            attributes: ['id'],
          }
        ]
      }
    ]
  });
  if(!coach) return null;
  return coach;
};

const createCoach = async (firstName, lastName, profilePicture, description, education, workExperience, activities) => {
  let newCoach = await Coaches.create({ firstName, lastName, profilePicture, description, education, workExperience});
  for (const activityId of activities) {
    const activity = await Activities.findByPk(activityId);
    await newCoach.addActivities(activity);
  };
  newCoach = await Coaches.findByPk(newCoach.id, {
    include: [
      {
        model: Activities,
        attributes: ['id', 'title', 'description'],
        through: { attributes: [] }
      }
    ]
  })

  return newCoach;
};

const updateCoachById = async (id, firstName, lastName, profilePicture, description, education, workExperience, activities, isActive) => {
  const coach = await Coaches.findByPk(id, {
    include: [
      {
        model: Activities,
        attributes: ['title'],
        through: { attributes: [] }
      }
    ]
  });
  if(activities) {
    for (const activity of coach.Activities) {
      const activityInstance = await Activities.findByPk(activity.id);
      await coach.removeActivities(activityInstance);
    }
    for (const activityId of activities) {
      const activity = await Activities.findByPk(activityId);
      await coach.addActivities(activity);
    }
  }
  await coach.update({firstName, lastName, profilePicture, description, education, workExperience, isActive})
  return coach;
};

const deleteCoachById = async (id) => {
  const coach = await Coaches.findByPk(id);
  if(!coach) return null;
  await coach.destroy();
  const remainingCoaches = await Coaches.findAll({
    include: [
      {
        model: Activities,
        attributes: ['id', 'title'],
        through: { attributes: [] }
      }
    ],
  });
  return remainingCoaches;
};

module.exports = {
  getAllCoaches,
  getCoachById,
  createCoach,
  updateCoachById,
  deleteCoachById
}