import React, { useEffect,useState } from "react";
import "./style.css";

function Home() {
  const [user, setUser] = useState({})
  useEffect(() => {
    const id = localStorage.getItem("id");
    fetch(`http://localhost:4000/read/${id}`)
    .then(res => res.json())
    .then((response) => {setUser(response)});
  },[]);
  return (
    <div className="home_wrapper">
      <h1>USUARIO</h1>
          <div>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
          </div>
    </div>
  );
}

export default Home;
