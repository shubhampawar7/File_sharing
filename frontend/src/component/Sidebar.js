import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../component/css/Sidebar.css"

const Sidebar = ({ chat, filteredUsers, currentUser, setSearchUser }) => {
    return (
        <>
            <div class="sidebar border col-lg-3 col-md-3    " >
                <div>
                    <h3 class="text-center user-text ">All Users</h3><hr></hr>
                </div>


                <div class="search-bar">
                    <input onChange={e => setSearchUser(e.target.value)} type="text" class="form-control border     " placeholder='Search User...'></input>
                   
                    <button class="btn search-icon "><i class="fa-solid fa-magnifying-glass "></i></button>
                </div>
                <div class="user-list">
                {filteredUsers.map((user, index) => (
                    <div class="user-btn"  onClick={(e) => chat(e, user)}> 
                        <img class="user-image" alt='user' src={user.pic}></img>

                        <Link key={user.id} className="nav-link my-2  ">
                            <button class="btn  user-button " >
                                {user.email !== currentUser ? (user.name) : (user.name + " ( You )")}
                                
                            </button>
                        </Link>
                    </div>

                ))}
                </div>
            </div>  
        </>
    )
}

export default Sidebar;