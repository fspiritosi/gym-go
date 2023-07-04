const {getCoaches, createCoaches} = require('../controllers/coachesController')


const getCoachesHandler = async(req, res) => {
    try {
        const coaches = await getCoaches()
        res.status(200).json(coaches)
    } catch (error) {
         res.status(400).json({ message: error.message });
    }
}

const postCoachesHandler = async (req, res) => {
    try {
        const {
          firstName,
          lastName,
          profilePicture,
          description,
          education,
          workExperience,
        } = req.body;
        const newCoache = await createCoaches(
          firstName,
          lastName,
          profilePicture,
          description,
          education,
          workExperience
        );
        res.status(200).json(newCoache)
    } catch (error) {
         res.status(400).json({ message: error.message });
    }
}


module.exports = { getCoachesHandler, postCoachesHandler };