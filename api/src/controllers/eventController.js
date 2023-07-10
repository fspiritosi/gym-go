const { start } = require("repl");
const { Events, Classes } = require("../db");

const getAllEvents = async () => {
  const allEvents = await Events.findAll();
  return allEvents;
}

const getEventById = async (id) => {
  const event = await Events.findByPk(id);
  return event;
}

const createEvent = async ({ id, recurringPattern, startDate, endDate, startTime, endTime, quota }) => {
  const startDateInDate = new Date(startDate);
  const endDateInDate = new Date(endDate);
  const totalDays = (endDateInDate - startDateInDate) / 86400000;
  console.log(startTime);
  const initTimeArr = startTime.split(':')
  const endTimeArr = endTime.split(':')
  const duration = parseInt(endTimeArr[0]) - parseInt(initTimeArr[0])
  const maxQuota = quota
  // const eventQuota = Array(maxQuota).fill(undefined)

  if (recurringPattern === "does not repeat") {
    const date = startDate
    const newEvent = await Events.create({date, startTime, endTime, duration, ClassId: id});
    return newEvent;
  } 
  if (recurringPattern === "weekly") {
    const events = []
    let i = 0
    let date = new Date(startDateInDate.setDate(startDateInDate.getDate())+1);
    while ( i <= Math.floor(totalDays/7) ) {
      if(i === 0){
        events.push({
          date: date.setDate(date.getDate() + 1),
          startTime,
          endTime,
          duration,
          ClassId: id
        })
      }else {
        events.push({
          date: date.setDate(date.getDate() + 7),
          startTime,
          endTime,
          duration,
          ClassId: id
      })}
      i++
    }
    const newEvents = await Events.bulkCreate(events);
    return newEvents;
  };
};

const updateEventById = async (id, date, startTime, endTime, userId, isActive) => {
  const event = await Events.findByPk(id);
  const eventClass = await Classes.findByPk(event.ClassId);
  console.log(eventClass.toJSON());
  console.log(event.toJSON());
  if(!event) return null;
  if(date) event.date = date;
  if(startTime) event.startTime = startTime;
  if(endTime) event.endTime = endTime;
  if(isActive) event.isActive = isActive;
  if(userId) {
    if(event.eventQuota.includes(userId)) return "User ya anotado";
    if(event.eventQuota.length + 1 < clas.quota) {
      const newEventQuota = [...event.eventQuota, userId];
      event.eventQuota = newEventQuota;
    } else {
      return "Clase llena"
    };
  };
  await event.save();
  return event;
};

const deleteEventById = async (id) => {
  const eventToDestroy = await Events.findByPk(id);
  if(!eventToDestroy) return null;
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
}

const deleteEventsByClassId = async (arrayOfEventsId) => {
  arrayOfEventsId.forEach( async (eventId) => {
    const event = await Events.findByPk(eventId);
    await event.destroy();
  })
  return `Events deleted`;
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
  deleteEventsByClassId,
  deleteAllEvents
};