import React ,{useState,useEffect}from 'react'
import App from './App'


export default function Login() {
     const [login, setLogin] = React.useState(false)
     const [admin,setAdmin] = React.useState({
         'username':'',
         'password' :''
     })
     const gettingValue = JSON.parse(localStorage.getItem('MJADM')) 
     useEffect(() => {


        
        console.log(gettingValue)
        if(gettingValue !== null){
            setLogin(true)
        }
       
       
        
     }, [login])
    const user = 'astro'
    const pass = 'astro@123'

    const handleChange = ((e)=>{
        const{name,value} = e.target
        setAdmin({... admin,[name]:value})
        console.log(name,'%%%%%%%%%%%%%%%%',value)
    })


    const submiting = (()=>{
        if(admin.username === user && admin.password === pass){
            localStorage.setItem('MJADM',JSON.stringify(admin))
             setLogin(true)
           
            
        }
        else{
            alert('login fail')   
            
        }
      
    })
    return (


login ? <App/>: <div >
    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" onChange = {handleChange}/><br/>

    <label for="password"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="password" onChange = {handleChange}/><br/>

    <button type="submit" onClick = {submiting}>Login</button>
   
  </div>


    )
}
