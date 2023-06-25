const { getControllerById } = require("../controller/getControllerById");

const getHandlerById = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await getControllerById(id);
    if (!goal) {
      return res.status(404).json({ msg: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getHandlerById };
