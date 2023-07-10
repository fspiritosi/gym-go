const { getAllEvents, getEventById, createEvent, updateEventById, deleteEventById, deleteAllEvents } = require("../controllers/eventController");

const getAllEventsHandler = async (req, res) => {
  try {
    const allEvents = await getAllEvents();
    res.status(200).json(allEvents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const getEventByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await getEventById(id);
    if(!event) res.status(404).json({ message: `Event with id ${id} not found`});
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const createEventHandler = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

const updateEventByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, startTime, endTime, userId, isActive } = req.body;
    const updatedEvent = await updateEventById(id, date, startTime, endTime, userId, isActive);
    if(!updatedEvent) res.status(404).json({ msg: `Event with id ${id} not found` });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const deleteEventByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteEventById(id);
    if(!response) res.status(404).json({ message: `Event with id ${id} not found`});
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

const deleteAllEventsHandler = async (req, res) => {
  try {
    const response = await deleteAllEvents();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
};

module.exports = {
  getAllEventsHandler,
  getEventByIdHandler,
  createEventHandler,
  updateEventByIdHandler,
  deleteEventByIdHandler,
  deleteAllEventsHandler
}