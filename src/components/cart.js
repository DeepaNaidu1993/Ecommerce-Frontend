import React, { useContext, useEffect, useState } from 'react'
import Navbar from './navbar'
import { XCircleFill, Plus } from 'react-bootstrap-icons'
import { ProductContext } from '../App'
import axios from 'axios'
import { Link } from 'react-router-dom';
import googlepay from '../Images/Google-Pay-Logo.png'
import phonepe from '../Images/phone-pe-.png'
import bhim from '../Images/bhim.png'
import free from '../Images/free.png'
import mobiwik from '../Images/mob.png'
import rajor from '../Images/rajor.png'
import axis from '../Images/Axis-Bank.png'
import hdfc from '../Images/hdfc.png'
import icici from '../Images/icici.png'
import sbi from '../Images/SBI.png'
import apple from '../Images/apple.png'
import Captcha from '../Images/CAPTCHA.jpg'


function Carts(props) {
    const value = useContext(ProductContext)
    const [myCart, setmyCart] = useState([]);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [afterDisc, setAfterDisc] = useState(0)
    const [placeorder, setplaceorder] = useState(0)
    const [TotalPrice, setTotalPrice] = useState(0)
    const [newAddress, setnewAddress] = useState();
    const [contactInfo, setcontactInfo] = useState()
    const [captcha, setcaptcha] = useState();
    const [checkCaptcha, setcheckCaptcha] = useState(false);

    useEffect(() => {

        if (!(value.Auth)) {
            props.history.push('/login')
        }

        else{
            setmyCart(value.Cart)
        setnewAddress(value.userData[0].CONTACT_DETAILS)

        // calculate total price of cart
        let sumPrice = 0;
        value.Cart.map((product) => {
            sumPrice += (product.QTY * product.PRICE)
        })
        //TotalPrice += (product.QTY * product.PRICE)
        setTotalPrice(sumPrice);
        }
    }, [value.Cart])

    const moveToWishList = (product) => {
        product['QTY'] = 1
        value.updateWishlist(product);
        value.updateCart(product);
    }

    const quantityPrice = (product, quantity) => {
        let temp = []
        myCart.map((p) => {
            if (p._id === product._id) {
                p['QTY'] = quantity

            }
            temp.push(p)
            setDiscountPrice(0);
            setAfterDisc(0);
            document.getElementById("coupon").value = "Select coupon code"
        })
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/updateCart?id=${value.userData[0]._id}`, temp)
            .then((res) => {
                value.updateCartQuantity(temp)
            })
            .catch((err) => {
                alert("Sorry, there is an error");
            })

        setmyCart(temp)

    }

    const discount = (offValue) => {
        setAfterDisc((offValue * TotalPrice) / 100)
    }

    const addNewAddress=()=>{
        let temp = [...newAddress]
        temp.push(contactInfo)
        setnewAddress(temp)
        console.log(temp);
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/updateAddress?id=${value.userData[0]._id}`,temp)
        .then((res)=>{
            console.log("updated");
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const validateCaptcha = (e) =>
    {   
        e.preventDefault();
        if(captcha != 'CAPTCHA')
        {
            setcheckCaptcha(false);
        }
        else
        {
            setcheckCaptcha(true);
            props.history.push('/endPage');
        }
    }
    return (
        <div className="fbottom">
            <Navbar />

            {/* <!-- Modal --> */}
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Address</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <textarea type="text" className="form-control mb-3" placeholder="Enter your address" onChange={e=>setcontactInfo({...contactInfo,Address:e.target.value})} />
                            <input type="tel" className="form-control mb-3" placeholder="Enter your Phone Number" onChange={e=>setcontactInfo({...contactInfo,Phone:e.target.value})} />

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={e=>addNewAddress()}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light py-4">
                <div className="container">
                    <h6 className="text-center">

                        <span className={placeorder == 0 ? "cart-progress1" : "null"}>
                            BAG
                        </span>

                        <span className="cart-progress2">
                            ------
                        </span>

                        <span className={placeorder == 1 ? "cart-progress1" : "null"}>
                            ADDRESS
                        </span>

                        <span className="cart-progress2">
                            ------
                        </span>

                        <span className={placeorder == 2 ? "cart-progress1" : "null"}>
                            PAYMENT
                        </span>
                    </h6>
                </div>
            </div>
            <div className="container mt-5">
                {
                    myCart.length > 0 ?
                        <div className="row">

                            <div className="col-md-8" style={{border:"1px solid #a66fab"}}>
                                {(placeorder == 0) ?
                                    <table className="table table-borderless p-3">
                                        <colgroup>
                                            <col />
                                            <col style={{ width: "150px" }} />
                                            <col style={{ width: "120px" }} />
                                        </colgroup>
                                        <thead>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th></th>
                                            <th></th>
                                        </thead>
                                        <tbody>

                                            {myCart.map((product) => {


                                                let prodDes = value.extractData(product)
                                                let index1 = value.Wishlist.findIndex(p => p._id === product._id)
                                                return (
                                                    <tr>
                                                        <td>
                                                            <div className="float-start ms-3 me-5">
                                                                <Link to={`/productDetails/${product.PRODUCT_ID}`}>   <img src={product.IMAGE} height="100px" width="75px" /> </Link>
                                                            </div>
                                                            <div className="float-right">
                                                                <h6>{product.BRAND}</h6>
                                                                <small>{prodDes.desc}</small>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>

                                                                <input onChange={e => quantityPrice(product, e.target.value)} defaultValue="1" value={product.QTY} type="number" className="w-50 form-control" min="1" />

                                                            </div>
                                                        </td>
                                                        <td className="pe-5 ">
                                                            {product.QTY * product.PRICE}

                                                        </td>
                                                        <td>
                                                            {index1 == -1 ? <button className="btn btn-sm btn-secondary " onClick={e => moveToWishList(product)}><small>ADD TO WISHLIST</small></button> : null}

                                                        </td>
                                                        <td>
                                                            <button className="btn " onClick={e => value.updateCart(product)}> <XCircleFill className="Cart-icon" /></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                            }
                                        </tbody>
                                    </table>
                                    :
                                    (placeorder == 1) ?
                                        <div className="p-2">
                                            <h5>
                                                Select delivery address
                                            </h5>

                                            {/* <div className="py-2">
                                                <small>DEFAULT ADDRESS</small>
                                            </div> */}

                                            {newAddress.map((contact) => {
                                                return (
                                                    <div class="form-check border shadow-sm">
                                                        <div className="p-3">

                                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                                            <label class="form-check-label" for="flexRadioDefault2">
                                                                <p>
                                                                    <b>{value.userData[0].NAME}</b>
                                                                </p>
                                                                <p>
                                                                    {contact.Address}
                                                                </p>
                                                                <p>
                                                                    Mobile No: {contact.Phone}
                                                                </p>
                                                                <button className="btn btn-sm btn-outline-secondary">EDIT</button>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                            <div className="my-3">
                                                <button type="button" class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    <Plus /> <span className="p-2">ADD NEW ADDRESS</span>
                                                </button>

                                            </div>

                                        </div> :
                                        <div>
                                           <div className="my-4 ps-3"> 
                                                <b>Choose Payment Mode</b> 
                                           </div>
                                            <div className="border m-2 p-3">

                                                <div class="d-flex align-items-start ">
                                                    {/* Payment method */}
                                                    <div class="nav flex-column nav-pills bg-light w-25" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                        <button class=" nav-link text-start " id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><small style={{fontSize:'12px'}}> PHONEPE/GOOGLE PAY/AMAZON PAY</small></button>
                                                        <button class="nav-link text-start" id="v-pills-COD-tab" data-bs-toggle="pill" data-bs-target="#v-pills-COD" type="button" role="tab" aria-controls="v-pills-COD" aria-selected="false"><small style={{fontSize:'12px'}}>CASH ON DELIVERY (CARD/CASH/UPI)</small></button>
                                                        <button class="nav-link text-start" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"><small style={{fontSize:'12px'}}>CREDIT CARD/DEBIT CARD</small></button>
                           
                                                        <button class=" nav-link text-start" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"><small style={{fontSize:'12px'}}>WALLETS</small></button>
                                                        <button class="nav-link text-start" id="v-pills-netBank-tab" data-bs-toggle="pill" data-bs-target="#v-pills-netBank" type="button" role="tab" aria-controls="v-pills-netBank" aria-selected="false"><small style={{fontSize:'12px'}}>NET BANKING</small></button>

                                                    </div>
                                                    
                                                    {/* payment options */}
                                                    <div class="tab-content" id="v-pills-tabContent">
                                                        {/* UPI */}
                                                        <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                                        <div>
                                                            <div class="form-check ms-5 mb-5">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                                                <label  class="form-check-label" for="flexRadioDefault1">
                                                                    <img src={googlepay} className="gpay pe-2" alt="" />
                                                                    Google Pay
                                                                </label>
                                                                </div>
                                                                <div class="form-check ms-5 mb-5">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                                                <label class="form-check-label" for="flexRadioDefault1">
                                                                <img src={phonepe}  className="pay pe-2" />
                                                                    Phone Pe
                                                                </label>
                                                                </div>
                                                                <div class="form-check ms-5 mb-5">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                                                <label class="form-check-label" for="flexRadioDefault2">
                                                                <img src={bhim} className="upi pe-2" alt="" />
                                                                    Bhim Upi
                                                                </label>
                                                                </div>    
                                                         </div>
                                                        
                                                        <Link to="/endPage"><button className="btn bg-btn btn-sm float-end">Pay Now</button></Link>
                                                        </div>
                                                        
                                                        {/* Wallet */}
                                                        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                                        <div>
                                                        
                                                            <div class="form-check ms-5 mb-5">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                                                <label  class="form-check-label" for="flexRadioDefault1">
                                                                    <img src={mobiwik} className="gpay" alt="" />
                                                                    Mobikwik
                                                                </label>
                                                                </div>
                                                                <div class="form-check ms-5 mb-5">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                                                <label class="form-check-label" for="flexRadioDefault1">
                                                                <img src={apple}  className="gpay" />
                                                                    Apple Pay
                                                                </label>
                                                                </div>
                                                                <div class="form-check ms-5 mb-5">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                                                <label class="form-check-label" for="flexRadioDefault2">
                                                                <img src={free} className="gpay" alt="" />
                                                                    Free Charge
                                                                </label>
                                                                </div>
                                                                <div class="form-check ms-5 mb-5">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                                                <label class="form-check-label" for="flexRadioDefault2">
                                                                <img src={rajor} className="gpay" alt="" />
                                                                    RazorPay
                                                                </label>
                                                                </div>
                                                            
                                                            </div>
                                                        <Link to="/endPage"><button className="btn bg-btn btn-sm float-end">Pay Now</button></Link>


                                                        </div>
                                         
                                                        {/*Credit Card/ Debit Card */}
                                                        <div class="tab-pane fade  " id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                                            <div className="ms-5 ">
                                                            <input type="text" className="form-control mb-3 " placeholder="Card Holder Name"/>
                                                                <input type="text" className="form-control mb-3" placeholder="Card Number"/>
                                                                <input type="month" className="form-control mb-3" placeholder=""/>
                                                                {/* <input type="text" className="form-control mb-3" placeholder="CVV"/> */}
                                                                <input type="text" className="form-control mb-3" placeholder="OTP"/>
                                                                <Link to="/endPage"><button className="btn bg-btn btn-sm float-end">Pay Now</button></Link>


                                                            </div>
                                                        </div>
                                                        
                                                        {/* NetBanking */}
                                                        <div class="tab-pane fade" id="v-pills-netBank" role="tabpanel" aria-labelledby="v-pills-netBank-tab">
                                                            
                                                            <div class="form-check ms-5 mb-5">
                                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                                                    <label  class="form-check-label" for="flexRadioDefault1">
                                                                        <img src={hdfc} className="gpay" alt="" />
                                                                        HDFC Bank
                                                                    </label>
                                                            </div>

                                                            <div class="form-check ms-5 mb-5">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                                                <label class="form-check-label" for="flexRadioDefault1">
                                                                <img src={axis}  className="gpay" />
                                                                   Axis Bank
                                                                </label>
                                                            </div>

                                                            <div class="form-check ms-5 mb-5">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                                                <label class="form-check-label" for="flexRadioDefault2">
                                                                <img src={sbi} className="gpay" alt="" />
                                                                    SBI Bank
                                                                </label>
                                                            </div>

                                                            <div class="form-check ms-5 mb-4">
                                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                                                <label class="form-check-label" for="flexRadioDefault2">
                                                                <img src={icici} className="gpay" alt="" />
                                                                    ICICI Bank
                                                                </label>

                                                            </div>
                                                            <Link to="/endPage"><button className="btn bg-btn btn-sm float-end">Pay Now</button></Link>


                                                        </div>

                                                        {/* COD */}
                                                        <div class="tab-pane fade" id="v-pills-COD" role="tabpanel" aria-labelledby="v-pills-COD-tab">
                                                            <div className="m-4">
                                                                <img src={Captcha} alt="Captcha loading.." height="70px" width="130px"></img>
                                                                <form className="needs-validation" novalidate>
                                                                    <input type="text" className="form-control" onChange={e => setcaptcha(e.target.value)}/>
                                                                    {!checkCaptcha?
                                                                    <div class="invalid-feedback">
                                                                        Please choose a username.
                                                                    </div>
                                                                    :
                                                                    <div class="valid-feedback">
                                                                        
                                                                    </div>}
                                                                    <button className="btn btn-sm bg-btn mt-3 float-end" type="submit" onClick={e=>validateCaptcha(e)}>Pay Now</button>
                                                                </form>
                                                            </div>   
                                                        </div>
                                                    
                                                    </div>
                                                </div>

                                            </div>
                                        </div>}
                            </div >

                            <div className="col-md-4 ">
                                <div className=" p-3" style={{border:"1px solid #a66fab"}}>
                                    <div className="input-group mb-3   ">
                                        <select id="coupon" class="form-select" aria-label="Default select example" onChange={e => setDiscountPrice(e.target.value)}>
                                            <option value="Select coupon code" selected disabled> Select Coupon Code </option>
                                            <option value="5" disabled={!(TotalPrice >= 9000 && TotalPrice < 10000)}>BHATTSAHAB5</option>
                                            <option value="10" disabled={!(TotalPrice >= 12000 && TotalPrice < 20000)}>LAXMINARAYANJI10</option>
                                            <option value="20" disabled={!(TotalPrice >= 20000 && TotalPrice < 25000)}>RANAJI20 </option>
                                            <option value="30" disabled={!(TotalPrice >= 25000 && TotalPrice < 50000)} >JAINSAHAB30</option>
                                            <option value="40" disabled={!(TotalPrice >= 50000 && TotalPrice < 70000)}>GURUJI40</option>
                                            <option value="50" disabled={!(TotalPrice >= 70000 && TotalPrice < 80000)}>GUPTAJI50</option>
                                            <option value="60" disabled={!(TotalPrice >= 80000 && TotalPrice < 100000000000000)}>GARGSAHAB60</option>
                                        </select>
                                        <button className="btn bg-btn " type="submit" onClick={e => discount(discountPrice)}>Apply</button>
                                    </div>
                                    <div className="border p-2" >
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td>Total Price: </td>
                                                    <td>Rs. {TotalPrice}</td>
                                                </tr>
                                                <tr>
                                                    <td>Discount: </td>
                                                    <td> Rs. {afterDisc}</td>
                                                </tr>
                                                <tr>
                                                    <td>Net Price: </td>
                                                    <td>{TotalPrice - afterDisc}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {
                                    !(placeorder == 2) ?
                                        <div className="d-grid mt-3">
                                            <button className="btn bg-btn " type="submit" onClick={e => setplaceorder(placeorder + 1)}>{(placeorder == 0) ? "PLACE ORDER" : "CONTINUE"}</button>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        : <h4><center> Your Cart seems to be empty! </center></h4>}
            </div>
        </div>
    )
}

export default Carts
