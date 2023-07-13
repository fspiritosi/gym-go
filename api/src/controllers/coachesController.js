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
        attributes: ['id', 'title'],
        through: { attributes: [] }
      },
      {
        model: Classes,
        attributes: ['id', 'difficulty', 'ActivityId'],
        include: [
          {
            model: Events,
            attributes: [
              "id",
              "date",
              "startTime",
              "endTime",
            ],
          },
          {
            model: Coaches,
            attributes: [
              'id'
            ]
          }
        ]
      }
    ]
  });
  if(!coach) return null;
  return coach;
};

const createCoach = async (firstName, lastName, profilePicture, description, education, workExperience, activities) => {
  const newCoach = await Coaches.create({ firstName, lastName, profilePicture, description, education, workExperience});
  if (activities){
    for (const activityStr of activities) {
      const activity = await Activities.findAll({
        where: {
          title: activityStr
        }
      });
      await newCoach.addActivities(activity);
    };
  }
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
    for (const activityStr of activities) {
    const activity = await Activities.findAll({
      where: {
        title: activityStr
      }
    });
    await coach.addActivities(activity);
  }}
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
        model: Classes,
        attributes: ["startDate", "recurringPattern"],
        through: { attributes: [] }
      },
      {
        model: Activities,
        attributes: ["name"],
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