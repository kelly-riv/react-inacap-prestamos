import React, {useState,useEffect} from "react";


const CarouselFragment = ({img1,img2,img3}) =>{
    return(
        <>
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img1} className="carousel-image" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img2} className="carousel-image" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={img3} className="carousel-image" alt="..." />
          </div>
        </div>
      </div>
        
        
        
        </>
    )
}

export default CarouselFragment