const { putControllerById } = require("../controller/putControllerById");
const putHandlerById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const data = req.body;
    console.log(data);
    const userUpdate = await putControllerById(id, data);
    if (!userUpdate) {
      res.status(404).json(`${userUpdate} not found`);
      return;
    }
    res.status(200).json(`Successfully updated registration`);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { putHandlerById };
