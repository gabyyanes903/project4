import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI.jsx'
import '../App.css'
import '../css/CreateCar.css'

export default function CreateCar() {
  const navigate = useNavigate()

  const BASE_PRICE = 65000

  const [car, setCar] = useState({
    name: '',
    convertible: false,
    exterior: null,
    roof: null,
    wheels: null,
    interior: null,
    price: BASE_PRICE
  })

  const [activePanel, setActivePanel] = useState(null)
  const [error, setError] = useState(null)

  const exteriorOptions = [
    { id: "redmist", label: "Red Mist Metallic Tintcoat", price: 2000, img: "https://boltbucket-exemplar.onrender.com/images/exteriors/red_mist.png" },
    { id: "silverflare", label: "Silver Flare Metallic", price: 1500, img: "https://boltbucket-exemplar.onrender.com/images/exteriors/silver_flare_metallic.png" },
    { id: "arcticwhite", label: "Arctic White", price: 1000, img: "https://boltbucket-exemplar.onrender.com/images/exteriors/arctic_white.png" },
    { id: "black", label: "Black", price: 500, img: "https://boltbucket-exemplar.onrender.com/images/exteriors/black.png" }
  ]

  const roofOptions = [
    { id: "carbonflash", label: "Visible Carbon Fiber", price: 1000, img: "https://boltbucket-exemplar.onrender.com/images/roofs/carbon_fiber_with_body_color.png" },
    { id: "bodycolor", label: "Body Color", price: 500, img: "https://boltbucket-exemplar.onrender.com/images/roofs/carbon_flash_body_color.avif" },
    { id: "dual", label: "Dual Roof", price: 2000, img: "https://boltbucket-exemplar.onrender.com/images/roofs/dual_roof.avif", convertibleOnly: true }
  ]

  const wheelOptions = [
    { id: "bronze", label: "Bronze Forged", price: 1200, img: "https://boltbucket-exemplar.onrender.com/images/wheels/bronze_forged.avif" },
    { id: "carbonflash", label: "Carbon Flash", price: 500, img: "https://boltbucket-exemplar.onrender.com/images/wheels/carbon_flash_spoke.avif" },
    { id: "edgeblue", label: "Edge Blue", price: 1300, img: "https://boltbucket-exemplar.onrender.com/images/wheels/edge_blue_spoke.avif" }
  ]

  const interiorOptions = [
    { id: "skygray", label: "Sky Cool Gray", price: 1000, img: "https://boltbucket-exemplar.onrender.com/images/interiors/sky_cool_grey_perforated.jpg" },
    { id: "jetblack", label: "Jet Black", price: 1000, img: "https://boltbucket-exemplar.onrender.com/images/interiors/jet_black.avif" },
    { id: "adrenalinered", label: "Adrenaline Red", price: 1000, img: "https://boltbucket-exemplar.onrender.com/images/interiors/adrenaline_red.jpg" }
  ]

  // SELECT OPTION
  const selectOption = (category, option) => {
    if (option.convertibleOnly && !car.convertible) {
      setError("Sorry, you can't put that roof on a coupe 😔")
      return
    }

    setCar(prev => ({
      ...prev,
      [category]: option.id,
      price:
        BASE_PRICE +
        (category === "exterior" ? option.price : prev.exterior ? exteriorOptions.find(o => o.id === prev.exterior).price : 0) +
        (category === "roof" ? option.price : prev.roof ? roofOptions.find(o => o.id === prev.roof).price : 0) +
        (category === "wheels" ? option.price : prev.wheels ? wheelOptions.find(o => o.id === prev.wheels).price : 0) +
        (category === "interior" ? option.price : prev.interior ? interiorOptions.find(o => o.id === prev.interior).price : 0)
    }))
  }

  // SAVE CAR
  const handleSubmit = async () => {
    await createCar(car)
    navigate('/customcars')
  }

  // OPTION PANEL
  const renderPanel = (options, category) => (
    <div className="option-panel">
      <div className="option-grid">
        {options.map(opt => {
          const isSelected = car[category] === opt.id
          return (
            <div
              key={opt.id}
              className={`option-card ${isSelected ? "selected" : ""}`}
              onClick={() => selectOption(category, opt)}
            >
              <img src={opt.img} alt={opt.label} />
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

  // ERROR MODAL
  if (error) {
    return (
      <main className="error-modal">
        <h2>⚠️ NOPE!</h2>
        <p>Sorry, you can't put that roof on a coupe 😔</p>
        <button onClick={() => setError(null)}>UGH, OK FINE 🙄</button>
      </main>
    )
  }

  return (
    <main className="create-layout">

      {/* TOP BAR */}
      <div className="top-bar">

        {/* LEFT GROUP */}
        <div className="left-group">
          <label className="convertible-label">
            <input
              type="checkbox"
              checked={car.convertible}
              onChange={(e) => setCar({ ...car, convertible: e.target.checked })}
            />
            Convertible
          </label>

          <button onClick={() => setActivePanel("exterior")}>EXTERIOR</button>
          <button onClick={() => setActivePanel("roof")}>ROOF</button>
          <button onClick={() => setActivePanel("wheels")}>WHEELS</button>
          <button onClick={() => setActivePanel("interior")}>INTERIOR</button>
        </div>

        {/* RIGHT GROUP */}
        <div className="right-group">
          <input
            className="name-input"
            placeholder="My New Car"
            value={car.name}
            onChange={(e) => setCar({ ...car, name: e.target.value })}
          />
          <button className="create-btn" onClick={handleSubmit}>CREATE</button>
        </div>

      </div>

      {/* OPTION PANEL */}
      {activePanel && (
        <div className="panel-wrapper">
          {activePanel === "exterior" && renderPanel(exteriorOptions, "exterior")}
          {activePanel === "roof" && renderPanel(roofOptions, "roof")}
          {activePanel === "wheels" && renderPanel(wheelOptions, "wheels")}
          {activePanel === "interior" && renderPanel(interiorOptions, "interior")}
        </div>
      )}

      {/* PRICE BOX */}
      <div className="price-box">
        💰 ${car.price}
      </div>

    </main>
  )
}
