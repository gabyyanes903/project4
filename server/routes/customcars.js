import express from 'express'
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/customcars.js'

const router = express.Router()

// GET all cars
router.get('/', getCars)

// GET one car
router.get('/:id', getCarById)

// CREATE a car
router.post('/', createCar)

// UPDATE a car
router.patch('/:id', updateCar)

// DELETE a car
router.delete('/:id', deleteCar)

export default router