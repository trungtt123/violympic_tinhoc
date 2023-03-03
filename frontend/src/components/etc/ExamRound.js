import '../../css/create-problem.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { domain, api_url } from './constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ContentListExam from './ContentListExam';
import ContentListProblem from './ContentListProblem';

function ExamRound(props) {
    const history = useHistory();
    const [elmThptExamRound, setElmThptExamRound] = useState();
    const [elmThcsExamRound, setElmThcsExamRound] = useState();
    const arrStyleTable = [
        { "width": "20%", "textAlign": "center", "font-size": "14px" },
        { "width": "35%", "textAlign": "center", "font-size": "14px" },
        { "width": "35%", "textAlign": "center", "font-size": "14px" },
        { "width": "10%", "textAlign": "center", "font-size": "14px" },
    ];
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    var userAddress = props.userAddress;
    if (isLoggedIn === false) {
        window.location.href = domain + '/login';
    }
    const handleOpenTimeExam = (exam) => {
        const time = exam.examOpenTime;
        if (!exam.isPublished) return 'Thời gian mở: ' + time.day + "/" + time.month + "/" + time.year;
        const curDay = new Date();
        const year = Number(time.year);
        const month = Number(time.month);
        const day = Number(time.day);

        if (year > curDay.getFullYear()) {
            return 'Thời gian mở: ' + (Number (time.day) < 10 ? '0' + Number (time.day) : Number (time.day)) + 
            "/" + (Number (time.month) < 10 ? '0' + Number (time.month) : Number (time.month)) + "/" + time.year;
        }
        else {
            if (month > curDay.getUTCMonth() + 1) {
                return 'Thời gian mở: ' + (Number (time.day) < 10 ? '0' + Number (time.day) : Number (time.day)) + 
                "/" + (Number (time.month) < 10 ? '0' + Number (time.month) : Number (time.month)) + "/" + time.year;
            }
            else {
                if (day > curDay.getUTCDate()) {

                    return 'Thời gian mở: ' + (Number (time.day) < 10 ? '0' + Number (time.day) : Number (time.day)) + 
                    "/" + (Number (time.month) < 10 ? '0' + Number (time.month) : Number (time.month)) + "/" + time.year;
                }
                else return "Đã mở"
            }
        }
    }
    useEffect(() => {
        fetch(api_url + '/exam/getcurrentexam/' + userData.userID, {
            method: 'GET',
        }).then(response => response.json()).then((data) => {
            if (data.result !== undefined && data.result !== null) {
                const currentExamRound = data.result;
                console.log(currentExamRound);
                if (currentExamRound !== undefined) {

                    if (currentExamRound.thcs !== null) {
                        const currentRound = currentExamRound.thcsExamLevel.indexExamRound;
                        const timeCurrentRound = handleOpenTimeExam(currentExamRound.thcsExamLevel);
                        const timeMyRound = handleOpenTimeExam(currentExamRound.thcs);
                        const myRound = currentExamRound.thcs.indexExamRound;
                        
                        setElmThcsExamRound(<tr>
                            <th style={arrStyleTable[0]}>THCS</th>
                            <td style={arrStyleTable[1]}>Vòng {currentRound} <br />
                                {timeCurrentRound}</td>
                            <td style={arrStyleTable[2]}>Vòng {myRound}<br />{timeMyRound}</td>
                            <td style={arrStyleTable[3]}>
                                <button className="btn btn-sm btn-success"
                                    disabled={(timeMyRound === "Đã mở" && currentExamRound.thcs.isPublished) ? false : true}
                                    onClick={() => history.push({
                                        pathname: '/exam/' + currentExamRound.thcs._id,
                                        state: { exam: currentExamRound.thcs }
                                    })}
                                >Vào thi</button>
                            </td>
                        </tr>);
                    }
                    else {
                        if (userData.infomation.examLevel !== 2) {
                            
                            const currentRound = (currentExamRound.thcsExamLevel === null) ? 0 : currentExamRound.thcsExamLevel.indexExamRound;
                            const timeCurrentRound = (currentExamRound.thcsExamLevel === null) ? 'Vòng thi không tồn tại' : handleOpenTimeExam(currentExamRound.thcsExamLevel);
                            const timeMyRound = 'Vòng thi không tồn tại';
                            const myRound = (currentExamRound.thcsExamLevel === null) ? 0 : currentExamRound.thcsExamLevel.indexExamRound + 1;





                            setElmThcsExamRound(<tr>
                                <th style={arrStyleTable[0]}>THCS</th>
                                <td style={arrStyleTable[1]}>Vòng {currentRound} <br />
                                    {timeCurrentRound}</td>
                                <td style={arrStyleTable[2]}>Vòng {myRound}<br />{timeMyRound}</td>
                                <td style={arrStyleTable[3]}>
                                    <button className="btn btn-sm btn-success"
                                        disabled={(timeMyRound === "Đã mở" && currentExamRound.thcs.isPublished) ? false : true}
                                        onClick={() => history.push({
                                            pathname: '/exam/' + currentExamRound.thcs._id,
                                            state: { exam: currentExamRound.thcs }
                                        })}
                                    >Vào thi</button>
                                </td>
                            </tr>);
                        }
                    }
                    if (currentExamRound.thpt !== null) {
                        const currentRound = currentExamRound.thptExamLevel.indexExamRound;
                        const timeCurrentRound = handleOpenTimeExam(currentExamRound.thptExamLevel);
                        const timeMyRound = handleOpenTimeExam(currentExamRound.thpt);
                        const myRound = currentExamRound.thpt.indexExamRound;
                        setElmThptExamRound(<tr>
                            <th style={arrStyleTable[0]}>THPT</th>
                            <td style={arrStyleTable[1]}>Vòng {currentRound} <br />
                                {timeCurrentRound}</td>
                            <td style={arrStyleTable[2]}>Vòng {myRound}<br />{timeMyRound}</td>
                            <td style={arrStyleTable[3]}>
                                <button className="btn btn-sm btn-success"
                                    disabled={(timeMyRound === "Đã mở" && currentExamRound.thpt.isPublished) ? false : true}
                                    onClick={() => history.push({
                                        pathname: '/exam/' + currentExamRound.thpt._id,
                                        state: { exam: currentExamRound.thpt }
                                    })}
                                >Vào thi</button>
                            </td>

                        </tr>);
                    }
                    else {
                        if (userData.infomation.examLevel !== 1) {
                            const currentRound = (currentExamRound.thptExamLevel === null) ? 0 : currentExamRound.thptExamLevel.indexExamRound;
                            const timeCurrentRound = (currentExamRound.thptExamLevel === null) ? 'Vòng thi không tồn tại' : handleOpenTimeExam(currentExamRound.thptExamLevel);
                            const timeMyRound = 'Vòng thi không tồn tại';
                            const myRound = (currentExamRound.thptExamLevel === null) ? 0 : currentExamRound.thptExamLevel.indexExamRound + 1;
                            setElmThptExamRound(<tr>
                                <th style={arrStyleTable[0]}>THPT</th>
                                <td style={arrStyleTable[1]}>Vòng {currentRound} <br />
                                    {timeCurrentRound}</td>
                                <td style={arrStyleTable[2]}>Vòng {myRound}<br />{timeMyRound}</td>
                                <td style={arrStyleTable[3]}>
                                    <button className="btn btn-sm btn-success"
                                        disabled={(timeMyRound === "Đã mở" && currentExamRound.thpt.isPublished) ? false : true}
                                        onClick={() => history.push({
                                            pathname: '/exam/' + currentExamRound.thpt._id,
                                            state: { exam: currentExamRound.thpt }
                                        })}
                                    >Vào thi</button>
                                </td>

                            </tr>);
                        }
                    }
                }
            }
        });
    }, []);
    var ff = <p className="text-center" style={{ fontSize: "15px" }}>Chưa có vòng thi dành cho bạn</p>;
    if (elmThcsExamRound !== undefined || elmThptExamRound !== undefined)
        ff = <table className="table table-sm table-bordered">
            <thead>
                <tr>
                    <th style={arrStyleTable[0]}>Khối thi</th>
                    <th style={arrStyleTable[1]}>Vòng thi hiện tại</th>
                    <th style={arrStyleTable[2]}>Vòng thi của bạn</th>
                    <th style={arrStyleTable[3]}>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {elmThcsExamRound}
                {elmThptExamRound}
            </tbody>
        </table>
    return (
        <div>
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
            <div style={{ marginTop: "100px" }}>

                <div className="row ml-4 mr-4">

                    {ff}

                </div>
            </div>

        </div>
    );

}
export default ExamRound;