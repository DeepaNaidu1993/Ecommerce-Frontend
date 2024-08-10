import React, { useEffect,useContext } from 'react'
import Navbar from './navbar'
import { ProductContext } from '../App'
import axios from 'axios'
import {Link} from 'react-router-dom'
import GIF from '../Images/giphy.gif'

function EndPage() 
{
    const value = useContext(ProductContext)

    useEffect(() => 
    {
       //value.updateCart();
       axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/updateCart?id=${value.userData[0]._id}`, [])
      .then((res) => {
        console.log("cart is empty now")
      })
      value.authToken();
     
    }, [])
    return (
        <div>
            <Navbar/>
            <div className="end-page d-flex flex-column justify-content-center align-items-center">
                <img src={GIF} height="200px" width ="200px" className="mb-3"></img>
                <h2>Thank you for shopping with us</h2>
                <Link to="/" className="nav-link"> <h5>Continue shopping with us</h5></Link>
           </div>
        </div>
    )
}

export default EndPage
