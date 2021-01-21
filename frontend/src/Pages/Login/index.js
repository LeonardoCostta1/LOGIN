import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { validatedUser } from "../../Store/Action";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [visible, setvisible] = useState("password");
  const [icon, setIcon] = useState("far fa-eye-slash");
  const [toggle, setToggle] = useState(1);
  let history = useHistory();
  const dispatchValidate = useDispatch();

  const [resposta, setResposta] = useState("");

  async function auth(callback) {
    await axios
      .post("http://localhost:4000/login", {
        email: email,
        pass: pass,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        setResposta(response.data.err)
        callback();
        setTimeout(()=>{
          setResposta("")
        },3000)
      })
      .catch(function (error) {
        localStorage.setItem("id", "");
        localStorage.setItem("token", "");
        return console.log(error);
      });
  }

  async function validateToken() {
    await axios
      .get("http://localhost:4000/logged", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        localStorage.setItem("id", response.data.user._id);
        console.log(response);
        dispatchValidate(validatedUser(true));
        return history.push("/app");
      })
      .catch((err) => {
        dispatchValidate(validatedUser(false));
        localStorage.setItem("id", "");
        localStorage.setItem("token", "");
        return history.push("/");
      });
  }
  function logar() {
 const validEmail = email.indexOf('@') > -1;

 const dotcom = email.indexOf('.com') > -1;
 
    if(validEmail === false){
      setResposta(`insira '@' apos ' ${email} ' no seu email`)
    setTimeout(()=>{
      setResposta("")
    },3000)
    return
    }

    if(dotcom === false){
      setResposta(`seu email ' ${email} ' está incompleto`)
    setTimeout(()=>{
      setResposta("")
    },3000)
    return
    }


    if(email === ''){
      setResposta("digite seu email")
     setTimeout(()=>{
      setResposta("")
    },3000)
    return
    }

    if(pass === ''){
      
       setResposta("digite sua senha")

      setTimeout(()=>{
        setResposta("")
      },3000)
      return
     }
    auth(validateToken);
  }

  function passView() {
    if (toggle === 1) {
      setvisible("text");
      setIcon("far fa-eye");
      setToggle(0);
    } else {
      setvisible("password");
      setIcon("far fa-eye-slash");
      setToggle(1);
    }
  }
  return (
    <div className="login_wrapper">
      <div className="login_container">
        <div className="login">
          <div className="title_wrapper">
            Hello,
            <br />
            Wellcome Back
          </div>

          <div className="input-container">
            <input
              placeholder="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="icon_container">
              <i className="far fa-user"></i>
            </div>
          </div>

          <div className="input-container">
            <input
              placeholder="password"
              type={visible}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <div className="icon_container pass" onClick={() => passView()}>
              <i className={icon}></i>
            </div>
          </div>
          <button onClick={() => logar()}>sign in</button>
          <div className="resposta">{resposta}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
