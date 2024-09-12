import React from 'react'
import HomeRoutes from './HomeRoutes'
import PrivateRoute from './PrivateRoute'

const MainRoute = () => {
  return (
    <>
    <HomeRoutes />

    <PrivateRoute />
    </>
  )
}

export default MainRoute