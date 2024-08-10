import axios from 'axios';
import React, { useContext } from 'react'
import {useState} from 'react';
import {Link} from 'react-router-dom'
import { ProductContext } from '../App';

function Login(props)
{
    const value = useContext(ProductContext);
    const [loginData, setloginData] = useState();

    const SubmitLoginData =(e)=>
    {
        console.log("kuch bhi kar de")
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`,loginData)
        .then((res)=>
        {
            console.log(res.data.message)
            //localStorage.setItem('token', res.data.myToken);
            value.updateToken(res.data.myToken);
            props.history.push("/")
        })  
        .catch((err)=>
        {
            console.log("error occured while logging");

        }) 
    }
    
    return (
    <div>
        <div className="form d-flex flex-column justify-content-center align-items-center card-body">
            <div className="card p-3 v-100" style={{width:"25rem"}}>
                <div className="">
                    <h4 className="text-center mb-4">LOGIN</h4>
                    <form>
                        <input type="email" className="form-control mb-3" placeholder="Enter your Email" onChange={e=> setloginData({...loginData, email: e.target.value})}/>
                        <input type="password" className="form-control mb-3" placeholder="Enter your Password" onChange={e=> setloginData({...loginData, password: e.target.value})}/>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary mb-4 "  onClick={SubmitLoginData}> Login </button>
                        </div>
                        <p className="text-center">Not an Existing User? <Link to = "/signup">SignUp</Link></p>
                        <p className="text-center">Have trouble logging in ? <Link to = "/forgotpass">Forgot Password</Link></p>
                    </form>
                </div>
            </div>   
        </div>
    </div>    
    )
}

export default Login;
