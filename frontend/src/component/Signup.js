import React, { useState } from 'react'
import ApiService from '../middleware/ApiService';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';


export const Signup = () => {
  const [mailExist,setMailExist]=useState();
  const navigate=useNavigate();

const handleSubmit=(event)=>{
  event.preventDefault();
  var {username,pass,nm}=document.forms[0];
  let payload={
    name:nm.value,
    email:username.value,
    password:pass.value
  };
  ApiService.post("/signup",payload,null,(res,err)=>{
    if(res!==null){
      console.log(res.msg,"api res");
      console.log(res.user,"res user");
      setMailExist(res.msg)
      if(res.user){
        Swal.fire(
          'Successfully registered Now you can login!',
          'first verify your mail!',
          'success'
        )
        navigate("/")


      }


    }
    else{
      console.log(err);
    }
  })
}

  return (
    <>
    {/* <div className='Main-container container'> */}
    <section class="vh-100 bg-image container-fluid bg-info"     style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');"}}
>
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" 
        //   style="border-radius: 15px;"
          >
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Create an account</h2>

              <form onSubmit={handleSubmit}>

                <div class="form-outline mb-4">
                <label class="form-label" for="form3Example1cg">Your Name</label>
                  <input type="text" id="form3Example1cg" name="nm"  class="form-control form-control-lg" required />
                </div>

                <div class="form-outline mb-4">
                <label class="form-label" for="form3Example3cg">Your Email</label>
                  <input type="email" id="form3Example3cg"name='username' class="form-control form-control-lg" required />
                  <p className='text-danger'>{mailExist}</p>
                </div>

                <div class="form-outline mb-4">
                <label class="form-label" for="form3Example4cg">Password</label>
                  <input type="password" id="form3Example4cg"  name="pass" class="form-control form-control-lg" required />
                </div>

               


                <div class="d-flex justify-content-center">
                  <button type="submit"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="\"
                    class="fw-bold text-body"><u>Login here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    {/* </div> */}
    </>
  )
}
