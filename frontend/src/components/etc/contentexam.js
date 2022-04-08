import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Clock from './clock';
import { api_url } from './constants';
import '../../css/exam.css';
import NotiOutOfTimeExam from '../etc/notioutoftimeexam';
import SubmitProblem from './submitproblem';
import SubmitReport from './submitreportexam'
import socketIOClient from "socket.io-client";
import $ from 'jquery';
function ContentExam(props) {
    var isLoggedIn = props.isLoggedIn;
    const ENDPOINT = api_url;
    var userData = props.userData;
    var examID = window.location.pathname.split('/')[2];
    const [endPoint, setEndPoint] = useState();
    const [receiveResultProblem, setReceiveResultProblem] = useState();
    const [elmSubmitProblem, setElmSubmitProblem] = useState();
    const [elmReportProblem, setElmReportProblem] = useState();
    const [currentExam, setCurrentExam] = useState();
    const [elmSubmitExam, setElmSubmieExam] = useState();
    const [clock, setClock] = useState();
    const [elmListProblem, setElmListProblem] = useState();
    const [elmContentListProblem, setContentListProblem] = useState();
    const [inputExamCode, setInputExamCode] = useState();
    const [isUnlockedExam, setIsUnlockedExam] = useState(false);
    const [displayListProblem, setDisplayListProblem] = useState();
    const history = useHistory();
    const arrStyleTable = [
        { "width": "10%", "textAlign": "center", "font-size": "14px" },
        { "width": "75%", "textAlign": "center", "font-size": "14px" },
        { "width": "15%", "textAlign": "center", "font-size": "14px" },
        { "width": "25%", "textAlign": "center", "font-size": "14px" },
    ];
    const handleClickProblem = (index) => {
        var topPos = document.getElementById('problem' + index).offsetTop;
        window.scrollTo(0, topPos + window.innerHeight * 0.22);

    }
    const handleSubmitProblem = (problem) => {
        setElmSubmitProblem(<SubmitProblem userData={userData}
            problemID={problem._id} handleCancelSubmitProblem={handleCancelSubmitProblem}
            handleReceiveProblemResult={handleReceiveProblemResult}
        />)
    }
    const handleReceiveProblemResult = (problemID, dataScore) => {

        setReceiveResultProblem({ problemID, dataScore });
    }
    const handleCancelSubmitProblem = () => {
        setElmSubmitProblem(undefined);
    }
    const handleChangeInputExamCode = (e) => {
        setInputExamCode(e.target.value);
    }
    const handleCheckExamCode = () => {
        var examCode = history.location.state.exam.examCode;
        if (inputExamCode !== examCode) {
            alert('Mã code không đúng?!');
            return;
        }
        setIsUnlockedExam(true);
    }
    const handleEndPoint = (title, isSubmitted) => {
        const timeStart = localStorage.getItem('timestart');
        const day = new Date();
        const timeEnd = day.getTime();
        const time = parseInt((timeEnd - timeStart) / (60 * 1000));
        fetch(api_url + '/exam/getexamforexamier/' + examID, {
            method: 'GET',
        }).then(response => response.json()).then(async (data) => {
            if (data.success === true) {
                const listProblem = data.result.listProblem;
                const finalResult = [];
                for (var i = 0; i < listProblem.length; i++) {
                    if (listProblem[i].isSelected === true) {

                        const score = await fetch(api_url + '/submission/getbestsubmission/' + userData.userID + '/' + listProblem[i]._id, {
                            method: 'GET'
                        }).then(response => response.json());
                        finalResult.push({
                            problemID: listProblem[i]._id,
                            score: score.result
                        })
                    }
                }
                setEndPoint(<NotiOutOfTimeExam
                    examID={examID} time={time}
                    title={title} endPointExam={true}
                    userData={userData}
                    finalResult={finalResult}
                    isSubmitted={isSubmitted} examCallBackCancelSubmit={examCallBackCancelSubmit} />);
            }
        })

    }
    const examCallBackCancelSubmit = () => {

        handleEndPoint("Kết thúc bài thi", false);
    }
    const examCallBackClockOutOfTime = () => {
        const timeStart = localStorage.getItem('timestart');
        const day = new Date();
        const timeEnd = day.getTime();
        const time = parseInt((timeEnd - timeStart) / (60 * 1000));
        fetch(api_url + '/exam/getexamforexamier/' + examID, {
            method: 'GET',
        }).then(response => response.json()).then(async (data) => {
            if (data.success === true) {
                const listProblem = data.result.listProblem;
                const finalResult = [];
                for (var i = 0; i < listProblem.length; i++) {
                    if (listProblem[i].isSelected === true) {

                        const score = await fetch(api_url + '/submission/getbestsubmission/' + userData.userID + '/' + listProblem[i]._id, {
                            method: 'GET'
                        }).then(response => response.json());
                        finalResult.push({
                            problemID: listProblem[i]._id,
                            score: score.result
                        })
                    }
                }
                setEndPoint(<NotiOutOfTimeExam time={time}
                    examID={examID} title={"Hết thời gian làm bài"}
                    endPointExam={true} userData={userData}
                    finalResult={finalResult} isSubmitted={true}
                    examCallBackCancelSubmit={examCallBackCancelSubmit} />);
            }
        })


    }
    const handleClickStartExam = (e) => {
        const day = new Date();
        localStorage.setItem('timestart', day.getTime());
        e.target.style.display = 'none';
        setDisplayListProblem(undefined);
        var tmpClock = <Clock examTime={currentExam?.examTime} isClickedStartExam={true}
            examCallBackClockOutOfTime={examCallBackClockOutOfTime} />
        setClock(tmpClock);
    }
    const callBackCancelReport = () => {
        setElmReportProblem(undefined);
    }
    const handleReportExam = (problem, exam) => {
        setElmReportProblem(<SubmitReport
            isReported={true}
            callBackCancelReport={callBackCancelReport}
            problem={problem}
            exam={exam}
            userData={userData}
        />)

    }
    // window.addEventListener("beforeunload", (ev) => {
    //     ev.preventDefault();
    //     return ev.returnValue = 'Are you sure you want to close?';
    // });
    useEffect(() => {
        window.scrollTo(0, 0);
        
        if (history.location.state === undefined || history.location.state.exam === undefined) {
            history.push('/');
            return;
        }
        var examCode = history.location.state.exam.examCode;
        if (examCode === "" || examCode === undefined || examCode === null) setIsUnlockedExam(true);
        fetch(api_url + '/exam/getexamforexamier/' + examID, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            // console.log(data.result.messageReportExam.)
            if (data.success === true) {
                var curExam = {
                    listProblem: data.result.listProblem,
                    examTime: data.result.examInfomation.examTime
                }
                var tmpClock = <Clock examTime={curExam.examTime} isClickedStartExam={false} />
                setClock(tmpClock);
                var tmpContentListProblem = curExam.listProblem.map((problem, index) => {
                    var problemCSSID = 'problem' + index;
                    if (problem.isSelected === true)
                        return <>
                            <div className="row ml-2" id={problemCSSID}>
                                <hr width="100%" align="center" />
                                <div className="col-25 text-center">
                                    <h3>{problem.problemName}</h3>
                                Tags: {problem.problemTags} <br />
                                Dữ liệu vào: standard input <br />
                                Dữ liệu ra: standard output <br />
                                Giới hạn bộ nhớ: {problem.problemMemoryLimit} megabyte <br />
                                    <button class="btn btn-info btn-sm mr-1" onClick={() => handleSubmitProblem(problem)}>Chấm bài</button>
                                    <button class="btn btn-danger btn-sm" onClick={() => handleReportExam(problem, data.result)}>Báo cáo</button>
                                </div>

                                <div className="col-75" dangerouslySetInnerHTML={{ __html: problem.problemContent }}></div>

                            </div>
                        </>
                    return undefined;
                });
                setElmSubmieExam(<button className="btn btn-info mt-5" onClick={() => handleEndPoint("Kết thúc bài thi", true)}>Kết thúc bài thi</button>)
                setContentListProblem(tmpContentListProblem);
                setDisplayListProblem({ 'display': 'none' });
                setCurrentExam(curExam);
            }
        });
        return;
    }, []);
    useEffect(() => {
        fetch(api_url + '/exam/getexamforexamier/' + examID, {
            method: 'GET',
        }).then(response => response.json()).then(async (data) => {
            if (data.success === true) {
                const listProblem = data.result.listProblem;
                const listResult = [];
                for (var i = 0; i < listProblem.length; i++) {
                    if (listProblem[i].isSelected === true) {

                        const score = await fetch(api_url + '/submission/getbestsubmission/' + userData.userID + '/' + listProblem[i]._id, {
                            method: 'GET'
                        }).then(response => response.json());
                        listResult.push({
                            problemID: listProblem[i]._id,
                            score: score.result
                        })
                    }
                }

                var cntProblem = 0;
                var elmtmp = listProblem.map((problem, index) => {
                    if (problem.isSelected === true) {
                        var score;
                        for (var i = 0; i < listResult.length; i++) {
                            if (problem._id === listResult[i].problemID) {
                                score = listResult[i].score;
                                break;
                            }
                        }

                        const objScore = score.split("/");
                        if (objScore[0] === "0" || objScore[0] === 0) {
                            return <tr key={index} className="cursor-pointer" onClick={() => handleClickProblem(index)}>
                                <th style={arrStyleTable[0]}>{++cntProblem}</th>
                                <td style={arrStyleTable[1]}>{problem.problemName}</td>
                                <td style={arrStyleTable[2]} className="text-danger"><b>{score}</b></td>
                                {/* <td style={arrStyleTable[3]}>-</td> */}
                            </tr>
                        }
                        else {
                            if (objScore[0] === objScore[1]) {
                                return <tr key={index} className="cursor-pointer" onClick={() => handleClickProblem(index)}>
                                    <th style={arrStyleTable[0]}>{++cntProblem}</th>
                                    <td style={arrStyleTable[1]}>{problem.problemName}</td>
                                    <td style={arrStyleTable[2]} className="text-success"><b>{score}</b></td>
                                    {/* <td style={arrStyleTable[3]}>-</td> */}
                                </tr>
                            }
                            else {
                                return <tr key={index} className="cursor-pointer" onClick={() => handleClickProblem(index)}>
                                    <th style={arrStyleTable[0]}>{++cntProblem}</th>
                                    <td style={arrStyleTable[1]}>{problem.problemName}</td>
                                    <td style={arrStyleTable[2]} className="text-warning"><b>{score}</b></td>
                                    <td style={arrStyleTable[3]}>-</td>
                                </tr>
                            }
                        }
                    }
                    else return undefined
                });
                setElmListProblem(elmtmp);
            }
        })
    }, [receiveResultProblem]);
    if (isUnlockedExam === false)
        return (
            <div className="exam">
                <div class="d-flex justify-content-center">
                    <div className="position-absolute">
                        <input className="mt-5" type="text" placeholder="Nhập mã code . . ."
                            onChange={(e) => handleChangeInputExamCode(e)} />
                        <button className="btn btn-danger" onClick={() => handleCheckExamCode()}>Gửi mã code</button>
                    </div>
                </div>

            </div>);
    else {
        return (
            <>
                {elmReportProblem}
                {elmSubmitProblem}
                {endPoint}


                <div className="row mt-3" style={{ width: "60%", margin: "auto" }}  >
                    <table className="table table-sm table-bordered" >
                        <thead>
                            <tr>
                                <th style={arrStyleTable[0]}>STT</th>
                                <th style={arrStyleTable[1]}>Tên bài</th>
                                <th style={arrStyleTable[2]}>Điểm</th>
                                {/* <th style={arrStyleTable[3]}>Số người giải được</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {elmListProblem}
                        </tbody>
                    </table>
                </div>




                <div class="row">
                    <div class="col text-center">

                        <span> <b>Thời gian làm bài: {clock}</b></span><br />
                        <button class="btn btn-info mt-3 mb-5" id="btn-start-exam" 
                        disabled={elmListProblem === undefined ? true : false}
                        onClick={(e) => handleClickStartExam(e)}>Bắt đầu</button>
                        <br />
                    </div>



                </div>
                <div className="exam" id="contentExam" style={displayListProblem}>
                    {elmContentListProblem}
                    <div className="text-center">
                        {elmSubmitExam}
                    </div>
                </div>
            </>
        );
    }

}
export default ContentExam;