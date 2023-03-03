import React, { useState, useEffect, useRef } from 'react';
import {api_url} from './constants';
function ContentHome(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    var userAddress = props.userAddress;
    if (isLoggedIn === undefined || isLoggedIn === false) {
        return (

            <div className="row ml-1 mr-1">
            <img  style={{width:"500px",height: '350px', margin:"auto", marginTop:"50px"}}
                src="./assets/img/bg-home.png"/> 
            </div>
      

        );
    }
    else {
        return <>
            <div className="row ml-1 mr-1">
            <img s style={{width:"500px",height: "350px", margin:"auto", marginTop:"50px", }}
                src="./assets/img/bg-home.png"/>  
            </div>
            <div className="mb-5 mt-4">
                
                <a href="/exam-round">
                    <button className="btn btn-outline-info btn-sm my-2 my-sm-0 ml-4">Vào thi</button>
                </a>
                <a href="/practice">
                    <button className="btn btn-outline-info btn-sm my-2 my-sm-0 ml-2">Luyện tập</button>
                </a>
            </div>
        </>
    }
}
export default ContentHome;