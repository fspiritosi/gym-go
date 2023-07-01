const { Events } = require("../db");

const createEvent = async (
  {recurringPattern,
  startDate,
  endDate,
  startTime,
  endTime,
  id
}
) => {

  console.log(id)
  const startDateInDate = new Date(startDate);
  //console.log('StartDate',startDateInDate)
  const endDateInDate = new Date(endDate);
  //console.log('EndDate',endDateInDate)
  const totalDays = (endDateInDate - startDateInDate) / 86400000;
  //console.log('TotalDays',totalDays)
  const initTimeArr = startTime.split(':')
  const endTimeArr = endTime.split(':')

  const duration = parseInt(endTimeArr[0]) - parseInt(initTimeArr[0])

  if (recurringPattern === "does not repeat") {
    const date = startDate
    const newEvent = await Events.create({date, startTime, endTime, duration, ClassId: id});
  } 
  if (recurringPattern === "weekly") {
    const events = []
    const intDay = startDateInDate.getDate();
    //console.log('initDay',intDay)
    let i = 0

    
    while (i < totalDays){
      //console.log('i:',i)
      events.push({
        date: new Date(
          startDateInDate.setDate(startDateInDate.getDate() + i )
        ),
        //date: intDay +1 + i,
        startTime,
        endTime,
        duration,
        ClassId: id
      });
      i = i + 7
    }

    const newEvents = await Events.bulkCreate(events)

    console.log("Eventos Creados:", newEvents);
   }

//   }
//return duration
  
};



module.exports = {createEvent}



