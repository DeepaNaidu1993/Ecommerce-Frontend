import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { StarFill, Star, SuitHeartFill } from 'react-bootstrap-icons'
import { ProductContext } from '../App';
import Navbar from './navbar';

function HomePage(props) {
    const [modalData, setmodalData] = useState()
    const value = useContext(ProductContext)
    const [count, setCount] = useState([1, 2, 3, 4, 5]);
    let index2 = -1;
    if (modalData) {
        index2 = value.Cart.findIndex(p => p._id === modalData._id)
    }

    return (
        <>
            <Navbar />
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="container-fluid">
                                <div className="row">
                                    {modalData ?

                                        <>

                                            <div className="col-md-4 offset-md-1 col-sm-6">
                                                <img className="img-fluid modal-image" src={modalData.IMAGE} alt={modalData.NAME} />
                                            </div>
                                            <div className="col-md-6 col-sm-6 offset-md-1 text-center mt-5">
                                                <h3>{modalData.BRAND}</h3>
                                                <p>{value.extractData(modalData).desc}</p>
                                                <h5>Rs. {modalData.PRICE}</h5>
                                                <p className="mt-5"> Select size</p>
                                                <div>
                                                    <button className="btn btn-secondary rounded-circle size-button">S</button>
                                                    <button className="btn btn-secondary rounded-circle size-button">M</button>
                                                    <button className="btn btn-secondary rounded-circle size-button">L</button>
                                                    <button className="btn btn-secondary rounded-circle size-button">XL</button>
                                                    {/* <button className="btn btn-secondary rounded-circle size-button">XXL</button> */}
                                                </div>


                                                <button className="btn bag-button mt-5" onClick={e => value.updateCart(modalData)}> {index2 == -1 ? "ADD TO CART" : " REMOVE FROM CART"} </button>


                                                <Link to={`/productDetails/${modalData.PRODUCT_ID}`}><button className="btn product-button mt-4" data-bs-dismiss="modal">PRODUCT DETAILS</button> </Link>
                                            </div></> : null}

                                </div>
                            </div>
                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save change</button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="container pb-5">
                <div className="text-center headings">
                    <h2>CATEGORIES</h2>
                </div>
                <div className="row">
                    <div className="col">
                        <Link to="/product?category=accessories"><img src="images/accessories.jpg" className="img-fluid" alt="accessories"></img> </Link>
                    </div>
                    <div className="col">
                        <Link to="/product?category=casual-shirts,formal-shirts"><img src="images/shirts.jpg" className="img-fluid" alt="shirts"></img></Link>
                    </div>
                    <div className="col">
                        <Link to="/product?category=Men-Casual-Trousers,Men-Formal-Trousers"><img src="images/trousers.jpg" className="img-fluid" alt="trousers"></img></Link>
                    </div>
                    <div className="col">
                        <Link to="/product?category=Jeans"><img src="images/jeans.jpg" className="img-fluid" alt="jeans"></img></Link>
                    </div>
                    <div className="col">
                        <Link to="/product?category=men-jackets-coats"><img src="images/jackets.jpg" className="img-fluid" alt="jackets"></img></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Link to="/product?category=Innerwear_Sleapwear"><img src="images/innerwear.jpg" className="img-fluid" alt="innerwear"></img></Link>
                    </div>
                    <div className="col">
                        <Link to="/product?category=men-suits"> <img src="images/suits.jpg" className="img-fluid" alt="suits"></img></Link>
                    </div>
                    <div className="col">
                        <Link to="/product?category=men-swimwear"><img src="images/swimwear.jpg" className="img-fluid" alt="swimwear"></img></Link>
                    </div>
                    <div className="col">
                        <Link to="/product?category=track-pants"><img src="images/trackpants.jpg" className="img-fluid" alt="trackpants"></img></Link>
                    </div>
                    <div className="col">
                        <Link to="/product?category=T-Shirts"><img src="images/Tshirts.jpg" className="img-fluid" alt="t-shirts"></img></Link>
                    </div>
                </div>
            </div>

            {/* Popular Product */}


            <div className="text-center headings">
                <h2>POPULAR PRODUCTS</h2>
            </div>

            <div id="carouselExampleFade" class="carousel slide carousel-fade carousel-dark" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="5000" >
                        <div className="row">
                            {value.popularProducts ?
                                value.popularProducts.slice(0, 4).map((product) => {
                                    let obj = value.extractData(product);
                                    const index = value.Wishlist.findIndex(p => p._id === product._id)
                                    return (
                                        <div className="col mb-4" key={product.PRODUCT_ID}>
                                            <div className="card box-shadow">
                                                <Link to={`/productDetails/${product.PRODUCT_ID}`}><img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt={product.NAME} /></Link>
                                                <button type="button" className="btn  quick-look " data-bs-toggle="modal" onClick={(e) => setmodalData(product)} data-bs-target="#exampleModal" >
                                                    <strong>Quick Look</strong>
                                                </button>
                                                {/* <button className="btn btn-sm wishlist" onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {/* <button className="btn btn-sm wishlist" onClick={e=>value.Auth?value.updateWishlist(product):props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {index === -1 ?
                                                    <button className="btn btn-sm wishlist" onClick={e => value.Auth ? value.updateWishlist(product) : props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button>
                                                    : <button className="btn btn-sm wishlist " onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon wishlist-selected" /></button>
                                                }
                                                <div className="card-body" style={{ height: "120px" }}>
                                                    <div className="card-body-section-one ">
                                                        <b style={{ paddingBottom: "1px" }}>{obj.brand}</b><br />
                                                        <p style={{ fontSize: "12px", paddingBottom: "0.2px" }}>{obj.desc}</p>
                                                    </div>
                                                    <div className="card-body-section-two" style={{ paddingTop: "10px" }}>
                                                        <small className="card-body-section-two">Rs {product.PRICE}</small>
                                                    </div>
                                                    <div className="card-body-section-three" style={{ paddingTop: "10px" }}>

                                                        {count.map((i) => {
                                                            if (i <= obj.rating) {
                                                                return (
                                                                    <small ><StarFill className="star-color" /></small>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <small><Star /></small>
                                                                )
                                                            }

                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : null}
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="5000">
                        <div className="row">
                            {value.popularProducts ?
                                value.popularProducts.slice(5, 9).map((product) => {
                                    let obj = value.extractData(product);
                                    const index = value.Wishlist.findIndex(p => p._id === product._id)
                                    return (
                                        <div className="col mb-4" key={product.PRODUCT_ID}>
                                            <div className="card box-shadow">
                                                <Link to={`/productDetails/${product.PRODUCT_ID}`}> <img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt={product.NAME} /></Link>
                                                <button type="button" className="btn  quick-look " data-bs-toggle="modal" onClick={(e) => setmodalData(product)} data-bs-target="#exampleModal" >
                                                    <strong>Quick Look</strong>
                                                </button>
                                                {/* <button className="btn btn-sm wishlist" onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {/* <button className="btn btn-sm wishlist" onClick={e=>value.Auth?value.updateWishlist(product):props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {index === -1 ?
                                                    <button className="btn btn-sm wishlist" onClick={e => value.Auth ? value.updateWishlist(product) : props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button>
                                                    : <button className="btn btn-sm wishlist " onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon wishlist-selected" /></button>
                                                }
                                                <div className="card-body" style={{ height: "120px" }}>
                                                    <div className="card-body-section-one ">
                                                        <b style={{ paddingBottom: "1px" }}>{obj.brand}</b><br />
                                                        <p style={{ fontSize: "12px", paddingBottom: "0.2px" }}>{obj.desc}</p>
                                                    </div>
                                                    <div className="card-body-section-two" style={{ paddingTop: "10px" }}>
                                                        <small className="card-body-section-two">Rs {product.PRICE}</small>
                                                    </div>
                                                    <div className="card-body-section-three" style={{ paddingTop: "10px" }}>

                                                        {count.map((i) => {
                                                            if (i <= obj.rating) {
                                                                return (
                                                                    <small ><StarFill className="star-color" /></small>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <small><Star /></small>
                                                                )
                                                            }

                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : null}
                        </div>

                    </div>
                    <div class="carousel-item" data-bs-interval="5000">
                        <div className="row">
                            {value.popularProducts ?
                                value.popularProducts.slice(10, 14).map((product) => {
                                    let obj = value.extractData(product);
                                    const index = value.Wishlist.findIndex(p => p._id === product._id)
                                    return (
                                        <div className="col mb-4" key={product.PRODUCT_ID}>
                                            <div className="card box-shadow">
                                                <Link to={`/productDetails/${product.PRODUCT_ID}`}> <img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt={product.NAME} /></Link>
                                                <button type="button" className="btn  quick-look " data-bs-toggle="modal" onClick={(e) => setmodalData(product)} data-bs-target="#exampleModal" >
                                                    <strong>Quick Look</strong>
                                                </button>
                                                {/* <button className="btn btn-sm wishlist" onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {/* <button className="btn btn-sm wishlist" onClick={e=>value.Auth?value.updateWishlist(product):props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {index === -1 ?
                                                    <button className="btn btn-sm wishlist" onClick={e => value.Auth ? value.updateWishlist(product) : props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button>
                                                    : <button className="btn btn-sm wishlist " onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon wishlist-selected" /></button>
                                                }
                                                <div className="card-body" style={{ height: "120px" }}>
                                                    <div className="card-body-section-one ">
                                                        <b style={{ paddingBottom: "1px" }}>{obj.brand}</b><br />
                                                        <p style={{ fontSize: "12px", paddingBottom: "0.2px" }}>{obj.desc}</p>
                                                    </div>
                                                    <div className="card-body-section-two" style={{ paddingTop: "10px" }}>
                                                        <small className="card-body-section-two">Rs {product.PRICE}</small>
                                                    </div>
                                                    <div className="card-body-section-three" style={{ paddingTop: "10px" }}>

                                                        {count.map((i) => {
                                                            if (i <= obj.rating) {
                                                                return (
                                                                    <small ><StarFill className="star-color" /></small>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <small><Star /></small>
                                                                )
                                                            }

                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : null}
                        </div>

                    </div>

                    <button class="carousel-control-prev preview" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
            <div className="text-center">
                <Link to="/product/popular"><button className="btn btn-sm btn-primary ">See More...</button></Link>
            </div>
            {/* New Arrival */}

            <div className="text-center headings">
                <h2>NEW ARRIVALS</h2>
            </div>
            <div id="carouselExampleFade2" class="carousel slide carousel-fade carousel-dark" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="5000">
                        <div className="row">
                            {value.newProducts ?
                                value.newProducts.slice(0, 4).map((product) => {
                                    let obj = value.extractData(product);
                                    const index = value.Wishlist.findIndex(p => p._id === product._id)
                                    return (
                                        <div className="col mb-4" key={product.PRODUCT_ID}>
                                            <div className="card box-shadow">
                                                <Link to={`/productDetails/${product.PRODUCT_ID}`}> <img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt={product.NAME} /></Link>
                                                <button type="button" className="btn  quick-look " data-bs-toggle="modal" onClick={(e) => setmodalData(product)} data-bs-target="#exampleModal" >
                                                    <strong>Quick Look</strong>
                                                </button>
                                                {/* <button className="btn btn-sm wishlist" onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {/* <button className="btn btn-sm wishlist" onClick={e=>value.Auth?value.updateWishlist(product):props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {index === -1 ?
                                                    <button className="btn btn-sm wishlist" onClick={e => value.Auth ? value.updateWishlist(product) : props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button>
                                                    : <button className="btn btn-sm wishlist " onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon wishlist-selected" /></button>
                                                }
                                                <div className="card-body" style={{ height: "120px" }}>
                                                    <div className="card-body-section-one ">
                                                        <b style={{ paddingBottom: "1px" }}>{obj.brand}</b><br />
                                                        <p style={{ fontSize: "12px", paddingBottom: "0.2px" }}>{obj.desc}</p>
                                                    </div>
                                                    <div className="card-body-section-two" style={{ paddingTop: "10px" }}>
                                                        <small className="card-body-section-two">Rs {product.PRICE}</small>
                                                    </div>
                                                    <div className="card-body-section-three" style={{ paddingTop: "10px" }}>

                                                        {count.map((i) => {
                                                            if (i <= obj.rating) {
                                                                return (
                                                                    <small ><StarFill className="star-color" /></small>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <small><Star /></small>
                                                                )
                                                            }

                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                }) : null}
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="5000">
                        <div className="row">
                            {value.newProducts ?
                                value.newProducts.slice(5, 9).map((product) => {
                                    let obj = value.extractData(product);
                                    const index = value.Wishlist.findIndex(p => p._id === product._id)
                                    return (
                                        <div className="col mb-4" key={product.PRODUCT_ID}>
                                            <div className="card box-shadow">
                                                <Link to={`/productDetails/${product.PRODUCT_ID}`}><img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt={product.NAME} /></Link>
                                                <button type="button" className="btn  quick-look " data-bs-toggle="modal" onClick={(e) => setmodalData(product)} data-bs-target="#exampleModal" >
                                                    <strong>Quick Look</strong>
                                                </button>
                                                {/* <button className="btn btn-sm wishlist" onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {/* <button className="btn btn-sm wishlist" onClick={e=>value.Auth?value.updateWishlist(product):props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {index === -1 ?
                                                    <button className="btn btn-sm wishlist" onClick={e => value.Auth ? value.updateWishlist(product) : props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button>
                                                    : <button className="btn btn-sm wishlist " onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon wishlist-selected" /></button>
                                                }
                                                <div className="card-body" style={{ height: "120px" }}>
                                                    <div className="card-body-section-one ">
                                                        <b style={{ paddingBottom: "1px" }}>{obj.brand}</b><br />
                                                        <p style={{ fontSize: "12px", paddingBottom: "0.2px" }}>{obj.desc}</p>
                                                    </div>
                                                    <div className="card-body-section-two" style={{ paddingTop: "10px" }}>
                                                        <small className="card-body-section-two">Rs {product.PRICE}</small>
                                                    </div>
                                                    <div className="card-body-section-three" style={{ paddingTop: "10px" }}>

                                                        {count.map((i) => {
                                                            if (i <= obj.rating) {
                                                                return (
                                                                    <small ><StarFill className="star-color" /></small>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <small><Star /></small>
                                                                )
                                                            }

                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                }) : null}
                        </div>
                    </div>

                    <div class="carousel-item" data-bs-interval="5000">
                        <div className="row">
                            {value.newProducts ?
                                value.newProducts.slice(10, 14).map((product) => {
                                    let obj = value.extractData(product);
                                    const index = value.Wishlist.findIndex(p => p._id === product._id)
                                    return (
                                        <div className="col mb-4" key={product.PRODUCT_ID}>
                                            <div className="card box-shadow">
                                                <Link to={`/productDetails/${product.PRODUCT_ID}`}> <img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt={product.NAME} /></Link>
                                                <button type="button" className="btn  quick-look " data-bs-toggle="modal" onClick={(e) => setmodalData(product)} data-bs-target="#exampleModal" >
                                                    <strong>Quick Look</strong>
                                                </button>
                                                {/* <button className="btn btn-sm wishlist" onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {/* <button className="btn btn-sm wishlist" onClick={e=>value.Auth?value.updateWishlist(product):props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button> */}
                                                {index === -1 ?
                                                    <button className="btn btn-sm wishlist" onClick={e => value.Auth ? value.updateWishlist(product) : props.history.push('/login')}> <SuitHeartFill className="wishlist-icon" /></button>
                                                    : <button className="btn btn-sm wishlist " onClick={e => value.updateWishlist(product)}> <SuitHeartFill className="wishlist-icon wishlist-selected" /></button>
                                                }
                                                <div className="card-body" style={{ height: "120px" }}>
                                                    <div className="card-body-section-one ">
                                                        <b style={{ paddingBottom: "1px" }}>{obj.brand}</b><br />
                                                        <p style={{ fontSize: "12px", paddingBottom: "0.2px" }}>{obj.desc}</p>
                                                    </div>
                                                    <div className="card-body-section-two" style={{ paddingTop: "10px" }}>
                                                        <small className="card-body-section-two">Rs {product.PRICE}</small>
                                                    </div>
                                                    <div className="card-body-section-three" style={{ paddingTop: "10px" }}>

                                                        {count.map((i) => {
                                                            if (i <= obj.rating) {
                                                                return (
                                                                    <small ><StarFill className="star-color" /></small>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <small><Star /></small>
                                                                )
                                                            }

                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                }) : null}
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev preview" type="button" data-bs-target="#carouselExampleFade2" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next next" type="button" data-bs-target="#carouselExampleFade2" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div className="text-center">
                <Link to="/product/new"><button className="btn btn-sm btn-primary ">See More...</button></Link>
            </div>
        </>
    )
}

export default HomePage
