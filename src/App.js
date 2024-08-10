import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Footer from './components/footer';
import Navbar from './components/navbar';
import HomePage from './components/homePage';
import Products from './components/products';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import ProductDetails from './components/productDetails';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Search } from 'react-bootstrap-icons';
import SignUp from './components/signup';
import Login from './components/login'
import Forgotpassword from './components/forgotpassword';
import Wishlist from './components/wishlist';
import Toast from 'react-bootstrap/Toast'
import Carts from './components/cart';
import ScrollToTop from './components/ScrollToTop';
import EndPage from './components/endPage';

export const ProductContext = React.createContext()


function App() {
  const [NewProducts, setNewProducts] = useState()
  const [PopularProducts, setPopularProducts] = useState()
  const [FilterProducts, setFilterProducts] = useState()
  const [count, setCount] = useState([1, 2, 3, 4, 5]);
  const [searchValue, setsearchValue] = useState();
  const [userData, setuserData] = useState()
  const [Wishlists, setWishlist] = useState([])
  const [Cart, setCart] = useState([]);
  const [Auth, setAuth] = useState(false);
  const [myToken, setMyToken] = useState(localStorage.getItem('token'));
  const [showToast, setshowToast] = useState({ show: false, message: "" })
  const [loading, setloading] = useState(true)


  const search = (searchValue, e) => {
    // e.preventDefault();
    setsearchValue(searchValue);
  }
  const authToken = useCallback(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/verify?token=${myToken}`)
      .then((res) => {
        setuserData(res.data.user);
        setWishlist(res.data.user[0].WISHLIST)
        setCart(res.data.user[0].CART);
        setAuth(true)
        setloading(false)
      })
      .catch((err) => {
        console.log(err);
        setloading(false)
      })
  }, [myToken]);

  const updateToken = (token) => {
    localStorage.setItem('token', token)
    setMyToken(token);
  }

  const updateWishlist = (product) => {

    let temp = Wishlists
    let index = Wishlists.findIndex(p => p._id === product._id)
    if (index === -1) {
      temp.push(product)
      setshowToast({ show: true, message: "Item added to wishlist" })
    }
    else {
      temp.splice(index, 1)
      setshowToast({ show: true, message: "Item removed from Wishlist" })

    }
    setWishlist(temp);

    axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/updateWishlist?id=${userData[0]._id}`, temp)
      .then((res) => {
        console.log("Updated wishlist")
      })
      .catch((err) => {
        alert("Sorry, there is an error");
      })
  }

  const updateCart = (product) => {
    let temp = Cart
    let index = Cart.findIndex(p => p._id === product._id)
    if (index === -1) {
      temp.push(product)
      setshowToast({ show: true, message: "Item added to cart" })
    }
    else {
      temp.splice(index, 1)
      setshowToast({ show: true, message: "Item removed from cart" })

    }
    setCart(temp);

    axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/updateCart?id=${userData[0]._id}`, temp)
      .then((res) => {
        console.log("Updated cart")
      })
      .catch((err) => {
        alert("Sorry, there is an error");
      })
  }
  const updateCartQuantity = (product) => {
    setCart(product)

  }

  useEffect(() => {

    authToken();

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/new`)
      .then((res) => {
        setNewProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      })


    axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/popular`)
      .then((res) => {
        setPopularProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      })

  }, [authToken])

  const extractData = (product) => {
    let brand = "";
    let desc = "";
    let rating = product.RATING;
    brand = product.DESCRIPTION_COLOR.split(",")[1];
    let size = product.SIZE;
    let arr = product.DESCRIPTION_COLOR.split(",");
    desc = arr[arr.length - 2].replace("Buy ", "").replace(" Online in India", "").replace(brand.trim(), "").replace(size.split(" ")[0], "").replace(/fit/gi, "").replace("-", "").replace(/\s+/g, ' ');
    return { brand, desc, rating }

  }

  const setFilterProductData = (data) => {
    setFilterProducts(data)
  }
  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div class="loader1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }
  else {



    return (
      <div className="App min-vh-100">
        <div className="toast-container position-fixed top-10 end-1" style={{ zIndex: "1000000000" }}>
          <Toast className="bg-success text-light" onClose={e => setshowToast({ ...showToast, show: false })} delay={3000} show={showToast.show} autohide>
            <Toast.Body>{showToast.message}</Toast.Body>
          </Toast>
        </div>
        <ProductContext.Provider value={{ updateToken: updateToken, search: search, searchValue: searchValue, count: count, newProducts: NewProducts, popularProducts: PopularProducts, extractData: extractData, setFilterProductData: setFilterProductData, FilterProducts: FilterProducts, authToken: authToken, userData: userData, Wishlist: Wishlists, Cart: Cart, updateWishlist: updateWishlist, updateCart: updateCart, updateCartQuantity: updateCartQuantity, Auth: Auth }}>
          <Router>

            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/product" exact component={Products} />
              <Route path="/product/:popular" exact component={Products} />
              <Route path="/productDetails/:id" exact component={ProductDetails} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/login" exact component={Login} />
              <Route path="/forgotpass" exact component={Forgotpassword} />
              <Route path="/wishlist" exact component={Wishlist} />
              <Route path="/cart" exact component={Carts} />
              <Route path="/endPage" exact component={EndPage} />
              
            </Switch>
          </Router>
        </ProductContext.Provider>
        <ScrollToTop/>
        <Footer />
      </div>
    );
  }
}

export default App;
