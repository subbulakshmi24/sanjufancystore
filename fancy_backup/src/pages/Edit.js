import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
const Edit = () => {
    const{id}=useParams();
    console.log(id," data from")
    const [productsItems,setproductsItems]=useState ({

    })
    useEffect(()=>{
     fetch('http://localhost:7001/getone/${id}')
       .then((res)=>res.json())
       .then((data)=>setproductsItems(data))
      },)
    const handleUpdate=(event)=>{
    event.preventDefault();
        const form=event.target;
        const name=form.name.value;
        const email=form.email.value;
        const message=form.message.value;
        


        const passdata={name,email,message};

    fetch('http://localhost:7001/edit/${id}',{
        method:"PATCH",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(passdata),
        })
        .then((res)=>res.json())
        .then((data)=>{
        toast.warn("successfully updated");
        window.location.href="/update";
        })
    } 
 
 return (
    <div>
      <ToastContainer />
     <div class="card-body upload5">
            <form onSubmit={handleUpdate} >
            <h2>Update</h2>
            <div class="upload0" >
                <label><b>Name</b></label>
                <input type="text" name="name" className='ms-3' defaultValue={productsItems.name}/>
            </div>
            <div class="upload1">
                <label ><b>Email</b></label>
                <input type='number' name="email" className='ms-3' defaultValue={productsItems.tableNo}/>
                </div>
                <div class="upload2">
                <label ><b>Message</b></label>
                <input type='text' name="message" className='ms-3' defaultValue={productsItems.dish}/>
                </div>
                
             
            <div class="upload7">
                <button type="submit" class="btn btn-primary">update</button>
                
            </div>
        </form>
        </div>
   </div>
  )
}


export default Edit