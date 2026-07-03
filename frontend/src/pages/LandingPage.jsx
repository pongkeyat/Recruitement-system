import React from "react";
import Header from "../components/Headers";

export default function LandingPage () {
     const userToken = localStorage.getItem("token");


     return(
        <div>
             <Header isLoggedIn={!userToken} />
        </div>
     )
}