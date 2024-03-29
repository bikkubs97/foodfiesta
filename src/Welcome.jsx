import React, { useState } from "react";

export default function Welcome() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSignUp() {
    if (username.length < 5 || password.length < 8) {
      setMessage(
        "Username must be at least 5 characters long, and password must be at least 8 characters long."
      );
      return;
    }

    setMessage("Please Wait..."); // Set "Please Wait" message before making the API call

    fetch("https://foofiesta-server-j46h.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("success");
          setMessage("Success! Please login now.");
        }
        return response.text();
      })
      .then(() => {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .then((responseText) => {
        console.log(responseText);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="welcome">
      <div className="welcome-cont">
        <div id="msg">{message}</div>
        <span className="food">Food</span>
        <span className="fiesta">Fiesta</span>
        <p>Welcome to Food Fiesta! Create and save your favorite recipes!</p>
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
        <button onClick={() => (window.location.href = "/login")}>
          Sign In
        </button>
        <div className="hero"></div>
      </div>
    </div>
  );
}
