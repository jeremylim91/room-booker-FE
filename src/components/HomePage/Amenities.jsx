import React from 'react'
import Title from '/Title.jsx'
import { MdLocalDrink, AiOutlineFundProjectionScreen, FaConciergeBell } from "react-icons/fa";


export default function Amenities() {
  
  const amenities= [
      {
        icon: <FaConciergeBell />,
        title: "Concierge Service",
        info:
          `Our on-site concierge provides the following services:
          1. Ordering refreshments/meals for meetings
          2. Troubleshooting IT devices (e.g. presentation aids)
          `
      },
      {
        icon: <AiOutlineFundProjectionScreen />,
        title: "Presentation aids",
        info:
          `All our meeting rooms are equipped with a range of digital and analogue presentation aids, ranging from projectors to whiteboards.`
      },
      {
        icon: <MdLocalDrink />,
        title: "Light Refreshments",
        info:
          "Our meeting rooms come with access to fresh water and a variety of teas to energise your meetings"
      },
    ]
  const DisplayAmenities= ()=>{
    amenities.map((amenity, idx)=>{
      return(
        <article key={idx} className='amenities'>
          <span>{amenity.icon}</span>
          <h6>{amenity.title}</h6>
          <p>{amenity.info}</p>
        </article>
      )
    })
  }
  
  return (
    <section className="amenities">
        <Title title="Amenities" />
        <div className="amenities-center">
          <DisplayAmenities/>
        </div>
      </section>
  )
}
