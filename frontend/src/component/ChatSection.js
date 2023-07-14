import React, { useEffect, useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import ApiService from '../middleware/ApiService';
import fileDownload from 'js-file-download';
import Swal from 'sweetalert2';
import { API_URL } from '../config/config';
import styles from "../component/css/Chat.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from "socket.io-client";
var socket, selecteduserid;





const ChatSection = ({ users, fileName, selecteduserid, currentusername, setDeleteFile, deletefile, getAllFiles, selectedusername, message, handleChange, handleFileChange, handleFile, handleKeyDown, emptyinput, FilesData, singleuserfiles, getFile, messagetime }) => {


    // const handleFileName = (file) => {
    //     setFile(file);
    // };

    // const fileTypes = ["JPG", "PNG", "GIF", "json"];
    const [socketConnected, setsocketConnected] = useState(false)
    const[receivemsg,setReceivemsg]=useState();



    useEffect(() => {
        socket = io(API_URL);
        socket.emit("join chat", selecteduserid)  //singleuserfiles
        socket.on("connection", () => setsocketConnected(true));
        getFile();


    }, [selecteduserid])





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
                console.log(res, "handleDownload :download res");
                // setContent(res)

            }
            else {
                console.log("handleDownload", err.message);
            }
        })

    }

    const handleDeleteFile = (e, files) => {
        e.preventDefault();
        const payload = {
            fileId: files._id
        }
        ApiService.del(`/delete/${files.name}`, payload, null, (res, err) => {
            if (res !== null) {

                setDeleteFile(true);


            }
            else {
                console.log(err.message, "handleDeleteFile error");
            }
        })

        console.log("handleDeleteFile", files);


    }
    useEffect(() => {
        if (deletefile) {
            // Swal.fire(
            //     'Deleted Successfully ',
            //     '',
            //     'warning'
            // )
            const notify = () => toast.error('Deleted Successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });;
            notify();

            getFile();
            setDeleteFile(false);
        }


    }, [deletefile])


    useEffect(()=>{
        socket.on("message received",(message)=>{
            singleuserfiles.push(message)

            setReceivemsg(message)
            console.log(message,"meeeeeeeeeessssssss");
        })
   
    })






    return (
        <>
            {
                selecteduserid && selecteduserid !== "undefined" ? (
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 border chat-content'  >
                        <div class="container-fluid-chat  mt-2  mb-0"  >
                            <div>
                              
                                {/* <div class="border d-flex  rounded-pill user my-1 " > */}
                                <h3 class=" username-heading-main mx-2 "> <i class="fas fa-user-circle"></i>{selectedusername}</h3>
                                {/* </div> */}


                            </div>
                            <hr></hr>
                            <div class="rounded     chat-table   " >
                                <table class="table   ">
                                    <tbody class="mt-2 chat-messages">
                                        {
                                            singleuserfiles.map((files, index, arr) => (
                                                <>
                                                    {/* <div class="row mt-2 mx-1 my-1 message-row"  >
                                                     <img class="user-image" alt='user' src='data:image/jpeg;base64,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'></img>
                                            <h5 class="username-heading my-2">{currentusername}</h5>
                                                    <h6 class="col-9 file">    {files.name}</h6><h6 class="chat-actions col-2"><button onClick={() => { window.open(`${API_URL}/download/${files?.name}`, "_blank"); }}><i class="fa-solid fa-download "></i> </button><button onClick={(e) => handleDeleteFile(e, files)} > <i class="fa-solid fa-trash"></i></button></h6><h6 class="col-1">{files.current_time}</h6>
                                            </div> */}
                                                    {
                                                        currentusername === files.uploadedBy[1] ?
                                                            (
                                                                <>
                                                                    {/* current user */}
                                                                    <div class="  message-heading-curruser row mx-2  " >
                                                                        {/* <div class="message-row">
                                                                            <img class="user-image" alt='user' src='data:image/jpeg;base64,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'></img>
                                                                            <h5 class="username-heading my-2 ">{files.uploadedBy[1]}</h5>
                                                                        </div> */}
                                                                        <div class="file-row " >

                                                                            <div class="file-content1 ">
                                                                                {
                                                                                    files && files.name ? (
                                                                                        <>
                                                                                            <h6 class="  file-name">    {files.name}</h6>
                                                                                            <button class="file-actions1 " onClick={() => { window.open(`${API_URL}/download/${files?.name}`, "_blank"); }}><i class="fa-solid fa-download "></i> </button><button class="file-actions1" onClick={(e) => handleDeleteFile(e, files)} > <i class="fa-solid fa-trash" ></i></button>


                                                                                        </>) : (
                                                                                        <>
                                                                                            <h6 class="  file-name">    {files.message}</h6>
                                                                                            <h6 class="  file-name">    {receivemsg}</h6>



                                                                                        </>
                                                                                    )
                                                                                }

                                                                                <ToastContainer />
                                                                                <h6 class=" current-time">{files.current_time}</h6>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) :
                                                            (
                                                                <>
                                                                    <div class="  message-heading-anotheruser row mx-2  " >
                                                                        {/* <div class="message-row-2">
                                                                            <img class="user-image" alt='user' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIRERISEhESGBEYEhISGRgYEhEYEhgYGBUZGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1HCQ7QDs0Py40NTEBDAwMEA8QHhISHzQlJSU0NDQ0NDQ0NDQxPTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIARMAtwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIEBQYHAwj/xABGEAACAQIDBQUFBQQIBAcAAAABAgADEQQSIQUGMUFREyJxgZEHMmGhsRQjQsHwUoLR4SQzYmNysrPxdJKiwiU0NURTZHP/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgEDBP/EACARAQEBAQEBAQEAAgMAAAAAAAABAhExEiFBA2ETIlH/2gAMAwEAAhEDEQA/AOmiO0BHaYCEcIBaEcYEBAR2jhAjbWTAitHALQtGITQgISQgYEY4R2mBQjtC00RhJRQEYRwgKEcIHjHC0cwKSAikoCtHCOAQhHARhHCARiFoQAQhHAUIRzQoRwgKFo4oBaEIQC0ICEDyEcI5gUccIBCMRwFCO0IEbaiSiPGOAQiaoq8SB4kCRNdQpYsAo1LEgL6mB6QkadRXF1II6iSmgjhCAoRwgKEcIChHCAoQhA84RwmAhCO0BwgICaCEJjN4NpNhqLVFylhwDKxBPS4It5mYLG0NoU8PTepVcKii5JPyHU6Tmm1vaTVckUECJc2J1qEcL9Fmr7z7xVcdUvUyqoIORHY07gWvrz0mEMi3rrnPGxPvJiKjZmqniCB+HThcfi163nrX23iajIWrO5Q5lB1UNybKe7ceE1cGZXAEkG506aWkWcXP10zdfe81GSlX986BiVDE+Am9Kbz58rU7NlA7xHXUeR4TetwNt9hfD1iwR2BQk3VW4W+AP1lZ1z8qdY/sdKjijnVxKOELQFCOEBQjhAUI4QPKEBHMBCEYmgEcUcAmq+0bHvQ2fUKGzOy079A3vW+NtPObVOa+2F3yYVb/AHZao1rnVwFtceBMy+Kz65cBJCmx1AMaDUCdB2Nsim1NO6NQJw1r5d85+nPcpHjLNN6hFg7AeY+YnUKG79Jj3qanyEylDd6iBYU19BJ+rfIv4k9rlmHwtMAFyxN+Wb8xMumHewZDfgRmDE6TpKbv0SLFBNZ3g3eOEC1KDNkZsrJfu63NwPL4Sb9e0nz5G6bvY9sRhqdR1yvax42JGlxflpMnMDudTYYUMbd5iRx4X/3menqze5leXU5qwzCEcpJQjhAUCIQgK0I4QPERwEYgFoQhAI4oxAJzv2wU/uMK4HCq6nwZL8P3Z0Wc238oBq9Q1HbJ2aAcSACNAAPiGkf5NfM66/4sfWuOZ4Sgajqi8SZ0bZ+Op4dF7R1VQALk6maZsfD5cWqi9srEXFjYjnNjXZ7MxqLSWpUFgoc/dprxIsZ592Wx6MZslbFhN58Gx/r0FjzNps2AxVOomemwZeoNxNKo4CtVRlr08ETplApAjlcFgLjnMpuhTFN61AABL51AvbXjx8ImpLJG3NstrOtvBhEbI1emH10J1NpR3i2lSqYUtTcNZ6Y04jM2UHwuRMY2yaiYrNTpYQC/vNTLP45jw8JnKuFapRPbJTz56eqG4tnQ8So4WvK79TiLmSsxsvDinRpoOSD1Op+ZluQppZQOgA9BJz0T8jy30QhCawQhCAQhCAQhCB4CSEiJIQCEI4BAQjgE1XfbZYqItS2g7j242vdT5G/rNqidQQQQCDoQRcEeEnefrPF41c6ljhuHq5MYM9sxp5bjx0+Vp0HYjKxuLXnON5MOcNilW+q9ot9dbVG/K0zuwNsladd1F2QKwGt8rEAnyuZ5dZ+bK9mdfXW7bVxVNBbuhmOUaczKew1y173BJGus0zHbbqYjugUxrwY94Hz/AFrLGwsPWpstSmMxNtBUW2p1uL24Sbr96rn/AF5HUq2QasB4kfnJ5RYDqR9RMBTxdRLrUKHN+Esubpw5/wApZwmLy1KdAe8Wz24lUsSAT+uU7Z1LXDWbJ62GEIT0PKIQhAcUcIChHCAoRwgVxJSMcBiAgDHAI4QgExe8u0vsmDxFcWzJTOW/DO3dS/7xEyk5X7Td6KVdFwmHqFgtXPUdSOzOUEBB+13iDfhdefLLeNk61LaWObF0RUds1dXJc2AJzHU2Glr2lTZG0Ho1Mym2ZTTPSzaSgjlTcHX9aQPUen8Jx+fzjv3+uhtg6binUVsrqFBdTYkg3166zbNjEqgQVGNrjV00NrXJy3J85yvYm1SrBHbuGwv05XnRtmYVGCuHbTXQjKflrOPLmvT9Z1lkq2ApYdK2ILXqsou7kswVdQoLEnKOl5Lc6g1Q1cZUBzVGIS/7F+I+HAfuzw2hhziqlLChjkI7RyDqEGh8L6ibdSpqiqigBVAUAcABwAnfGe3ry/5NfnEo4hHOzgIo4QCEIQCEIQCEIQK8cUcBiOIRiArwd1VSzEBQCSSQAAOJJPAQccPGcv8AadvCXf7FTe1NCDVI/E/EJ4LoT8fCZa2Trx3036avnw2EYCh7r1Ae9U6hbcE+Z8OOhtS6RqgP8x+c9gpFrm49fnJ9dJOKLJaKZCthyR9JU7Mm/UcZljWT2UMNWIp4gmm50WotgpP9scB4/Sbtg9h1KNKo74phRp02qZlRdVAzHW/EgW85zKZpNu4lMJUwtyaLqBdg11GYGyHobWt8ZFx2rmuR1PcbbGFq01UXTFsiFw7XLkDXI3NQb93l85uM+dcBVJQAaMhLDqRe59L/AFnRd0N8nzdliWLpwVzq6fBzxZfjx8Z1z+Rx1P66NCRRwwBBBBAIINwQeYMlKQIQhAIQhAIQhAIQhArxiKECQgICF4GB3w239hwjVFI7Vz2dMH9oj3rdFGvp1nC69QsxJZixNySTck6knzm2+07ahq400ge5RQUwOWc95z81H7k0y8jVdMzkeyueHLxl7DG9r8v9pjka0yWEsRccRxH5xltXaVC4sQLGV62COhX3xwP7QHI/GX8M48RwJ6W5y0yAg28QeXDTy4zpzqeteOEFRc4BsNGA95D0I/EvzEr1VdEZc10NtORF+K+B4jlMwAEqBh7jix6BuRhicMLX/A11YfstwuPXzk3LeqGy6Hdzg65jbppa4Pjf6S6XNF1qD3NAfA/ylPZL2L020a5I8RxtMtUph01/wH4E6g+o+cTwtbluVvCy1FwlRwUJZUJPun3lF+jA+RnQp8/4VmUobkEBhcXuCv52E7Bubtw4zDAufvkyrU00JK3VvMcfiDNTqNghCEJEIQgEIQgEIQgVoxIx3gTESiIGO/CB877eql8XiG61qp9XY/nMevGXNsf+Yr2/+esP+tpTXrIrtHovGWgjAhlNjytKaH6SxRqWsDw0iC5SxbAgsLG/H8J8RyMy1GpcXHiQNfMdR1EommHS41GnTTzhSQqNCdOXMeEqJW2QMalPkw7RddOGs9KJuLNwYZG8RpfzEoYirlam6G9lZrc7KRmX0dpfFmBI1DAH5XHyMqMYbaNNqVRX6HKT1y8D5r9Jm6He00yuoI+olfH4ftKZtxPD/EOHrw9ZW2JXLJk5odOtrjT6TPK3+PbHAopYDUtbzNwfp9Js/s82sMPU7J7ZKjgMf2Xy2U36aBfOYLabqKbHncMPhbiZjNnuRSL317QfUxfWex9CQmG3W2l9qwlOoxvUX7t/8S8/MWPnMxCEoRQgEIRwFCBEIFQRiRvJCBIRiREcD533gTLi8UP/ALFb5uxlFuAtM1vnSybRxa/3zN/zd785hJzvrrPDE96IBFucrySNYw1eo1HpG4Oh4g8DMhQqo/A2PGxJt5SitYFRca/L9fGezUwNCh8ZUZVlqJDaKCpuGAscpOhMNl1CL0z7yXI+K3/KeVJ1fjcVANDci+mmb+MjTVgFqD+sX3h1sbMJTGTpn+sTS1gw9eXhMVSHZYpuSspbwuLn5gzJqwZxbjoPEOLg+sxe1e8tOoOIZqbeOv8AA+sVkZPHgdhVyAXya342uD56AzE4B700X+8F/r+RmUwzipTs3B6eXztrNfoVCuY/2bef6vMv/rY6BuNt1sPWak1uzeoga97qSSAw8yL/AA8J1VWBAIIIOoI4GcFw1S1TOOICn850P2d7Z7QVcK7e5UvTvzUi7IPA6+c1Oo3kQhCEiEIQCEIQKQkhIgyV4DElICO8Dj/tUwOTHCqB3atJWv8A207jD0CHzmk3nZPajs8VcD2oHfo1Ff8AcfuN9VPlONyNeumb+HaAiVrSYIPwmKWaZB0MyuHe6AHiNJhEcDnMlhEV1JDa8wb/AElRlemYO9lF+p5eXUy0wyqO6RbnbiD/AA0nklOoB3WUeA/KXMM592oAyHRgO61vh0MpimrhalLoc1P/ALlPqRPLELmpYsc1q5h5sL/IH1m9Yn2fo603w+Ja11qKHUEMMoAGZbW4DkZr53ZxqfaEbDOWdmylSjA3Bsbg6cRxtM6KG7ZzikumlZV8iQZk/ajsoUcStdFAp1ls1hYdonEn4lSP+UytsnZWKwNRKmJw1ZaS1adRmFNnAVT3j3L2tNx3pehtXAsuFqo7qy1EsGvmXip/ZJUka9RJtVI5iteyLrY8Pjp0+MvbF2i2HftFBzhlI42FiTr1JJmUwG4eKfK1R0p9AQzMPIaTL0/Z+y/+6HlS18femzULlu27O8K41X+7KOlu6TcMp4Mszs5bi93MTg1+0UKmdkFzkXLUCjmtyb+E3vdfagxeEp1cwLe6xHNl525ctJssvjnrPGXhCBmpEIoQKQkhIAycMMGSvISVtYa8sdhUr0qlGoO49NqZ8GBE+dcdhXoValKp76O1NvFTa/gePnPpGca9qOz+yx3aAd2tTV/Fk7j/AEQ/vSdT8Vm/rV6WCzIGzi5BNrdL85UIINjJ0kc+4G8r/lPR6FTLnZTbQXM5x2vLPyIILm0t0UHC58jaUVNpYR5cSydIstrOTpwOstJiqYtmZQfHSUMFWUAhhre400l3OG0Krbhrw+kuIrom420cyNQJuFGdDce6TYjyJ+c23LOX7h0ezxYGfumnUsp0Kk2OnUWHCdMLyL6riwyaTT6WwaVCri8RTL0nGIQgpktldEJBBBGXMSbdeHGbYtYcCZh9p4nDotdGqUwzvRdlLhbsLAa+CD0j87GfvKu4Z+0QOARqw155SRfzt8565TKuyqh7Jcwsczm2nAubHT4S32gmWTqp4Asxu7GxzhKmMCn7mpVWqi8kupzrbx+Vpk8096B18pufU68e8IQluQhCECkpuLx2nmgtJiBKSEgDJCGpiar7Q9inF4JmRb1aJNVLcSAO+o8V1t1UTaoCB86YPaJppkygjNmuDa9xznodpAoUKXBuPe/lM57Qd2vsWI7Smv8ARqrMy24I/Fk8OY+FxymvYSrSVe+t2udbX05TjrPK9GdWznVSSRp74upTcLkWzDQ2GhErCbGWcXsNUt4y9h3zv8Bb1mHRunGXsM5AyC2puT/H4S5U1mtmV8mJo1ASAjkkj0+l51EYhnX7uxvwJByePU/rWciwlXv8rJb1J/gPnOm7jVM+EUHVkJQ/UfW3lG539VnXFXE7uV6zZqmNr36IQieAC/nrKtHd1sIz1ERawuWOcntAeZBN1J4dOE3cpPF0zEL1sPnOXyr7v9YyniiAvaU3TMAddOOvEaeUsqynUMbeUzTIrDKQCOhAIkEwlMcKa+k6fDl/yf6YvtcsyeEQhbnifpPYKBwAjmzPE612CEIS0HCK8Jgx5PLznoTPIGSBmj0UyQM8wZMGY16QBkRHDGge15v6Nhb8PtB/03nJyLTq3tgP9Gwv/wC7f6ZnKpGvXXPhpUK3twPGRhCStNDbW896dSwLc+AlUCeimVGMlgWy07nm5P0E6r7PKBXCvUPB6nd8FFifW/pOcbs7KOLrU6OuQtdyOSqNT6aeJnbMNhUpU0p01C00UKoHICbb+cSkx5zGvtNExeHok99y+nQBGI+YnttXGLQptUbgAdOp5Cc03f2q9fH0MRU95qyD4KCcuX5zJO1t8diF7/COK8J0cThFFAlFCEAhCEDGAyYMgsmIamJISAkgJg9BGDIrJLA597Xx/R8Kf79x6of4TlU6z7XkP2TDnkMTb1pP/Ccmka9dM+CAMISVCe2Hpux7iMx+CkzyRiDcTbN3tvoPu6igA6A6ZZltnis5mr+1u24mxhhKRqVLGu9s2osi8QgPzPl0m3NVFr3E17ZRXKCr3W1+Ok1zePeI1C1Gg/3fus4/EeYB/Z+s3PdG8zL33m2wK7ZEN6a3F+TE6EzV930y1zT/ABLVVl8mDW9DFRew/XWZDdrC59q0hbusq1D4IDf/ACiducca7CYRRwgRRxQCEIQHCEIGMpcP3jPUQhDT5GNDpHCBMRwhA0z2qf8Apw+Fel/lacdhCc9eumfAYQhJUBJQhNF2ltCsqGmKtQITYqGNiOktYL9ekISslX+f66TOblH/AMUof8JW+sITpfEOriEITHMQhCAhHCEAhCED/9k='></img>
                                                                            <h5 class="username-heading my-2 ">{files.uploadedBy[1]}</h5>
                                                                        </div> */}
                                                                        <div class="file-row-2 " >
                                                                            <img class="user-image" alt='user' src='data:image/jpeg;base64,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'></img>


                                                                            <div class="file-content2 ">
                                                                                {
                                                                                    files && files.name ? (
                                                                                        <>
                                                                                            <h6 class="  file-name">    {files.name}</h6>
                                                                                            <button class="file-actions1 " onClick={() => { window.open(`${API_URL}/download/${files?.name}`, "_blank"); }}><i class="fa-solid fa-download "></i> </button><button class="file-actions1" onClick={(e) => handleDeleteFile(e, files)} > <i class="fa-solid fa-trash" ></i></button>


                                                                                        </>) : (
                                                                                        <>
                                                                                            <h6 class="  file-name">    {files.message}</h6>
                                                                                            <h6 class="  file-name">    {receivemsg}</h6>



                                                                                        </>
                                                                                    )
                                                                                }
                                                                                <h6 class=" current-time">{files.current_time}</h6>
                                                                                <ToastContainer />

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </>

                                                            )





                                                        //     </div>

                                                        // </div>
                                                    }
                                                </>

                                            ))

                                        }

                                        {/* {
                                            message && message ? (<>
                                                <div class="message-heading-curruser row mx-2 " >

                                                    <div class="message-content" style={{ backgroundColor: "#8585caa1" }} >
                                                        <h6 class=" file-name">    {message}</h6>
                                                        <h6 class=" current-time mx-3" >{messagetime}</h6>
                                                    </div>

                                                </div>

                                            </>) : ("")
                                        } */}

                                    </tbody >
                                </table>

                            </div>
                            <hr></hr>
                            <div class="row input-section" >
                                <form class="input-section-form" onSubmit={handleFile} >
                                    <input class="col-6  border border-dark form-control rounded-pill " value={emptyinput} placeholder='Enter to send your message...'
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}></input>
                                    <div class="image-upload">
                                        <label for="file-input">
                                            <img class="file-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmsqLc-RP64ubnutc7LLU1XCRMKOgNeckd5rcsE7_MYCk8ZD4lHU1pw-_6K8WdVquooTg&usqp=CAU" />
                                            <i class="fa-sharp fa-solid fa-paper-plane-top"></i>
                                        </label>
                                        <label >
                                            <img class="send-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlI0j3fgmxGerTvgMS8FjPlAPEuDUVWNSzMA&usqp=CAU"></img>
                                        </label>

                                        <input id="file-input" type="file" name="file" onChange={handleFileChange} />
                                    </div>




                                    <div class=" ">
                                        <button class="btn upload-btn btn-sm" type='submit'>Upload                                    <i class="fa-solid fa-upload"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                ) : (
                    <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 border lets-chat  '  >
                        <div class="welcome-content">
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default ChatSection;
