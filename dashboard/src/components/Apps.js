import React from "react";
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Apps = () => {
  return(
    <>
    {/* <h1 style={{color:"black", textAlign:"center",fontSize:"50px" }}>Stockora</h1> */}
    <img src="assets/Stockoralogo.svg" style={{ width: "1000px" }} />
    <p style={{color:"black", textAlign:"center",fontSize:"20px" }}>visit Stockora at... <br/>
    <InstagramIcon/> &nbsp; <FacebookIcon/>&nbsp; <XIcon/> </p>
    </>
  )  
};

export default Apps;
