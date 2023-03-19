import React from "react"
import { useState } from "react"


export default function Register() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSignIn(event) {
    event.preventDefault()
    fetch("https://foofiesta-server.onrender.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 202) {
          console.log("success")
          return response.json()
        } else {
          throw new Error("Authentication failed")
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token)
        const msg = document.querySelector("#msg")
        msg.innerText = "Login Successful!"
        setTimeout(() => {
          window.location.href = "/account"
        }, 1000);
      })
      .catch((error) => {
        console.error(error)
        msg.innerText = "Incorrect username or password!"
      })
  }
  


  return ( <div className="login">
    <div className="heading">
   
    <span className="food">Food</span>
      <span className="fiesta">Fiesta</span>
      </div>
      <p>Welcome to Food Fiesta! Create and save your favourite recipes!</p>
    <h4 className="sign">Sign In</h4>
    <form className="login-form" onSubmit={handleSignIn}>
    <label htmlFor="name">Name</label>
    <div>
    <input id="name" 
         required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      </div>
      <div>
    <label htmlFor="password" >Password</label><br/>
    <input type="password" id="password"
     required
     value={password}
     onChange={(e) => setPassword(e.target.value)}
    />
    </div>
    <button className="green" type="submit" >Sign in</button>
    </form>
    <div className="hero">
      </div>

    <div id="msg"></div>
  </div>)
}