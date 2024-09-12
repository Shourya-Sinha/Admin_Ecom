import React,{ useState  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './Layouts/MainLayout.jsx'
import { BrowserRouter as Router,Routes,Route, useNavigate, Navigate } from 'react-router-dom'
import Login from './Views/Authentication/Login.jsx'
import Register from './Views/Authentication/Register.jsx'
import Brand from './Views/AllPages/Brand/Brand.jsx'
import ViewBrand from './Views/AllPages/Brand/ViewBrand.jsx'
import CreateCategory from './Views/AllPages/Category/CreateCategory.jsx'
import ViewCtaegory from './Views/AllPages/Category/ViewCtaegory.jsx'
import CreateColor from './Views/AllPages/Color/CreateColor.jsx'
import ViewColor from './Views/AllPages/Color/ViewColor.jsx'
import CreateProduct from './Views/AllPages/Product/CreateProduct.jsx'
import ViewProducts from './Views/AllPages/Product/ViewProducts.jsx'
import ViewOrders from './Views/AllPages/Orders/ViewOrders.jsx'
import Statics from './Views/AllPages/Statics.jsx'
import AdminProfile from './Views/Authentication/AdminProfile.jsx'
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux'
import { Snackbar } from '@mui/material'
import closeSnackBar from './Redux/Slices/InitialSlice.jsx';
import VerifyOtp from './Views/Authentication/VerifyOtp.jsx'
import ViewCoupon from './Views/AllPages/Coupon/ViewCoupon.jsx'
import CreateCoupon from './Views/AllPages/Coupon/CreateCoupon.jsx'
import UpdateProductPage from './Views/AllPages/Product/UpdateProductPage.jsx'
const vertical = 'bottom';
const horizontal = 'left';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const dispatch = useDispatch();

  const {severity,message,open} = useSelector(
    (state)=> state.app.snackbar,
  )
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackBar());
  };

  return (
    <>
      <Router>
        <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/' element={<MainLayout />}>
         <Route index element={<Statics/>} />
          <Route path='addBrand' element={<Brand />} />
          <Route path='viewBrand' element={<ViewBrand />} />

          <Route path='addCategory' element={<CreateCategory />} />
          <Route path='viewCategory' element={<ViewCtaegory />} />

          <Route path='addColor' element={<CreateColor />} />
          <Route path='viewColor' element={<ViewColor />} />

          <Route path='vewOrders' element={<ViewOrders />} />

          <Route path='vewCoupons' element={<ViewCoupon />} />
          <Route path='createCoupon' element={<CreateCoupon />} />

          <Route path='addProduct' element={<CreateProduct />} />
          <Route path='viewproduct' element={<ViewProducts />} />
          <Route path='edit-product/:productId' element={<UpdateProductPage />} />
          <Route path='profile' element={<AdminProfile />} />
          {/* <Route path='*' element={<Navigate to='/' />} /> */}
        </Route>
        </Routes>
      </Router>
       {message && open && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal}}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

export default App
