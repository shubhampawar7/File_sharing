import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({setSearchUser,currentUser}) => {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light  " style={{ backgroundColor: "#86A8E7" }}>
                <div class="container-fluid row">

                    <div class="collapse col-3 navbar-collapse d-flex justify-content-left  " id="navbarTogglerDemo01">
                        <h3 >Welcome to Dashboard</h3>
                    </div>

                    <div class="d-inline-flex mx-3  w-50">
                        <input onChange={e => setSearchUser(e.target.value)} type="text" class="form-control border " placeholder='Search user...'></input>
                        <button class="btn btn-info"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>


                    {/* toggle button start */}
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    {/* toggle button end */}



                    <div className="collapse navbar-collapse w-auto" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto  mb-auto">

                            <li className="nav-item m-auto f-right">
                                <Link className="nav-link " aria-current="page" ><h5><i class="fa-solid fa-user"></i>   {currentUser}  </h5></Link>
                            </li>


                            <li className="nav-item m-auto f-right">
                                <a className="nav-link " aria-current="page" href="/" ><button class="btn btn-dark">Logout</button></a>
                            </li>


                        </ul>

                    </div>

                </div>
            </nav>
    </>
  )
}

export default Header
