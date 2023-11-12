const Task = require("../model/TaskModel");
const asyncWrapper = require("../middleware/async");

const getAllTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();

  return res.status(201).json({ sucess: true, data: tasks });
});

const getSingleTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (task) {
    res.status(200).json({ success: true, data: task });
  } else {
    res.status(200).json({ success: false, message: `no task with id ${id}` });
  }
});

const postTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);

  res.status(200).json({ sucess: true, data: task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);
  if (task) {
    return res.status(200).json({ sucess: true, message: "Task deleted" });
  } else {
    res.status(400).json({ success: false, message: `no task with id ${id}` });
  }
});

const updateTask = async (req, res) => {
  const { id } = req.params;

  // const task = await Task.findOneAndUpdate(req.body.id, { name, completed });
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (task) {
    return res.status(200).json({ sucess: true, data: task });
  } else {
    return res
      .status(404)
      .json({ sucess: false, message: `no task with taskId ${id}` });
  }
};
module.exports = {
  getAllTask,
  updateTask,
  deleteTask,
  postTask,
  getSingleTask,
};
