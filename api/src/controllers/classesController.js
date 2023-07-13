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
        attributes: ["id", "title"],
       
      },
      {
        model: Coaches,
        attributes: ["id", "firstName", "lastName"],
        
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

const updateClassById = async (id, difficulty, startDate, endDate, startTime, endTime, quota) => {
  const getClass = await Classes.findByPk(id);
  console.log(getClass.toJSON());
  if(!getClass) return null;
  if(difficulty) getClass.difficulty = difficulty;
  if(startDate) {
    getClass.startDate = startDate;
    // Hay que modificar el date de los eventos asociados a la clase
  };
  if(endDate) {
    getClass.endDate = endDate;
    // Idem arriba
  };
  if(startTime) {
    getClass.startTime = startTime;

  }
  return updateClasses;
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