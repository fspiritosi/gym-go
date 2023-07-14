const { start } = require("repl");
const { Events, Classes, users, Activities, Coaches } = require("../db");

const getAllEvents = async () => {
  const allEvents = await Events.findAll({
    include: {
      model: users,
      attributes: ['id', 'username', 'email'],
      through: { attributes: [] }
    },
  });
  return allEvents;
};

const getEventById = async (id) => {
  const event = await Events.findByPk(id, {
    include: [
      {
        model: users,
        attributes: ['id', 'username', 'email'],
        through: { attributes: [] }
      },
      {
        model: Classes,
        attributes: [
          "difficulty",
          "recurringPattern",
          "startDate",
          "endDate",
          "quota",
        ],
        include: [
          {
            model: Activities,
            attributes: ["title", "description", "image"],
          },
          {
            model: Coaches,
            attributes: [
              "firstName",
              "lastName",
              "profilePicture",
              "description",
            ],
          },
        ],
      },
    ],
  });
  return event;
};

const createEvent = async ({
  id,
  recurringPattern,
  startDate,
  endDate,
  startTime,
  endTime,
  quota,
}) => {
  const startDateInDate = new Date(startDate);
  const endDateInDate = new Date(endDate);
  const totalDays = (endDateInDate - startDateInDate) / 86400000;
  console.log(startTime);
  const initTimeArr = startTime.split(":");
  const endTimeArr = endTime.split(":");
  const duration = parseInt(endTimeArr[0]) - parseInt(initTimeArr[0]);
  const maxQuota = quota;
  // const eventQuota = Array(maxQuota).fill(undefined)

  if (recurringPattern === "does not repeat") {
    const date = startDate;
    const newEvent = await Events.create({
      date,
      startTime,
      endTime,
      duration,
      ClassId: id,
    });
    return newEvent;
  }
  if (recurringPattern === "weekly") {
    const events = [];
    let i = 0;
    let date = new Date(startDateInDate.setDate(startDateInDate.getDate()) + 1);
    while (i <= Math.floor(totalDays / 7)) {
      if (i === 0) {
        events.push({
          date: date.setDate(date.getDate() + 1),
          startTime,
          endTime,
          duration,
          ClassId: id,
        });
      } else {
        events.push({
          date: date.setDate(date.getDate() + 7),
          startTime,
          endTime,
          duration,
          ClassId: id,
        });
      }
      i++;
    }
    const newEvents = await Events.bulkCreate(events);
    return newEvents;
  }
};

const updateEventById = async (
  id,
  date,
  startTime,
  endTime,
  userId,
  isActive
) => {
  const event = await Events.findByPk(id, {
    include: {
      model: users,
      attributes: ['id', 'username', 'email']
    },
  });
  const eventClass = await Classes.findByPk(event.ClassId);
  if (!event) return null;
  if (date) event.date = date;
  if (startTime) event.startTime = startTime;
  if (endTime) event.endTime = endTime;
  if (isActive || !isActive) event.isActive = isActive;
  if (userId) {
    const user = await users.findByPk(userId);
    if (event.eventQuota.includes(user.id)) return "User ya anotado";
    if (user.credits < 1) return "Usuario sin creditos";
    if (event.eventQuota.length < eventClass.quota) {
      await event.addUsers(user);
      const newEventQuota = [...event.eventQuota, user.id];
      event.eventQuota = newEventQuota;
      user.credits--;
      await user.save();
    } else {
      return "Clase llena";
    }
  }
  await event.save();
  return event;
};

const deleteEventById = async (id) => {
  const eventToDestroy = await Events.findByPk(id);
  if (!eventToDestroy) return null;
  await eventToDestroy.destroy();
  const remainingEvents = await Events.findAll();
  return remainingEvents;
};

const deleteAllEvents = async () => {
  const allEvents = await Events.findAll();
  allEvents.forEach(async (event) => {
    await event.destroy();
  });
  const remainingEvents = await Events.findAll();
  return remainingEvents;
};

const deleteEventsByClassId = async (arrayOfEventsId) => {
  arrayOfEventsId.forEach(async (eventId) => {
    const event = await Events.findByPk(eventId);
    await event.destroy();
  });
  return `Events deleted`;
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
  deleteEventsByClassId,
  deleteAllEvents,
};
