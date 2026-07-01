import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCarById, deleteCar } from '../services/CarsAPI.jsx'
import '../css/CarDetails.css'

export default function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)

  const exteriorMap = {
    redmist: { label: "Red Mist Metallic Tintcoat", price: 2000 },
    silverflare: { label: "Silver Flare Metallic", price: 1500 },
    arcticwhite: { label: "Arctic White", price: 1000 },
    black: { label: "Black", price: 500 }
  }

  const roofMap = {
    carbonflash: { label: "Visible Carbon Fiber", price: 1000 },
    bodycolor: { label: "Body Color", price: 500 },
    dual: { label: "Dual Roof", price: 2000 }
  }

  const wheelsMap = {
    bronze: { label: "Bronze Forged", price: 1200 },
    carbonflash: { label: "Carbon Flash", price: 500 },
    edgeblue: { label: "Edge Blue", price: 1300 }
  }

  const interiorMap = {
    skygray: { label: "Sky Cool Gray", price: 1000 },
    jetblack: { label: "Jet Black", price: 1000 },
    adrenalinered: { label: "Adrenaline Red", price: 1000 }
  }

  const exteriorImg = {
    redmist: "https://boltbucket-exemplar.onrender.com/images/exteriors/red_mist.png",
    silverflare: "https://boltbucket-exemplar.onrender.com/images/exteriors/silver_flare_metallic.png",
    arcticwhite: "https://boltbucket-exemplar.onrender.com/images/exteriors/arctic_white.png",
    black: "https://boltbucket-exemplar.onrender.com/images/exteriors/black.png"
  }

  const roofImg = {
    carbonflash: "https://boltbucket-exemplar.onrender.com/images/roofs/carbon_fiber_with_body_color.png",
    bodycolor: "https://boltbucket-exemplar.onrender.com/images/roofs/carbon_flash_body_color.avif",
    dual: "https://boltbucket-exemplar.onrender.com/images/roofs/dual_roof.avif"
  }

  const wheelsImg = {
    bronze: "https://boltbucket-exemplar.onrender.com/images/wheels/bronze_forged.avif",
    carbonflash: "https://boltbucket-exemplar.onrender.com/images/wheels/carbon_flash_spoke.avif",
    edgeblue: "https://boltbucket-exemplar.onrender.com/images/wheels/edge_blue_spoke.avif"
  }

  const interiorImg = {
    skygray: "https://boltbucket-exemplar.onrender.com/images/interiors/sky_cool_grey_perforated.jpg",
    jetblack: "https://boltbucket-exemplar.onrender.com/images/interiors/jet_black.avif",
    adrenalinered: "https://boltbucket-exemplar.onrender.com/images/interiors/adrenaline_red.jpg"
  }

  useEffect(() => {
    async function load() {
      const data = await getCarById(id)
      setCar(data)
    }
    load()
  }, [id])

  if (!car) return null

  const items = [
    {
      label: `Exterior: ${exteriorMap[car.exterior].label} $${exteriorMap[car.exterior].price}`,
      img: exteriorImg[car.exterior]
    },
    {
      label: `Roof: ${roofMap[car.roof].label} $${roofMap[car.roof].price}`,
      img: roofImg[car.roof]
    },
    {
      label: `Wheels: ${wheelsMap[car.wheels].label} $${wheelsMap[car.wheels].price}`,
      img: wheelsImg[car.wheels]
    },
    {
      label: `Interior: ${interiorMap[car.interior].label} $${interiorMap[car.interior].price}`,
      img: interiorImg[car.interior]
    }
  ]

  const handleDelete = async () => {
    await deleteCar(id)
    navigate('/customcars')
  }

  return (
    <main className="details-layout">

      <div className="details-box">

        <div className="left-info">
          <h2>{car.name}</h2>
          <p className="price">💰 ${car.price}</p>

          <button className="edit-btn" onClick={() => navigate(`/customcars/${id}/edit`)}>
            EDIT
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            DELETE
          </button>
        </div>

        <div className="images-grid">
          {items.map((item, i) => (
            <div key={i} className="detail-card">
              <img src={item.img} alt={item.label} />
              <div className="overlay">{item.label}</div>
            </div>
          ))}
        </div>

      </div>

    </main>
  )
}
