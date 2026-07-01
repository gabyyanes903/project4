import { useEffect, useState } from 'react'
import { getCars } from '../services/CarsAPI.jsx'
import { useNavigate } from 'react-router-dom'
import '../css/ViewCars.css'

export default function ViewCars() {
  const [cars, setCars] = useState([])
  const navigate = useNavigate()

  const exteriorMap = {
    redmist: "Red Mist Metallic Tintcoat",
    silverflare: "Silver Flare Metallic",
    arcticwhite: "Arctic White",
    black: "Black"
  }

  const roofMap = {
    carbonflash: "Visible Carbon Fiber",
    bodycolor: "Body Color",
    dual: "Dual Roof"
  }

  const wheelsMap = {
    bronze: "Bronze Forged",
    carbonflash: "Carbon Flash",
    edgeblue: "Edge Blue"
  }

  const interiorMap = {
    skygray: "Sky Cool Gray",
    jetblack: "Jet Black",
    adrenalinered: "Adrenaline Red"
  }

  useEffect(() => {
    async function load() {
      const data = await getCars()

      const mapped = data.map(car => ({
        ...car,
        exteriorLabel: exteriorMap[car.exterior],
        roofLabel: roofMap[car.roof],
        wheelsLabel: wheelsMap[car.wheels],
        interiorLabel: interiorMap[car.interior]
      }))

      setCars(mapped)
    }
    load()
  }, [])

  return (
    <main className="viewcars-layout">

      <h1 className="viewcars-title">Your Cars</h1>

      <div className="cars-grid">
        {cars.map(car => (
          <article key={car.id} className="car-card">

            <h2 className="car-name">
              🚗 {car.name || "Unnamed"}
            </h2>

            <p><strong>Exterior:</strong> {car.exteriorLabel}</p>
            <p><strong>Roof:</strong> {car.roofLabel}</p>
            <p><strong>Wheels:</strong> {car.wheelsLabel}</p>
            <p><strong>Interior:</strong> {car.interiorLabel}</p>

            <p className="car-price">💰 ${car.price}</p>

            <button
              className="details-btn"
              onClick={() => navigate(`/customcars/${car.id}`)}
            >
              DETAILS
            </button>

          </article>
        ))}
      </div>

    </main>
  )
}
