import React, { useEffect, useState } from 'react'
import ApiService from '../middleware/ApiService';
import { Link } from "react-router-dom";
// import "../component/css/Dashboard.css"
import style from "../component/css/Dashboard.css";
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatSection from './ChatSection';
import Swal from 'sweetalert2';
import { API_URL } from '../config/config';
import io from "socket.io-client";

var socket;



const Dashboard = () => {
    const [users, setUser] = useState([]);
    const [searchuser, setSearchUser] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [selectedusername, setSelectedUsername] = useState("You");
    const [fileData, setFileData] = useState('');
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState();
    const [FilesData, setFilesData] = useState([]);
    const [message, setMessage] = useState();
    const[messagetime,setMessageTime]=useState();
    const [emptyinput, setEmptyInput] = useState("");
    const [user, setCurrentUser] = useState();
    const [selecteduserid, setSelectedUserid] = useState();
    const [singleuserfiles, setSingleUserFiles] = useState([])
    const [deletefile, setDeleteFile] = useState("");
    const [currentusername,setCurrentUserName]=useState()
  

    // const[allfiles,setFile]=useState();
    const currentUser = localStorage.getItem("email")
    useEffect(() => {
        socket = io(API_URL);
        socket.emit("join chat", selecteduserid)  //singleuserfiles
        // socket.on("connection", () => setsocketConnected(true));
        getFile();


    }, [selecteduserid])




    const chat = (e, user) => {
        e.preventDefault();
        if (currentUser === user.email) {
            setSelectedUserid(user._id)
            setSelectedUsername("You")
            // setCurrentUser(user._id);
            console.log("chat():", user._id, "name", user.name);

        }
        else {
            setSelectedUserid(user._id)
            setSelectedUsername(user.name)
            console.log("chat():", user._id, "name", user.name);

        }

    }


    const getAllUsers = () => {

        ApiService.get("/data", null, null, (res, err) => {
            if (res !== null) {
                console.log("getAllUsers", res.data, "get all user", filteredUsers);
                setUser(res.data)
                setFilteredUsers(res.data);
             



            }
            else {
                console.log("getAllUsers", err.message);
            }
        })



    }
    const handleFileChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        setFile(event.target.files[0])
        setFileName(file.name)
    };

    const handleChange = (e) => {
        setEmptyInput(e.target.value);
        setMessage(e.target.value)


    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setMessage(event.target.value)

            const date = new Date();
            const message_time = date.getHours() + ":" + date.getMinutes();
            setMessageTime(message_time)
            setEmptyInput("")
        }
        
       
    };

    const handleFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const date = new Date();
        const current_time = date.getHours() + ":" + date.getMinutes();

        socket.emit("new message",message)



        // console.log("handleFile",file.name);
        //Add message
        if (message) {
            formData.append("uploadedBy",user);
            formData.append("uploadedBy",currentusername);    
            formData.append("sharedWith", selecteduserid);
            formData.append("current_time", current_time);
            formData.append("message",message );
            setMessage("")
        }
        if(file){
            formData.append("file", file);
            formData.append("name", fileName)
            formData.append("uploadedBy",user);
            formData.append("uploadedBy",currentusername);
    
            formData.append("sharedWith", selecteduserid)
            formData.append("current_time", current_time)
            setFile("")
            setFileName("")


        }    

      

        ApiService.post("/upload", formData, null, (res, err) => {
            if (res !== null) {
                // if (message.length < 0) {
                //     Swal.fire(
                //         'Uploaded Successfully ',
                //         '',
                //         'success'
                //     )

                // }
                // else{
                //     getAllFiles();
                //     getFile();
                // }
                e.target.reset();


                    getAllFiles();
                    getFile();
              


            }
            else {
                console.log(err.message);
                res.json("file not uploaded")
            }
        })
    }
 


    const getAllFiles = () => {

        ApiService.get(`/allfiles/`, null, null, (res, err) => {
            if (res !== null) {
                setFilesData(res)
                
            }
            else {
                console.log("getAllFiles", err.message);
            }
        })
    }

    const getcurrUser = () => {
        filteredUsers.map((user) => {
            if (currentUser === user.email) {
                setCurrentUser(user._id);
                setCurrentUserName(user.name)
                console.log("getcurrUser", user._id, user.name);
            }
        })
    }



    const getFile = () => {
        setMessage("")

        // console.log(getFile,"get file user");
        ApiService.get(`/allfiles/${selecteduserid}`, {
            params: {
                uploadedBy: user,
            }
        }, null, (res, err) => {
            if (res !== null) {
                console.log("getFile", res, "single file");

                setSingleUserFiles(res)
                setDeleteFile(false)
                setFileName("")
            }
            else {
                console.log("getFile", err.message);
            }
        })

    }

    useEffect(() => {
        getAllUsers();
        // getAllFiles();

    }, [])

    useEffect(() => {
        const filtered = users.filter(user => user.name.toLowerCase().includes(searchuser.toLowerCase()));
        setFilteredUsers(filtered);
    }, [searchuser])

    useEffect(() => {
        getFile();
        getcurrUser();

    }, [selecteduserid, filteredUsers])



    return (
        <>
            <Header setSearchUser={setSearchUser} currentUser={currentUser} />

            {/* section */}
            <div class="row mx-0   chat-section" >
                <Sidebar   setSearchUser={setSearchUser} chat={chat} filteredUsers={filteredUsers} currentUser={currentUser} />

                <ChatSection  users={users} fileName={fileName} selecteduserid={selecteduserid}  currentusername={currentusername}  setDeleteFile={setDeleteFile} deletefile={deletefile} getAllFiles={getAllFiles} selectedusername={selectedusername} message={message} handleFile={handleFile} handleChange={handleChange} handleFileChange={handleFileChange} handleKeyDown={handleKeyDown} emptyinput={emptyinput} FilesData={FilesData} singleuserfiles={singleuserfiles} getFile={getFile} messagetime={messagetime} />


            </div>
        </>
    )
}
export default Dashboard;