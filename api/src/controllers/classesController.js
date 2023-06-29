const {Op, where} = require("sequelize");
const { Classes } = require("../db");

const getAllClasses = async () => {
    let classes = await Classes.findAll()
    return classes
}

const createClasses = async (
  difficulty,
  startDate,
  startTime,
  duration,
  recurringPattern,
  ActivityId
) => {
  const newClasses = await Classes.create({
    difficulty,
    startDate,
    startTime,
    duration,
    recurringPattern,
    ActivityId,
    //   CoachId,
  });
  return newClasses;
};

const putClasses = async (
    id,
  difficulty,
  startDate,
  startTime,
  duration,
  recurringPattern
) => {
    const updateClasses = await Classes.update(
        {
            difficulty,
            startDate,
            startTime,
            duration,
            recurringPattern
        },
        {where: {id}}
    
    );
    return updateClasses
};


module.exports = {
  getAllClasses,
  createClasses,
  putClasses
};