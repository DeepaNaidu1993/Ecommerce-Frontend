import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

function SignUp(props)
{
    const SubmitSignUpData = (e)=>
    {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/createAcc`,signUpData)
        .then((res)=>
        {
            props.history.push("/login")

        })
        .catch((err)=>
        {
            console.log("error occured while signing up")
        })
    }
    
    const [signUpData, setsignUpData] = useState()

    return(
        <div className="form d-flex justify-content-center align-items-center card-body">
            <div className="card p-3 v-100" style={{width:"25rem"}}>
                <div className="">
                    <h4 className="text-center mb-4">SIGN UP</h4>
                 <form>
                    <input type="text" className="form-control mb-3" placeholder="Enter your Name" onChange={e=> setsignUpData({...signUpData, name: e.target.value})}/>
                    <input type="email" className="form-control mb-3" placeholder="Enter your Email" onChange={e=> setsignUpData({...signUpData, email: e.target.value})}/>
                    <input type="password" className="form-control mb-3" placeholder="Enter your Password" onChange={e=> setsignUpData({...signUpData, password: e.target.value})}/>
                    <input type="password" className="form-control mb-3" placeholder="Confirm your Password" onChange={e=> setsignUpData({...signUpData, newPassword: e.target.value})}/>
                    <textarea type="text" className="form-control mb-3" placeholder="Enter your address" onChange={e=> setsignUpData({...signUpData, address: e.target.value})}/>
                    <input type="tel" className="form-control mb-3" placeholder="Enter your Phone Number" onChange={e=> setsignUpData({...signUpData, phone: e.target.value})}/>
                    
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary mb-4 " onClick={SubmitSignUpData}>Register</button>
                    </div>
                    <p className="text-center">Already have an account? <Link to = "/login">Login</Link></p>
                </form>
                </div>
            </div>  
        </div>
    )
}
export default SignUp;