const pool = require("../db");

const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await pool.query(`SELECT * FROM task WHERE id = $1`, [
      req.params.id,
    ]);

    if (task.rows.length === 0) {
      return res.status(404).json(`Task ${req.params.id} not found`);
    }
    res.json(task.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *`,
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE task SET title = $1, description = $2 WHERE id = $3`,
      [title, description, id]
    );
    if (result.rowCount === 0)
      return res.status(404).json(`Task ${id} not found`);
    console.log(result);
    res.send(`Task ${id} updated successfully`);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const result = await pool.query(`DELETE FROM task WHERE id = $1 RETURNING *`, [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json(`Task ${req.params.id} not found`);
    }
    res.sendStatus(204); // No content -> La tarea se eliminó correctamente
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
