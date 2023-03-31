import React, { useState } from "react"

export default function Welcome() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")



  function handleSignUp() {
    if( username&&password ){
    fetch("https://foofiesta-server.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    })
   
    .then(response => {
      if (response.status === 201) {
        console.log('success')
        const msg = document.querySelector('#msg')
        msg.innerText = 'Success! Please login now'
      }
      return response.text()
    })

    .then(()=>{
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);

    })
    .then(responseText => {
      console.log(responseText)
    })
    .catch(error => {
      console.error(error)
    })
  }else{
      window.alert('You must provide a valid Name and Password')
        
  }
  }
    
    


 
  
  

  return (
    
    <div className="welcome">
      <div className="welcome-cont">
      <div id="msg"></div>
      <span className="food">Food</span>
      <span className="fiesta">Fiesta</span>
      <p>Welcome to Food Fiesta! Create and save your favourite recipes!</p>
      <h2>Create Your Account</h2>
      <label htmlFor="user">Enter your name</label>
      <br />
      <input
        id="user"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <div className="password">
        <label htmlFor="password">Enter Password</label>
        <br />
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
      </div>
      <button type="button" onClick={handleSignUp}>
        Sign Up
      </button>
      <p>Already have an account? Please Sign In.</p>
      <button onClick={()=>window.location.href = '/login'}>Sign In</button>
      <div className="hero"></div>
    </div>
    </div>
  );
}
