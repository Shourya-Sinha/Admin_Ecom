import React from 'react'
import Header from './Header'
import {Outlet} from 'react-router-dom';
import Footer from './Footer';
import { Box } from '@mui/material';
const Combined = () => {
  return (
    <>
    <Header />
    <Outlet />
    <Box sx={{paddingTop:120}}>
    <Footer />
    </Box>

    </>
  )
}

export default Combined