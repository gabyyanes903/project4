import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCarById, updateCar, deleteCar } from '../services/CarsAPI.jsx'
import '../css/EditCar.css'

export default function EditCar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [activePanel, setActivePanel] = useState(null)

  const BASE_PRICE = 65000

  const exteriorMap = {
    redmist: { label: "Red Mist Metallic Tintcoat", price: 2000 },
    silverflare: { label: "Silver Flare Metallic", price: 1500 },
    arcticwhite: { label: "Arctic White", price: 1000 },
    black: { label: "Black", price: 500 }
  }

  const roofMap = {
    carbonflash: { label: "Visible Carbon Fiber", price: 1000 },
    bodycolor: { label: "Body Color", price: 500 },
    dual: { label: "Dual Roof", price: 2000, convertibleOnly: true }
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

  // SELECT OPTION
  const selectOption = (category, optionId, map) => {
    const option = map[optionId]

    if (option.convertibleOnly && !car.convertible) {
      alert("Sorry, you can't put that roof on a coupe 😔")
      return
    }

    const newCar = {
      ...car,
      [category]: optionId
    }

    newCar.price =
      BASE_PRICE +
      exteriorMap[newCar.exterior].price +
      roofMap[newCar.roof].price +
      wheelsMap[newCar.wheels].price +
      interiorMap[newCar.interior].price

    setCar(newCar)
  }

  // UPDATE
  const handleUpdate = async () => {
    await updateCar(id, car)
    navigate('/customcars')
  }

  // DELETE
  const handleDelete = async () => {
    await deleteCar(id)
    navigate('/customcars')
  }

  const items = [
    {
      label: `${exteriorMap[car.exterior].label} $${exteriorMap[car.exterior].price}`,
      img: exteriorImg[car.exterior]
    },
    {
      label: `${roofMap[car.roof].label} $${roofMap[car.roof].price}`,
      img: roofImg[car.roof]
    },
    {
      label: `${wheelsMap[car.wheels].label} $${wheelsMap[car.wheels].price}`,
      img: wheelsImg[car.wheels]
    },
    {
      label: `${interiorMap[car.interior].label} $${interiorMap[car.interior].price}`,
      img: interiorImg[car.interior]
    }
  ]

  // OPTION PANEL
  const renderPanel = (map, category, imgMap) => (
    <div className="edit-panel">
      <div className="edit-grid">
        {Object.keys(map).map(key => {
          const opt = map[key]
          const isSelected = car[category] === key
          return (
            <div
              key={key}
              className={`edit-card ${isSelected ? "selected" : ""}`}
              onClick={() => selectOption(category, key, map)}
            >
              <img src={imgMap[key]} alt={opt.label} />
              <div className="overlay">
                <p>{opt.label}</p>
                <p>${opt.price}</p>
                {opt.convertibleOnly && <p className="convertible-only">convertible only</p>}
              </div>
            </div>
          )
        })}
      </div>

      <button className="done-btn" onClick={() => setActivePanel(null)}>
        DONE
      </button>
    </div>
  )

  return (
    <main className="edit-layout">

      <div className="edit-box">

        {/* TOP BUTTONS */}
        <div className="edit-top-buttons">
          <button onClick={() => setActivePanel("exterior")}>EXTERIOR</button>
          <button onClick={() => setActivePanel("roof")}>ROOF</button>
          <button onClick={() => setActivePanel("wheels")}>WHEELS</button>
          <button onClick={() => setActivePanel("interior")}>INTERIOR</button>
        </div>

        {/* LEFT INFO */}
        <div className="left-info">
          <h2>{car.name}</h2>
          <p className="price">💰 ${car.price}</p>

          <button className="update-btn" onClick={handleUpdate}>UPDATE</button>
          <button className="delete-btn" onClick={handleDelete}>DELETE</button>
        </div>

        {/* IMAGES GRID */}
        <div className="images-grid">
          {items.map((item, i) => (
            <div key={i} className="detail-card">
              <img src={item.img} alt={item.label} />
              <div className="overlay">{item.label}</div>
            </div>
          ))}
        </div>

      </div>

      {/* OPTION PANEL OVERLAY */}
      {activePanel === "exterior" && renderPanel(exteriorMap, "exterior", exteriorImg)}
      {activePanel === "roof" && renderPanel(roofMap, "roof", roofImg)}
      {activePanel === "wheels" && renderPanel(wheelsMap, "wheels", wheelsImg)}
      {activePanel === "interior" && renderPanel(interiorMap, "interior", interiorImg)}

    </main>
  )
}