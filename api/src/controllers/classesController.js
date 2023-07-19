const { Op, where } = require("sequelize");
const { Classes, Events, Activities, Coaches } = require("../db");
const { createEvent, deleteEventsByClassId } = require("./eventController");
const { start } = require("repl");

const getAllClasses = async () => {
  const allClasses = await Classes.findAll({
    include: [
      {
        model: Events,
        attributes: ["id", "date", "startTime", "endTime", "eventQuota"],
      },
      {
        model: Activities,
        attributes: ["id", "title", 'image'],
       
      },
      {
        model: Coaches,
        attributes: ["id", "firstName", "lastName", 'profilePicture'],
        
      },
    ],
  });
  return allClasses;
};

const getClassById = async (id) => {
  const getClass = await Classes.findByPk(id);
  return getClass;
}

const createClass = async (difficulty, recurringPattern, startDate, endDate, startTime, endTime, quota, ActivityId, CoachId) => {
  let activity = await Activities.findByPk(ActivityId, {
    include: {
      model: Coaches,
      attributes: ['id'],
      through: { attributes: [] },
    }
  });
  activity.Coaches = activity.Coaches.map(obj => obj.id);
  console.log(activity.Coaches);
  if (!activity.Coaches.includes(CoachId)) return null;
  const newClasses = await Classes.create({
    difficulty,
    recurringPattern,
    startDate,
    endDate,
    startTime,
    endTime,
    quota,
    ActivityId,
    CoachId,
  });
  //se ejecuta la función para crear eventos
  createEvent(newClasses);
  return newClasses;
};

const updateClassById = async (
  id,
  difficulty,
  startDate,
  endDate,
  startTime,
  endTime,
  quota,
  recurringPattern,
  isActive
) => {
  const clase = await Classes.findByPk(id, {
    include: [
      {
        model: Events,
        attributes: ["id", "date", "startTime", "endTime", "eventQuota"],
      },
      {
        model: Activities,
        attributes: ["id", "title", "image"],
      },
      {
        model: Coaches,
        attributes: ["id", "firstName", "lastName", "profilePicture"],
      },
    ],
  });
  console.log(clase.toJSON());

  await clase.update({
    difficulty,
    startDate,
    endDate,
    startTime,
    endTime,
    quota,
    recurringPattern,
    isActive,
  });
  return clase;
};

const deleteClassById = async (id) => {
  const classToDestroy = await Classes.findByPk(id, {
    include: [
      {
        model: Events,
        attributes: ['id']
      }
    ]
  });
  if(!classToDestroy) return null;
  const eventsToDestroy = classToDestroy.Events.map(event => event.id);
  deleteEventsByClassId(eventsToDestroy);
  await classToDestroy.destroy();
  return `Class with id ${id} delete successfully and events associated`;
};


module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClassById,
  deleteClassById
};