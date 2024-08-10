import axios from 'axios'
import React, { useState } from 'react'

function Forgotpassword(props) {
    const [email, setEmail] = useState();
    const [Show, setShow] = useState({ otp: false, emailForm: true })

    const SendOtp = (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/getotp`, email)
            .then((res) => {
                setShow({ ...Show, otp: true })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const VerifyOtp = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/verifyotp`, email)
            .then((res) => {
                setShow({ ...Show, emailForm: false })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const ResetPassword = (e) => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/resetpass`, email)
            .then((res) => {
                props.history.push("/login")
                alert("password reset successfully");
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <div className="form d-flex flex-column justify-content-center align-items-center card-body">
                <div className="card p-3 v-100" style={{ width: "25rem" }}>
                    <div className="">
                        <h4 className="text-center mb-4">LOGIN</h4>
                        <form>
                            {Show.emailForm ?
                                <>
                                    <input type="email" disabled={Show.otp} className="form-control mb-3" placeholder="Enter your Email" onChange={e => setEmail({ ...email, email: e.target.value })} />
                                    {Show.otp ?
                                        <>
                                            <input type="password" className="form-control mb-3" placeholder="Enter OTP" onChange={e => setEmail({ ...email, otp: e.target.value })} />
                                            <div className="d-grid">
                                                <button type="submit" className="btn btn-primary mb-4 " onClick={VerifyOtp}> Submit OTP </button>
                                            </div>
                                        </>
                                        : null}
                                    {!Show.otp ?
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary mb-4 " onClick={SendOtp}> Send OTP </button>
                                        </div>
                                        : null}

                                </>
                                :
                                <>

                                    <input type="hidden" />
                                    <input type="password" className="form-control mb-3" placeholder="New Password" onChange={e => setEmail({ ...email, nPassword: e.target.value })}></input>
                                    <input type="password" className="form-control mb-3" placeholder="Confirm Password" onChange={e => setEmail({ ...email, cPassword: e.target.value })}></input>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary mb-4 " onClick={ResetPassword}> Reset Password </button>
                                    </div>
                                </>
                            }
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Forgotpassword
