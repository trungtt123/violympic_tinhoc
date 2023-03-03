import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { api_url } from './constants';
import '../../css/submit-problem.css'
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import socketIOClient from "socket.io-client";
import socket from 'socket.io-client/lib/socket';
require('codemirror/lib/codemirror.css');
export default function SubmitReport(props) {
    var isReported = props.isReported;
    var problem = props.problem;
    var userData = props.userData;
    var exam = props.exam;
    const history = useHistory();
    const ENDPOINT = api_url;
    const [textReport, setTextReport] = useState();
    const handleSendReport = () => {
        const socket = socketIOClient(ENDPOINT);
        if (textReport === "" || textReport === undefined) {
            alert("Không được để trống mô tả lỗi");
            return;
        }
        socket.emit("reportExam", { userID: userData.userID, exam, problemName: problem.problemName, message: textReport });
        props.callBackCancelReport();
    }
    if (isReported) {
        return (
            <>
                <NotificationContainer />
                <div className="submit-problem">
                    <div className="container">
                        <div className="text-center text-danger mb-2">
                            <h4>Báo cáo lỗi bài {problem.problemName}</h4>
                        </div>
                        <div className="mt-3"style={{width: "600px", margin:"auto"}}>
                        <textarea style={{width: "600px", height: "300px", maxWidth: "600px", maxHeight: "300px"}} 
                        placeholder="Mô tả chi tiết về lỗi bạn đã phát hiện..."
                        onChange={(e) => setTextReport(e.target.value)}>
                            
                        </textarea></div>

                        <div className="btn-control">
                            <button className="btn btn-info mr-1" onClick={() => handleSendReport()}>Gửi</button>
                            <button className="btn btn-danger" onClick={() => { props.callBackCancelReport() }}>Hủy</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else return <></>

};
