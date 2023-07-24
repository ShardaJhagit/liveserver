import React from "react";
import { useState } from "react";
function Clk(){
    let time=new Date().toLocaleTimeString();
    const [currenttime,settime]= useState(time);

    const updatetime=()=>{
        let time=new Date().toLocaleTimeString();
        settime(time);
       
    }
    setInterval(updatetime,1000)
    return(
        currenttime
    )
}
export default Clk