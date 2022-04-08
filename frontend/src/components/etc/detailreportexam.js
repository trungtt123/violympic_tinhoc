import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {api_url} from './constants';




function DetailReportExam(props) {
    const [elmReport, setElmReport] = useState();

    useEffect(async()=>{
        const examID = window.location.pathname.split('/')[2];
        var data = await fetch(api_url + '/exam/getexamforexamier/' + examID, {
            method: 'GET',
        }).then(response => response.json());
        const messageReport = data.result.messageReportExam.messageReport;

        var elmTmp = messageReport.map((message, index)=>{
            return <li key={index} className="mt-3">
                <b>Báo lỗi bài {message.problemName}</b> <br/>
                {message.message} (by {message.userID})
            </li>
        });
        setElmReport(elmTmp);
    },[])
    return (
        <>
        <div className="row mt-5">
            <div style={{width: "50%", margin:"auto"}}>
            <h5 className="text-center">Chi tiết báo lỗi</h5>
            {elmReport}
            </div>
        </div>
    </>)
}
export default DetailReportExam;