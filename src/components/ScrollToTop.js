import React from 'react'
import {ArrowUpCircleFill} from 'react-bootstrap-icons'

function ScrollToTop() {
    const scrollTop=()=>{
        window.scrollTo({ top: 0 })
    }
    return (
        <div className="fs-2 position-fixed scrollToTop" style={{zIndex:"100000"}}>
           <button className="transparentBtn" onClick={e=>scrollTop()}><ArrowUpCircleFill /> </button>
        </div>
    )
}

export default ScrollToTop
