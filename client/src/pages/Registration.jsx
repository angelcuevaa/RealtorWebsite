import React, { useEffect, useState, useContext } from "react";
import {
  useNavigate,
} from "react-router-dom";
import Axios from "axios";
import "./App.css";
// import Main from "./Main";
import { UserContext } from "../user.context";

export default function Registration() {
  const navigate = useNavigate();
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [userFound, setUserFound] = useState(false);

  const userData = useContext(UserContext);

  const { user, setUser } = userData;

  console.log(user);
  const [loginStatus, setLoginStatus] = useState("");

  console.log("Login Status: ", loginStatus);

  Axios.defaults.withCredentials = true;

  const register = (e) => {
    e.preventDefault();
    try {
      Axios.post("http://localhost:3200/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      setUser(response.data);
      if(response.data.duplicate){
        setIsDuplicate(true);
      } else {
        setIsDuplicate(false);
        navigate("/");
      }
    });
    } catch (error) {
      setUser(null)
    }
    
  };

  const login = (e) => {
    e.preventDefault();
    try {
      Axios.post("http://localhost:3200/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response.data);
      if(response.data == "Wrong username or password"){
        setIsWrong(true);
        setUser(null);
      }
      setUser(response.data);
      if(response.data.role === "admin"){
        setIsLogin(true);
        navigate("/admin");
      } else {
        setIsLogin(true);
        navigate("/");
      }
    });
    } catch (error) {
      setUser(null);
      console.log(error);
    }
    
  };

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].username);
  //     }
  //   });
  // }, []);

  return (
    <div className="App">
      <div className="registration">
        <h6 style={{color: "white", marginTop: "20px"}}>{
          isDuplicate ? "Username already exists" : ""
          }</h6>
        <h1>Registration</h1>
        <form onSubmit={register}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
          required
          style={{padding: "10px", marginTop: "10px"}}

        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
          required
          style={{padding: "10px", marginTop: "10px"}}

        />
        <br />
        
        <button type="submit"  style={{padding: "10px 40px", marginTop: "10px"}}> Register </button>
      </form>

      </div>

      <br />
      <div className="login">
        <h1>Login</h1>
        <p>{
            isWrong ? "Wrong username or password" : ""
          }</p>
        <p>{
            userFound ? "User not found" : ""
          }</p>
        <form onSubmit={login}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
          style={{padding: "10px", marginTop: "10px"}}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          style={{padding: "10px", marginTop: "10px"}}

        />
        <br />

        <button type="submit" style={{padding: "10px 40px", marginTop: "10px", marginBottom: "20px"}}> Login </button>
          </form>
      </div>
    </div>
  );
}
