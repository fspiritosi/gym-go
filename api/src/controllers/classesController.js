const {Op, where} = require("sequelize");
const { Classes, Events } = require("../db");
const { createEvent } = require("./eventController");


const getAllClasses = async () => {
    let classes = await Classes.findAll({
        include: [
            {
                model: Events,
                attributes: ['date', 'startTime', 'endTime', 'duration', 'eventQuota']
            }
        ]}
    )
    return classes
}

const createClasses = async (
  difficulty,
  recurringPattern,
  startDate,
  endDate,
  startTime,
  endTime,
  quota,
  ActivityId,
  CoachId
) => {
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
  const events = createEvent(newClasses)
  return newClasses;
};

const putClasses = async (
  id,
  difficulty,
  recurringPattern,
  startDate,
  endDate,
  startTime,
  endTime,
  quota
) => {
  const updateClasses = await Classes.update(
    {
      difficulty,
      recurringPattern,
      startDate,
      endDate,
      startTime,
      endTime,
      quota,
    },
    { where: { id } }
  );
  return updateClasses;
};

const deleteClasses = async (id) => {
    const classes = await Classes.findByPk(id);
    !classes ? 'Class is not exist' : await Classes.destroy({where: {id: id}})
    return 'Class delete successfully'
}


module.exports = {
  getAllClasses,
  createClasses,
  putClasses,
  deleteClasses
};