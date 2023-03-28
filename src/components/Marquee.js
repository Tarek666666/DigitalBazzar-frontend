import React from 'react'
import Marquee from "react-fast-marquee";

function MarqueeItems() {
  return (
    <div className='marquee-items-container mb-5' style={{ height: "100px", width: "80%", margin: "5px auto" }}>
            <Marquee direction="left" pauseOnHover={true} style={{ height: "100px", width: "100%", margin: "0 auto" }}>
            
                <img src='images/brands-logo/sony.png' alt="" style={{ height: "100px", width: "auto" }} />
                <img src='images/brands-logo/samsung.png' alt="" style={{ height: "100px", width: "auto" }} />
                <img src='images/brands-logo/hp.png' alt="" style={{ height: "100px", width: "auto" }} />
                <img src='images/brands-logo/lg.png' alt="" style={{ height: "100px", width: "auto" }} />
                <img src='images/brands-logo/asus.png' alt="" style={{ height: "100px", width: "auto" }} />
                <img src='images/brands-logo/huw.png' alt="" style={{ height: "100px", width: "auto" }} />
            
            </Marquee>
    </div>
  )
}

export default MarqueeItems

