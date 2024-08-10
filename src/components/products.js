import React, { useContext } from 'react'
import { CircleFill, StarFill, Star, SuitHeartFill, Circle } from 'react-bootstrap-icons'
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { ProductContext } from '../App';
import Navbar from './navbar';



function Products(props) {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const [modalData, setmodalData] = useState()
    let query = useQuery();

    let { popular } = useParams();

    const value = useContext(ProductContext)
    const [data, setData] = useState();
    const [url, setURL] = useState();

    const [color, setColor] = useState([]);
    const [brand, setBrand] = useState([]);
    const [fabric, setFabric] = useState([]);
    const [Size, setSize] = useState([]);
    const [category, setCategory] = useState([]);
    const [price, setPrice] = useState([]);


    const [colorA, setColorA] = useState([]);
    const [brandA, setBrandA] = useState([]);
    const [fabricA, setFabricA] = useState([]);
    const [SizeA, setSizeA] = useState([]);
    const [categoryA, setCategoryA] = useState([]);
    const [priceA, setPriceA] = useState([]);

    const [minmaxPrice, setminmaxPrice] = useState([]);


    const [count, setCount] = useState([1, 2, 3, 4, 5]);
    const [currPage, setcurrPage] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const offset = currPage * 50;

    const [sort, setSort] = useState("high")
    let pageCount = Math.ceil(totalProducts / 50);

    useEffect(async () => {
        let categoryU = query.get("category")
        let priceU = query.get("price")
        let fabricU = query.get("fab")
        let colorU = query.get("color")
        let brandU = query.get("brand")
        let sizeU = query.get("size")
        setData()
        setTotalProducts()
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/distinct`)
            .then((result) => {
                setCategoryA(result.data.category);
                setBrandA(result.data.brand);
                setSizeA(result.data.size);
                setFabricA(result.data.fabric);
                // console.log(result.data.brand)
            })
            .catch((e) => {
                console.log(e)
            })

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/categories?cat=${categoryU}&price=${priceU}&size=${sizeU}&brand=${brandU}&color=${colorU}&fab=${fabricU}&offset=${offset}&search=${value.searchValue}&sort=${popular},${sort}`) // backend url, not frontend url
            .then((res) => {
                setData(res.data.products);
                setTotalProducts(res.data.totalProducts);
                value.setFilterProductData(res.data.products)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [url, offset, sort, value.searchValue]);

    const checkColor = (val) => {
        const ind = color.indexOf(val);
        if (ind === -1) {
            color.push(val);
        }
        else {
            color.splice(ind, 1);
        }
    }

    const checkCategory = (val) => {
        if (val === "shirts") {
            const index1 = category.indexOf("casual-shirts")
            const index2 = category.indexOf("formal-shirts")
            if (index1 === -1 || index2 === -1) {
                category.push("casual-shirts")
                category.push("formal-shirts")
            } else {
                category.splice(index1, 1)
                category.splice(index1, 1)
            }
            return true;
        } else if (val === "trousers") {
            const index1 = category.indexOf("Men-Formal-Trousers")
            const index2 = category.indexOf("Men-Casual-Trousers")
            if (index1 === -1 || index2 === -1) {
                category.push("Men-Formal-Trousers")
                category.push("Men-Casual-Trousers")
            } else {
                category.splice(index1, 1)
                category.splice(index1, 1)
            }
            return true;
        }

        const ind = category.indexOf(val);
        if (ind === -1) {
            category.push(val);
        }
        else {
            category.splice(ind, 1);
        }
    }

    const checkPrice = async (val) => {
        const ind = price.indexOf(val);

        if (ind === -1) {
            price.push(val);

        }
        else {
            price.splice(ind, 1);
        }
        let min = findMinMax(price);
        console.log(min);
        //setminPrice(min_max.localMin);
        //console.log(minPrice);
    }

    const findMinMax = async (array) => {

        let min = array[0].split('-')[0];
        let max = array[0].split('-')[1];

        for (let i = 1; i < array.length; i++) {
            //console.log(array);
            //console.log(i, array[i].split("-")[1],max)
            if (parseInt(array[i].split("-")[0]) < parseInt(min)) {
                min = array[i].split("-")[0]
            }
            if (parseInt(array[i].split("-")[1]) > parseInt(max)) {
                console.log("true");
                max = array[i].split("-")[1];
            }

        }
        console.log("min:", min, "max:", max);
        setminmaxPrice([min, max]);


    }

    const checkBrand = (val) => {
        const ind = brand.indexOf(val);
        if (ind === -1) {
            brand.push(val);
        }
        else {
            brand.splice(ind, 1);
        }
    }

    const checkSize = (val) => {
        const ind = Size.indexOf(val);
        if (ind === -1) {
            Size.push(val);
        }
        else {
            Size.splice(ind, 1);
        }
    }

    const checkFabric = (val) => {
        const ind = fabric.indexOf(val);
        if (ind === -1) {
            fabric.push(val);
        }
        else {
            fabric.splice(ind, 1);
        }
    }

    const apply = () => {
        //console.log(category,color,brand,fabric,price);
        setcurrPage(0)
        let strURL = `?category=${category.join(",")}&price=${minmaxPrice.join(',')}&size=${Size.join(",")}&fab=${fabric.join(",")}&color=${color.join(",")}&brand=${brand.join(",")}`

        setURL(strURL);
        props.history.push(strURL);

    }

    const resetAll = () => {
        document.getElementById("reset").reset();
        setCategory([]);
        setColor([]);
        setPrice([]);
        setBrand([]);
        setFabric([]);
        setSize([]);
    }

    const pageChange = ({ selected: current }) => {
        setcurrPage(current);
    }

    let index2 = -1;
    if (modalData) {
        index2 = value.Cart.findIndex(p => p._id === modalData._id)
    }






    return (
        <div>
            <Navbar></Navbar>

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
                                                {/* 
                                                <button className="btn bag-button mt-5">ADD TO BAG</button> */}
                                                <button className="btn bag-button mt-5" onClick={e => value.updateCart(modalData)}> {index2 == -1 ? "ADD TO CART" : " REMOVE FROM CART"} </button>

                                                {/* <button className="btn bag-button mt-4"onClick={e=>value.updateWishlist(modalData)}>{index1 == -1? "ADD TO WISHLIST":"WISHLISTED ITEM" } </button> */}

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
            <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasBottomLabel">All Brands</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body small">
                    <div className="row row-cols-5">
                        {brandA ? brandA.map((brand) => {
                            return (
                                <div className="col" key={brand}>
                                    <div className="form-check ps-">
                                        <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkBrand(brand)} />
                                        <label className="form-check-label" for="flexCheckDefault">
                                            {brand}
                                        </label>
                                    </div>
                                </div>
                            )
                        }) : null}
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <h4>
                    Mens Fashion Store
                </h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <Link to="/" className="breadcrumb-item">Home</Link>
                        <li class="breadcrumb-item"><a href="#">Products</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                </nav>
            </div>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-3">

                        <div style={{ height: "80vh", width: "250px" }} className="overflow-auto sidebar">
                            <div className="container d-flex justify-content-between align-items-center py-3">
                                <b>FILTERS</b>
                                {/* <button className ="btn btn-outline-secondary btn-sm">Reset All</button> */}
                            </div>
                            <div className="container d-flex justify-content-between align-items-center py-3">
                                <button className="btn btn-outline-secondary btn-sm" onClick={(e) => resetAll()}>Reset All</button>
                                <button className="btn btn-outline-secondary btn-sm" onClick={(e) => apply()}>APPLY</button>
                            </div>
                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                <form id="reset">
                                    {/* //Categories */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                                Categories
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                            <div className="accordion-body ps-4">
                                                {categoryA ? categoryA.slice(0, 10).map((category) => {
                                                    return (
                                                        <div className="form-check ps-" key={category}>
                                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkCategory(category)} />
                                                            <label className="form-check-label" for="flexCheckDefault">
                                                                {category.replace(/men-/gi, "").toLowerCase()}
                                                            </label>
                                                        </div>
                                                    )
                                                }) : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* //Color */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                                color
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                            <div className="accordion-body ps-4">
                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Black")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        <CircleFill className="me-2" style={{ color: "black" }} /> Black
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("White")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        <CircleFill className="me-2" style={{ color: "#f5f5f5" }} /> White
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Red")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        <CircleFill className="me-2" style={{ color: "red" }} /> Red
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Teal")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        <CircleFill className="me-2" style={{ color: "teal" }} /> Teal
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Blue")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        <CircleFill className="me-2" style={{ color: "blue" }} /> Blue
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Green")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        <CircleFill className="me-2" style={{ color: "Green" }} /> Green
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Orange")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        <CircleFill className="me-2" style={{ color: "orange" }} /> Orange
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Brown")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        <CircleFill className="me-2" style={{ color: "brown" }} /> Brown
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Navy Blue")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        <CircleFill className="me-2" style={{ color: "#000080" }} /> Navy Blue
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Grey")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        <CircleFill className="me-2" style={{ color: "grey" }} /> Grey
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Purple")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        <CircleFill className="me-2" style={{ color: "purple" }} /> Purple
                                                    </label>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    {/* //Brands */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                                Brands
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                            <div className="accordion-body ps-4">
                                                {brandA ? brandA.slice(0, 10).map((brand) => {
                                                    return (
                                                        <div className="form-check ps-" key={brand}>
                                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkBrand(brand)} />
                                                            <label className="form-check-label" for="flexCheckDefault">
                                                                {brand.toLowerCase()}
                                                            </label>
                                                        </div>
                                                    )
                                                }) : null}
                                                <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">..more</button>


                                            </div>
                                        </div>
                                    </div>

                                    {/* //price */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                                Price
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                                            <div className="accordion-body ps-4">

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkPrice("100-2000")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        100-2000
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkPrice("2001-7000")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        2001-7000
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkPrice("7001-20000")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        7001-20000
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkPrice("20000-50000")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        20000-50000
                                                    </label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    {/* //Size */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                                                Size
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                                            <div className="accordion-body ps-4">
                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkSize("Regular-Fit")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Regular-Fit
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkSize("Slim-fit")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Slim-fit
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkSize("Skinny-fit")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Skinny-fit
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkSize("Narrow-fit")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Narrow-fit
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingSix">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                                                Fabric
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseSix" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                                            <div className="accordion-body ps-4">
                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Cotton")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Cotton
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Polyester")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Polyester
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Wool")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Wool
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Spandex")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Spandex
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Elastane")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Elastane
                                                    </label>
                                                </div>

                                                <div className="form-check ps-">
                                                    <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Viscous")} />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Viscous
                                                    </label>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="d-flex justify-content-end pe-5">
                            <div className="dropdown">
                                <button className="btn dropdown-toggle btn-outline-secondary " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort by
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={e => setSort("high")}><a className="dropdown-item" href="#">Price: High to Low</a></li>
                                    <li onClick={e => setSort("low")}><a className="dropdown-item" href="#">Price: Low to High</a></li>
                                    <li onClick={e => setSort("rating")}><a className="dropdown-item" href="#">Customer Ratings</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="row mt-3 row-cols-4">
                            {data ?
                                data.map((product) => {
                                    let obj = value.extractData(product);
                                    const index = value.Wishlist.findIndex(p => p._id === product._id)
                                    return (
                                        <div className="col mb-4" key={product.PRODUCT_ID}>
                                            <div className="card box-shadow">
                                                <Link to={`/productDetails/${product.PRODUCT_ID}`}>    <img src={product.IMAGE} className="card-img-top" height="280px" width="210px" alt={product.NAME} />
                                                </Link>
                                                <button type="button" className="btn  quick-look " data-bs-toggle="modal" onClick={(e) => setmodalData(product)} data-bs-target="#exampleModal" >
                                                    <strong>Quick Look</strong>
                                                </button>
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

                        < ReactPaginate

                            previousLabel=
                            {
                                "Prev"
                            }


                            nextLabel=
                            {
                                "Next"
                            }


                            pageCount=
                            {
                                pageCount
                            }


                            onPageChange=
                            {
                                pageChange
                            }


                            containerClassName=
                            {
                                "pagination pagination-sm justify-content-center"
                            }


                            pageLinkClassName=
                            {
                                "page-link"
                            }


                            previousLinkClassName=
                            {
                                "page-link"
                            }


                            nextLinkClassName=
                            {
                                "page-link"
                            }


                            disabledClassName=
                            {
                                "page-item disabled"
                            }


                            activeClassName=
                            {
                                "page-item active"
                            }

                        />
                    </div>


                </div>
            </div>
        </div>

    )
}

export default Products
