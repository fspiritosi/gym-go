const { Events } = require("../db");

const createEvent = async (
  {recurringPattern,
  startDate,
  endDate,
  startTime,
  endTime,
  quota,
  id
}
) => {

  const startDateInDate = new Date(startDate);
  const endDateInDate = new Date(endDate);
  const totalDays = (endDateInDate - startDateInDate) / 86400000;
  const initTimeArr = startTime.split(':')
  const endTimeArr = endTime.split(':')
  const duration = parseInt(endTimeArr[0]) - parseInt(initTimeArr[0])
  const maxQuota = quota
  const eventQuota = Array(maxQuota).fill(undefined)

  if (recurringPattern === "does not repeat") {
    const date = startDate
    const newEvent = await Events.create({date, startTime, endTime, duration,eventQuota,ClassId: id});
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
          eventQuota,
          ClassId: id
        })
      }else {
        events.push({
          date: date.setDate(date.getDate() + 7),
          startTime,
          endTime,
          duration,
          eventQuota,
          ClassId: id
      })}
      i++
      }
      const newEvents = await Events.bulkCreate(events)
    }
  }
module.exports = {createEvent}



