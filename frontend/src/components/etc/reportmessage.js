import '../../css/login.css';
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { api_url, domain } from './constants';
import socketIOClient from 'socket.io-client';
function ReportMessage(props) {
    var isLoggedIn = props.isLoggedIn;
    const userData = props.userData;
    const [elmExam, setElmExam] = useState();
    const history = useHistory();
    const ENDPOINT = api_url;
    const arrStyleTable = [
        { "width": "10%", "textAlign": "center", "font-size": "14px" },
        { "width": "50%", "textAlign": "center", "font-size": "14px" },
        { "width": "20%", "textAlign": "center", "font-size": "14px" },
        { "width": "20%", "textAlign": "center", "font-size": "14px" },
    ];
    const handleReceiveReport = (data) =>{
        const examID = data.examID;
        const messageCnt = data.messageReport.messageReport.length;
        document.getElementById("exam-" + examID).innerHTML = messageCnt;
    }
    const handleSeeMoreReport = (examID) => {
        history.push('/report-message/' + examID);
    }
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('createdUserReceiveReport', (data) => {
            handleReceiveReport(data);
        });
        fetch(api_url + '/exam/getallexam/' + userData.userID, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(async data => {
                var listExam = data.result;
                var listReport = [];
                for (var i = 0; i < listExam.length; i++) {

                    var dataExam = await fetch(api_url + '/exam/getexamforexamier/' + listExam[i]._id, {
                        method: 'GET',
                    }).then(response => response.json());
                    listReport.push(dataExam);
                    socket.emit("reportExam", { userID: userData.userID, exam: dataExam.result, message: '' });
                }
                
                var tmpElm = data.result.map((item, index) => {
                    var elmID = "exam-" + item._id;
                    return <tr key={index} >
                        <th  style={arrStyleTable[0]}>{index + 1}</th>
                        <td style={arrStyleTable[1]}>{item.examName}</td>
                        <td style={arrStyleTable[2]} id={elmID}>{listReport[index].result.messageReportExam.messageReport.length}</td>
                        <td style={arrStyleTable[3]}>
                            <button className="btn btn-sm btn-success" onClick={() => handleSeeMoreReport(item._id)}>Xem chi tiết</button>
                        </td>
                    </tr>
                });
                setElmExam(tmpElm);
            })



    }, []);
    
    return (
        <>
            <div className="row mt-3" style={{ width: "60%", margin: "auto" }}  >
                <table className="table table-sm table-bordered" >
                    <thead>
                        <tr>
                            <th style={arrStyleTable[0]}>STT</th>
                            <th style={arrStyleTable[1]}>Tên kì thi</th>
                            <th style={arrStyleTable[2]}>Số lượt báo cáo</th>
                            <th style={arrStyleTable[3]}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elmExam}

                    </tbody>
                </table>
            </div>
        </>)
}
export default ReportMessage;