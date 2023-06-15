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


const Dashboard = () => {
    const [users, setUser] = useState([]);
    const [searchuser, setSearchUser] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    console.log(filteredUsers,"filtered usersssss");
    const [selecteduserid, setSelectedUserid] = useState();
    const [selectedusername, setSelectedUsername] = useState("You");
    const [fileData, setFileData] = useState('');
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [FilesData, setFilesData] = useState([]);
    const [message, setMessage] = useState([]);
    const [emptyinput, setEmptyInput] = useState("");
    const [user,setCurrentUser]=useState();
    const [singleuserfiles,setSingleUserFiles]=useState([])
    // console.log(singleuserfiles,"users data files");



    console.log(user,"logged in");
    // console.log(updated,"sdfsdf");

    const handleChange = (e) => {
        setEmptyInput(e.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setMessage(event.target.value)
            setEmptyInput("")
        }
    };

    // const[allfiles,setFile]=useState();
    const currentUser = localStorage.getItem("email")
    console.log(currentUser);



    // console.log(currentUser,"current user");
    // console.log(selecteduserid,"selected userid");
    // console.log(allfiles,"all files data");

    const chat = (e, user) => {
        e.preventDefault();
        if (currentUser === user.email) {
            setSelectedUsername("You")
            setSelectedUserid(user._id)
            // setCurrentUser(user._id);
        }
        else {
            setSelectedUserid(user._id)
            setSelectedUsername(user.name)
            console.log(user._id, "name", user.name);

        }

    }


    const getAllUsers = () => {

            ApiService.get("/data", null, null, (res, err) => {
                if (res !== null) {
                    console.log(res.data, "get all user",filteredUsers);
                    setUser(res.data)
                    setFilteredUsers(res.data);
                    console.log(res.data,"d");

                   

                }
                else {
                    console.log(err.message);
                }
            })

        
       
    }
    const handleFileChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        setFile(event.target.files[0])
        setFileName(file.name)
    };

    const handleFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", fileName)
        formData.append("uploadedBy", user);
        formData.append("sharedWith", selecteduserid)
        console.log(file.name);
        ApiService.post("/upload", formData, null, (res, err) => {
            if (res !== null) {
                console.log(res, "file res");
                Swal.fire(
                    'Uploaded Successfully ',
                    '',
                    'success'
                  )
                  getAllFiles();
                  getFile();

              
            }
            else {
                console.log(err.message);
            }
        })
    }

  const  getAllFiles=()=>{
        ApiService.get(`/allfiles/`, null, null, (res, err) => {
            if (res !== null) {
                console.log(res, "filedata res");
                // setFilesData(res)
            }
            else {
                console.log(err.message);
            }
        })
    }

    const getcurrUser=()=>{
        filteredUsers.map((user)=>{
            if(currentUser===user.email){
                setCurrentUser(user._id);
                console.log(user._id,"dd");
            }
        })
    }

 

    const getFile=()=>{
        // console.log(user,"get file user");
        ApiService.get(`/allfiles/${selecteduserid}`,{
            params:{
                uploadedBy:user,
            }
        },null,(res,err)=>{
            if(res!==null){
                console.log(res,"single file");            

                setSingleUserFiles(res)
            }
            else{
                console.log(err.message);
            }
        })

    }

    useEffect(() => {
        getAllUsers();
        // getAllFiles();

    },[])
    
    useEffect(() => {
        const filtered = users.filter(user => user.name.toLowerCase().includes(searchuser.toLowerCase()));
        setFilteredUsers(filtered);
    }, [searchuser])

    useEffect(()=>{
        getFile();
        getcurrUser();

    },[selecteduserid,filteredUsers])


    return (
        <>
            <Header setSearchUser={setSearchUser} currentUser={currentUser} />

            {/* section */}
            <div class="row  w-100 border " style={{ height: "88vh" }}>
                <Sidebar chat={chat} filteredUsers={filteredUsers} currentUser={currentUser} />

                <ChatSection selectedusername={selectedusername} message={message} handleFile={handleFile} handleChange={handleChange} handleFileChange={handleFileChange} handleKeyDown={handleKeyDown} emptyinput={emptyinput} FilesData={FilesData} singleuserfiles={singleuserfiles} />


            </div>
        </>
    )
}
export default Dashboard;