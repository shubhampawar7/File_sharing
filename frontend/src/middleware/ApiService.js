import axios from 'axios';
import { API_URL } from '../config/config';


let ApiService={


   get:(url,payload,header,callback)=>{
    axios.get(API_URL+url,payload,header)
    .then((responseData)=>{
        if(responseData){
            callback && callback (responseData.data,null)
        }
    })
   },

    post:(url,data,headers,callback)=>{
        axios.post(API_URL+url,data,{
            headers: (headers===null || Object.keys(headers).length===0)
                    ?{}:{Authorization:`${headers.Token}`}
        })
        .then((responseData)=>{
            callback && callback(responseData.data,null,data);
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }

}

export default ApiService;