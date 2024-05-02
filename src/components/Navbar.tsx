import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link }  from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchData } from '../features/userDetailSlice'

const Navbar = () => {

const countUser = useSelector((state:any) => state.app.users);
const [searchText, setSearchText] = useState("");
const dispatch = useDispatch();

useEffect(() => {
  dispatch(searchData(searchText));
},[searchText])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light stick-top">
        <div className="container-fluid">
          <a className="navbar-brand">Redux</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" >Create</Link>
              </li>
              <li className="nav-item">
                <Link to="/read" className="nav-link active">All User ({countUser.length})</Link>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2 w-60" type="search" onChange={(e:any)=> setSearchText(e.target.value)}placeholder="Search" />
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar