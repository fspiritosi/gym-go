const {Coaches, Classes} = require('../db')


const getCoaches = async () => {
    const allCoaches = await Coaches.findAll({
      include: [
        {
          model: Classes,
          attributes: ["startDate", "recurringPattern"],
        },
      ],
    });
    return allCoaches
}

const createCoaches = async (firstName, lastName, profilePicture, description, education, workExperience) => {
    const newCoache = await Coaches.create({
      firstName,
      lastName,
      profilePicture,
      description,
      education,
      workExperience,
    });
    return newCoache
};
const modifyCoaches = async () => {};
const deleteCoaches = async () => {};




module.exports = {getCoaches, createCoaches}