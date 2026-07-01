const BASE_URL = '/api/customcars'

// GET all cars
export const getCars = async () => {
  try {
    const response = await fetch(BASE_URL)
    return await response.json()
  } catch (error) {
    console.error('Error fetching cars:', error)
    return []
  }
}

// GET one car
export const getCarById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching car:', error)
    return null
  }
}

// CREATE a car
export const createCar = async (carData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData)
    })
    return await response.json()
  } catch (error) {
    console.error('Error creating car:', error)
    return null
  }
}

// UPDATE a car
export const updateCar = async (id, carData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData)
    })
    return await response.json()
  } catch (error) {
    console.error('Error updating car:', error)
    return null
  }
}

// DELETE a car
export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    })
    return await response.json()
  } catch (error) {
    console.error('Error deleting car:', error)
    return null
  }
}