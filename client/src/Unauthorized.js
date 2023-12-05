import React from 'react'
import { Link } from 'react-router-dom'
import CommonButton from './common/CommonButton'

const Unauthorized = () => {
  return (
    <>
    <br />
    <br />
    <div className='editBox MargT4'>
      <br />
      <h1>You must be logged in to view this page, please</h1>
      <br />
      <Link to={`/login`}>
        <CommonButton >Log In</CommonButton>{" "}
      </Link>
      <br />
      <h1> or </h1>
      <br />
      <Link to={`/users/new`}>
        <CommonButton className="btn btn-accent">Signup</CommonButton>{" "}
      </Link>
    </div>
  </>
  )
}

export default Unauthorized