import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import ApiService from '../middleware/ApiService';
import fileDownload from 'js-file-download';

const ChatSection = ({ selectedusername, message, handleChange, handleFileChange, handleFile, handleKeyDown, emptyinput, FilesData, singleuserfiles }) => {


    // const [file, setFile] = useState(null);
    // const handleFileName = (file) => {
    //     setFile(file);
    // };

    // const fileTypes = ["JPG", "PNG", "GIF", "json"];
    // const[content,setContent]=useState()


    const handleDownload = (e, filename) => {
        e.preventDefault();
        // const fileType = filename.name.split('.').pop();

        ApiService.get(`/download/${filename.name}`, null, null, (res, err) => {


            // {
            //     headers:{
            //         "Content-Type":`application/${fileType}`
            //     }
            // }
            if (res !== null) {
                fileDownload(res.data, filename.name)
                console.log(res, "download res");
                // setContent(res)

            }
            else {
                console.log(err.message);
            }
        })

    }






    return (
        <>

            <div className=' col-9 border border-dark' >
                <div class="container-fluid w-100 h-100" >
                    <div class="w-100 ">
                        <div class="border d-flex mt-2 rounded-pill bg-info" >
                            <h3 class="mx-3 "> <i class="fas fa-user-circle"></i>{selectedusername}</h3>
                        </div>
                    </div>
                    <div class="border border-dark mt-2 rounded   overflow-scroll " style={{ height: "80%" }}>
                        <table class="table table-striped    ">
                            <tbody>
                                {
                                    singleuserfiles.map((files, index, arr) => (
                                        // <tr class="" ><h6>{files.name}</h6></tr>,
                                        <>


                                            <tr style={{ position: "relative", top: "auto", marginBottom: "40px" }}><h6>{files.name}<button onClick={() => {  window.open(`http://localhost:7000/download/${files?.name}`,"_blank"   );}}>Download</button> </h6></tr>
                                            {/* <tr style={{ position: "relative", top: "auto", marginBottom: "40px" }}><h6>{files.name}<button onClick={(e) => handleDownload(e, files)} onClick={() => {  window.open(`http://localhost:5000/download/${FileName?.name}`,"_blank"   );}}>Download</button> </h6></tr> */}

                                        </>

                                    ))

                                }

                                <tr style={{ position: "relative", top: "auto", marginBottom: "40px" }}><h6>{message}</h6></tr>

                            </tbody>
                        </table>

                    </div>
                    <hr></hr>
                    <div style={{ borderRadius: "15px", width: "100%", height: "40px" }}>
                        <form style={{ display: "flex" }} onSubmit={handleFile} >
                            <input class="border border-dark form-control rounded-pill " value={emptyinput} placeholder='Enter to send your message...'
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}></input>
                            <input type="file" id="file-input" name="file" onChange={handleFileChange} />
                            {/* <FileUploader  onChange={handleFileChange} name="file" types={fileTypes} /> */}
                            <button class="btn btn-info" type='submit'>Upload</button>
                        </form>
                    </div>
                </div>


            </div>
        </>
    )
}

export default ChatSection;
