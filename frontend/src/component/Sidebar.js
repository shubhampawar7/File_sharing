import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = ({chat,filteredUsers,currentUser}) => {
    return (
        <>
            <div class="sidebar border border-dark col-3  " style={{ backgroundColor: "#9CE2DF", borderRadius: "10px" }}>

                <h3 class="text-center">All Users</h3><hr></hr>
                {/* <div class="d-inline-flex mx-3 mb-3">
    <input onChange={e => setSearchUser(e.target.value)} type="text" class="form-control" placeholder='Search user...'></input>
    <button class="btn btn-info"><i class="fa-solid fa-magnifying-glass"></i></button>
</div> */}

                <ul>
                    {filteredUsers.map((user, index) => (
                        // <Nav.Link key={user.id} ><i class="fa-solid fa-user">  </i>   {user.name}</Nav.Link>
                        <Link key={user.id} className="nav-link">
                            <button class="btn btn-dark w-100" style={{ width: "auto", margin: "5px 0px", display: "flex", justifyContent: "left", height: "40px" }} onClick={(e) => chat(e, user)}> <i className="fa-solid fa-user mx-2"></i>{user.email !== currentUser ? (user.name) : (user.name + " ( You )")}</button>
                            {/* <button class="btn btn-dark w-100" style={{ width: "auto", margin: "5px 0px", display: "flex", justifyContent: "left", height: "40px" }} onClick={()=>setUserData(user.name)}> <i className="fa-solid fa-user mx-2"></i>{user.name}</button> */}

                        </Link>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Sidebar;