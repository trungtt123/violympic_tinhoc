import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { api_url } from './constants';
function ContentRankSchool(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    const history = useHistory();
    const arrStyleTable = [
        { "width": "10%", "textAlign": "center", "font-size": "14px" },
        { "width": "20%", "textAlign": "center", "font-size": "14px" },
        { "width": "20%", "textAlign": "center", "font-size": "14px" },
        { "width": "20%", "textAlign": "center", "font-size": "14px" },
        { "width": "20%", "textAlign": "center", "font-size": "14px" }
    ];
    const [elmTHCS, setElmTHCS] = useState();
    const [elmTHPT, setElmTHPT] = useState();
    useEffect(() => {

        window.scrollTo(0, 0);
        const schoolID = window.location.pathname.split('/')[4].split('-')[1];


        fetch(api_url + '/school/getalluseroftheschool/' + schoolID, {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                var listUserTHCS = data.users.filter(user => user.thcs !== '-');
                var listUserTHPT = data.users.filter(user => user.thpt !== '-');
                if (listUserTHCS !== undefined && listUserTHCS !== null) {
                    var cntTHCS = 0;
                    listUserTHCS.sort((A, B) =>{
                        
                        if (Number (A.totalResultTHCS.score) < Number (B.totalResultTHCS.score)) return 1;
                        else {
                            if (Number (A.totalResultTHCS.score) === Number (B.totalResultTHCS.score)){
                                if (Number(A.totalResultTHCS.time) > Number(B.totalResultTHCS.time)) return 1;
                                else return -1;
                            }
                            else return -1
                        }
                    });
                    console.log(listUserTHPT);
                    var elmTmpTHCS = listUserTHCS.map((user, index) => {
                        if (user.thcs !== '-')
                            return <tr key={index}>
                                <td style={arrStyleTable[0]}>{++cntTHCS}</td>
                                <td style={arrStyleTable[1]} className="cursor-pointer" onClick={()=>history.push('/user-info/'+ user.userID)}>{user.fullName}</td>
                                <td style={arrStyleTable[2]} >{user.thcs}</td>
                                <td style={arrStyleTable[3]}>{user.totalResultTHCS.score}</td>
                                <td style={arrStyleTable[4]}>{user.totalResultTHCS.time} phút</td>
                            </tr>
                    })
                }
                setElmTHCS(elmTmpTHCS);
                if (listUserTHPT !== undefined && listUserTHPT !== null) {
                    var cntTHPT = 0;
                    listUserTHPT.sort((A, B) =>{
                        
                        if (Number (A.totalResultTHPT.score) < Number (B.totalResultTHPT.score)) return 1;
                        else {
                            if (Number (A.totalResultTHPT.score) === Number (B.totalResultTHPT.score)){
                                if (Number(A.totalResultTHPT.time) > Number(B.totalResultTHPT.time)) return 1;
                                else return -1;
                            }
                            else return -1
                        }
                    });
                    console.log(listUserTHPT);
                    var elmTmpTHPT = listUserTHPT.map((user, index) => {
                        if (user.thpt !== '-')
                            return <tr key={index}>
                                <td style={arrStyleTable[0]}>{++cntTHPT}</td>
                                <td style={arrStyleTable[1]} className="cursor-pointer" onClick={()=>history.push('/user-info/'+ user.userID)}>{user.fullName}</td>
                                <td style={arrStyleTable[2]} >{user.thpt}</td>
                                <td style={arrStyleTable[3]}>{user.totalResultTHPT.score}</td>
                                <td style={arrStyleTable[4]}>{user.totalResultTHPT.time} phút</td>
                            </tr>
                    });
                }
                setElmTHPT(elmTmpTHPT);
            });
    }, [])
    return (
        <>

            <div className="row ml-4 mr-4">

                <div style={{ fontSize: "14px", marginTop: "100px", width: "50%" }}>
                    <b>Khối THCS</b>

                    <table className="table table-sm table-bordered mt-3">
                        <thead>
                            <tr>

                                <th style={arrStyleTable[0]}>STT</th>
                                <th style={arrStyleTable[1]}>Tên thí sinh</th>
                                <th style={arrStyleTable[2]}>Vòng thi</th>
                                <th style={arrStyleTable[3]}>Tổng điểm</th>
                                <th style={arrStyleTable[4]}>Tổng thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elmTHCS}
                        </tbody>
                    </table>


                </div>
                <div style={{marginTop: "90px"}}>
                    <img src="/assets/img/bg-rank.png" style={{marginLeft: '40%', width: '400px'}}>
                    </img>
                </div>
            </div>
            
            <div className="row ml-4">
                <div style={{ fontSize: "14px", marginTop: "100px", width: "50%" }}>
                    <b>Khối THPT</b>

                    <table className="table table-sm table-bordered mt-3">
                        <thead>
                            <tr>

                                <th style={arrStyleTable[0]}>STT</th>
                                <th style={arrStyleTable[1]}>Tên thí sinh</th>
                                <th style={arrStyleTable[2]}>Vòng thi</th>
                                <th style={arrStyleTable[3]}>Tổng điểm</th>
                                <th style={arrStyleTable[4]}>Tổng thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elmTHPT}
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    );
}
export default ContentRankSchool;