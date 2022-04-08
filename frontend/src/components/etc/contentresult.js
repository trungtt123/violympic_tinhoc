import '../../css/create-problem.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { domain, api_url } from './constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ContentListExam from './contentlistexam';
import ContentListProblem from './contentlistproblem';

function ContentResult(props) {
    const history = useHistory();
    const arrStyleTable = [
        { "width": "10%", "textAlign": "center", "font-size": "14px" },
        { "width": "30%", "textAlign": "center", "font-size": "14px" },
        { "width": "30%", "textAlign": "center", "font-size": "14px" },
        { "width": "30%", "textAlign": "center", "font-size": "14px" }
    ];
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    var userAddress = props.userAddress;
    if (isLoggedIn === false) {
        window.location.href = domain + '/login';
    }
    const [resultTHCS, setResultTHCS] = useState();
    const [resultTHPT, setResultTHPT] = useState();
    const [totalResultTHCS, setTotalResultTHCS] = useState();
    const [totalResultTHPT, setTotalResultTHPT] = useState();
    useEffect(() => {
        fetch(api_url + '/examresult/getlistresult/' + userData.userID, {
            method: 'GET',
        }).then(response => response.json()).then(async (data) => {
            console.log(data.result);
            if (data.result.totalResultTHCS !== null) {
                setTotalResultTHCS(<>
                    Tổng điểm: {data.result.totalResultTHCS.score} <br/>
                    Tổng thời gian: {data.result.totalResultTHCS.time} phút
                    </>)
            }
            if (data.result.totalResultTHPT !== null) {
                setTotalResultTHPT(<>
                    Tổng điểm: {data.result.totalResultTHPT.score} <br/>
                    Tổng thời gian: {data.result.totalResultTHPT.time} phút
                    </>)
            }
            var elm;
            if (JSON.stringify(data.result.resultTHCS) !== JSON.stringify([])) {
                elm = data.result.resultTHCS.map((item, index) => {
                    return <tr key={index}>

                        <th style={arrStyleTable[0]}>{item?.exam?.indexExamRound}</th>
                        <td style={arrStyleTable[1]}>{item?.examresult?.score}</td>
                        <td style={arrStyleTable[2]}>{item?.examresult?.time} phút</td>
                        <td style={arrStyleTable[3]}>{item?.examresult?.numberOfSubmission}</td>
                    </tr>
                });
                setResultTHCS(elm);
            }
            if (JSON.stringify(data.result.resultTHPT) !== JSON.stringify([])) {
                elm = data.result.resultTHPT.map((item, index) => {
                    return <tr key={index}>

                        <th style={arrStyleTable[0]}>{item.exam.indexExamRound}</th>
                        <td style={arrStyleTable[1]}>{item.examresult.score}</td>
                        <td style={arrStyleTable[2]}>{item.examresult.time} phút</td>
                        <td style={arrStyleTable[3]}>{item.examresult.numberOfSubmission}</td>
                    </tr>
                });
                setResultTHPT(elm);
            }
        })
    }, []);
    return (
        <>
            <div className="row ml-3 mr-3 mt-4">
                <div className="w-50" >
                    <div className="row ml-1">
                        <i className="fas fa-user-graduate fa-3x" style={{ width: "10%" }}></i>
                        <div className="w-80">
                            <h5 className="text-info">{userData.infomation.fullName}</h5>
                            <div className="mb-2" style={{ fontSize: "15px" }}>Trường {userAddress.schoolName}</div>
                            <div style={{ fontSize: "15px" }}>ID: {userData.userID}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ fontSize: "14px",marginTop: "100px", display: (resultTHCS === undefined) ? "none" : undefined }}>

                <div className="row ml-4 mr-4">
                    <b className="mb-2">Khối THCS</b>
                    <table className="table table-sm table-bordered table-hover">
                        <thead>
                            <tr>

                                <th style={arrStyleTable[0]}>Vòng thi</th>
                                <th style={arrStyleTable[1]}>Kết quả</th>
                                <th style={arrStyleTable[2]}>Thời gian</th>
                                <th style={arrStyleTable[3]}>Số lần nộp bài</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultTHCS}
                        </tbody>
                    </table>
                    {totalResultTHCS}
                </div>
            </div>
            <div style={{ fontSize: "14px", marginTop: "100px", display: (resultTHPT === undefined) ? "none" : undefined }}>

                <div className="row ml-1 mr-1">
                    <b className="mb-2">Khối THPT</b>
                    <table className="table table-sm table-bordered">
                        <thead>
                            <tr>

                                <th style={arrStyleTable[0]}>Vòng thi</th>
                                <th style={arrStyleTable[1]}>Kết quả</th>
                                <th style={arrStyleTable[2]}>Thời gian</th>
                                <th style={arrStyleTable[3]}>Số lần nộp bài</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultTHPT}
                        </tbody>
                    </table>
                    {totalResultTHPT}
                </div>
            </div>

        </>
    );

}
export default ContentResult;