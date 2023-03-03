import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import {api_url} from './constants';
function ContentRankDistrict(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    const arrStyleTable = [
        { "width": "10%", "textAlign": "center", "font-size": "14px" },
        { "width": "40%", "textAlign": "center", "font-size": "14px" },
        { "width": "25%", "textAlign": "center", "font-size": "14px" },
        { "width": "25%", "textAlign": "center", "font-size": "14px" }
    ];
    const [elmProvince, setElmProvince] = useState();
    const history = useHistory();
    useEffect(() => {
        
        window.scrollTo(0,0);
        const districtID = window.location.pathname.split('/')[3].split('-')[1];
       

        fetch(api_url + '/school/getallschool/' + districtID, {
            method: 'GET',
        })  .then(response => response.json())
            .then( async data => {
                var listSchool = data.listSchool;
                const userList = await fetch(api_url + '/examresult/getlistuserinschool', {
                    method: 'POST',
                    headers: {

                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(listSchool)
                }).then(response => response.json());

                console.log(userList);
                if (listSchool !== undefined && listSchool !== null)
                var elm = listSchool.map((school, index)=>{
                    return <tr key={index}>
                    <td style={arrStyleTable[0]}>{index+1}</td>
                    <td style={arrStyleTable[1]} 
                    onClick={()=>history.push(window.location.pathname + '/school-' + school._id)}
                    className="cursor-pointer">{school.SchoolName}</td>
                    <td style={arrStyleTable[2]}>{userList.result[index].thcsCnt}</td>
                    <td style={arrStyleTable[3]}>{userList.result[index].thptCnt}</td>
                </tr>
                })
                setElmProvince(elm);
            });
    }, [])
    return (
        <>
            <div className="row ml-4 mr-4">
                <div style={{ fontSize: "14px", marginTop: "100px", width: "50%" }}>


                    <table className="table table-sm table-bordered">
                        <thead>
                            <tr>

                                <th style={arrStyleTable[0]}>STT</th>
                                <th style={arrStyleTable[1]}>Trường/Trung tâm</th>
                                <th style={arrStyleTable[2]}>THCS</th>
                                <th style={arrStyleTable[3]}>THPT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elmProvince}
                        </tbody>
                    </table>


                </div>
                
                <div style={{marginTop: "90px"}}>
                    <img src="/assets/img/bg-rank.png" style={{marginLeft: '40%', width: '400px'}}>
                    </img>
                </div>
            </div>
        </>
    );
}
export default ContentRankDistrict;