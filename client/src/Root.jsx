import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <>
      <div>
        <Link to="/"> Home </Link>
        <Link to="/books"> Books </Link>
        <Link to="/add"> Add </Link>
      </div>

      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default Root
