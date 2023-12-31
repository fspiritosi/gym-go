const { Coaches, Classes, Activities, Events, Reviews } = require("../db");

const getAllCoaches = async () => {
  const allCoaches = await Coaches.findAll({
    include: [
      {
        model: Activities,
        attributes: ["id", "title"],
        through: { attributes: [] },
      },
      {
        model: Classes,
        attributes: ["id", "difficulty", "recurringPattern", "startDate", "endDate", "startTime", "endTime"],
        include: [
          {
            model: Activities,
            attributes: ["id", "title"],
          },
          {
            model: Events,
            attributes: ["id", "date", ],
            
          },
        ],
      },
      {
        model: Reviews,
        attributes: ["id", "rate"],
      }
    ],
  });
  // const allCoachesWithAvgRate = allCoaches?.map((coach) => {
  //   const sumRates = coach.Reviews.reduce((accumulator, review) => accumulator + review.rate, 0);
  //   const avgRate = sumRates / coach.Reviews.length;
  //   const newCoach = { ...coach, avgRate: avgRate };
  //   console.log(newCoach);
  //   return newCoach;
  // });

  return allCoaches;
};

const getCoachById = async (id) => {
  const coach = await Coaches.findByPk(id, {
    include: [
      {
        model: Activities,
        attributes: ["id", "title", "description"],
        through: { attributes: [] },
      },
      {
        model: Classes,
        attributes: ["id", "difficulty", "ActivityId"],
        include: [
          {
            model: Events,
            attributes: ["id", "date", "startTime", "endTime"],
          },
          {
            model: Coaches,
            attributes: ["id"],
          },
        ],
      },
    ],
  });
  if (!coach) return null;
  return coach;
};

const createCoach = async (
  firstName,
  lastName,
  profilePicture,
  description,
  education,
  workExperience,
  activities
) => {
  let newCoach = await Coaches.create({
    firstName,
    lastName,
    profilePicture,
    description,
    education,
    workExperience,
  });
  for (const activityStr of activities) {
    const activity = await Activities.findAll({
      where: {
        title: activityStr,
      },
    });
    await newCoach.addActivities(activity);
  }
  newCoach = await Coaches.findByPk(newCoach.id, {
    include: [
      {
        model: Activities,
        attributes: ["id", "title", "description"],
        through: { attributes: [] },
      },
    ],
  });

  return newCoach;
};

const updateCoachById = async (
  id,
  firstName,
  lastName,
  profilePicture,
  description,
  education,
  workExperience,
  activities,
  isActive
) => {
  const coach = await Coaches.findByPk(id, {
    include: [
      {
        model: Activities,
        attributes: ["id", "title", "description"],
        through: { attributes: [] },
      },
    ],
  });
  // if(!coach) return null;
  // if(firstName) coach.firstName = firstName;
  // if(lastName) coach.lastName = lastName;
  // if(profilePicture) coach.profilePicture = profilePicture;
  // if(description) coach.description = description;
  // if(education) coach.education = education;
  // if(workExperience) coach.workExperience = workExperience;
  // if(isActive || !isActive) coach.isActive = isActive;
  if (activities) {
    for (const activityStr of activities) {
      const activityToAdd = await Activities.findAll({
        where: {
          title: activityStr,
        },
      });
      await coach.addActivities(activityToAdd);
    }
  }
  await coach.update({
    firstName,
    lastName,
    profilePicture,
    description,
    education,
    workExperience,
    isActive,
  });
  return coach;
};

const deleteCoachById = async (id) => {
  const coach = await Coaches.findByPk(id);
  if (!coach) return null;
  await coach.destroy();
  const remainingCoaches = await Coaches.findAll({
    include: [
      {
        model: Activities,
        attributes: ["id", "title"],
        through: { attributes: [] },
      },
    ],
  });
  return remainingCoaches;
};

module.exports = {
  getAllCoaches,
  getCoachById,
  createCoach,
  updateCoachById,
  deleteCoachById,
};
