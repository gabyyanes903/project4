import { pool } from '../config/database.js'

// GET all cars
export const getCars = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM customcars ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET one car by ID
export const getCarById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('SELECT * FROM customcars WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// CREATE a new car
export const createCar = async (req, res) => {
  try {
    const { name, convertible, exterior, roof, wheels, interior, price } = req.body

    const results = await pool.query(
      `INSERT INTO customcars (name, convertible, exterior, roof, wheels, interior, price)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, convertible, exterior, roof, wheels, interior, price]
    )

    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

// UPDATE a car
export const updateCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name, convertible, exterior, roof, wheels, interior, price } = req.body

    const results = await pool.query(
      `UPDATE customcars
       SET name = $1, convertible = $2, exterior = $3, roof = $4, wheels = $5, interior = $6, price = $7
       WHERE id = $8
       RETURNING *`,
      [name, convertible, exterior, roof, wheels, interior, price, id]
    )

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

// DELETE a car
export const deleteCar = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('DELETE FROM customcars WHERE id = $1 RETURNING *', [id])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}