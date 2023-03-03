import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Clock from './Clock';
import { api_url } from './constants';
import '../../css/exam.css'
function ContentExamRound(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    var examID = window.location.pathname.split('/')[2];
    const [currentExam, setCurrentExam] = useState();
    const [clock, setClock] = useState();
    const [elmListProblem, setElmListProblem] = useState();
    const [elmContentListProblem, setContentListProblem] = useState();
    const [inputExamCode, setInputExamCode] = useState();
    const [isUnlockedExam, setIsUnlockedExam] = useState(false);
    const [displayListProblem, setDisplayListProblem] = useState();
    const history = useHistory();
    const arrStyleTable = [
        { "width": "5%", "textAlign": "center", "font-size": "14px" },
        { "width": "50%", "textAlign": "center", "font-size": "14px" },
        { "width": "45%", "textAlign": "center", "font-size": "14px" },
        { "width": "25%", "textAlign": "center", "font-size": "14px" },
    ];
    const handleClickProblem = (index) => {
        var topPos = document.getElementById('problem' + index).offsetTop;
        window.scrollTo(0, topPos + window.innerHeight * 0.22);

    }
    const handleSubmitProblem = (problem) => {
        history.push({
            pathname: '/exam/' + examID + '/submit/problem/' + problem._id,
            state: {userID: userData.userID, problem }
        })

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
    const examCallBackClockOutOfTime = () => {
        // ko alert;
    }
    const handleClickStartExam = (e) => {
        e.target.style.display = 'none';
        setDisplayListProblem(undefined);
        var tmpClock = <Clock examTime={currentExam.examTime} isClickedStartExam={true}
            examCallBackClockOutOfTime={examCallBackClockOutOfTime} />
        setClock(tmpClock);
    }
    useEffect(() => {
        if (history.location.state === undefined || history.location.state.exam === undefined) {
            history.push('/exam-round');
            return;
        }
        var examCode = history.location.state.exam.examCode;
        if (examCode === "") setIsUnlockedExam(true);
        fetch(api_url + '/exam/getexamforexamier/' + examID, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.success === true) {
                console.log(data.result);
                var curExam = {
                    listProblem: data.result.listProblem,
                    examTime: data.result.examInfomation.examTime
                }
                var cntProblem = 0;
                var elmtmp = curExam.listProblem.map((problem, index) => {
                    if (problem.isSelected === true)
                        return <tr key={index} className="cursor-pointer" onClick={() => handleClickProblem(index)}>
                            <th style={arrStyleTable[0]}>{++cntProblem}</th>
                            <td style={arrStyleTable[1]}>{problem.problemName}</td>
                            <td style={arrStyleTable[2]}>0/100</td>
                            {/* <td style={arrStyleTable[3]}>-</td> */}
                        </tr>
                    return undefined;
                });
                setCurrentExam(curExam);
                var tmpClock = <Clock examTime={curExam.examTime} isClickedStartExam={false} />
                setClock(tmpClock);
                setElmListProblem(elmtmp);
                console.log(curExam);
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
                                    <button class="btn btn-info mr-1" onClick={() => handleSubmitProblem(problem)}>Chấm bài</button>
                                    <button class="btn btn-danger">Báo cáo</button>
                                </div>

                                <div className="col-75" dangerouslySetInnerHTML={{ __html: problem.problemContent }}></div>

                            </div>
                        </>
                    return undefined;
                });
                setContentListProblem(tmpContentListProblem);
                setDisplayListProblem({ 'display': 'none' });
            }
        });
        return;
    }, []);
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
                <table className="table table-hover">
                    <thead className="thead-light" >
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
                <div class="row">
                    <div class="col text-center">

                        <span> <b>Thời gian làm bài: {clock}</b></span><br />
                        <button class="btn btn-info mt-3 mb-5" id="btn-start-exam" onClick={(e) => handleClickStartExam(e)}>Bắt đầu</button>
                        <br />
                    </div>



                </div>
                <div className="exam" id="contentExam" style={displayListProblem}>
                    {elmContentListProblem}

                </div>
            </>
        );
    }

}
export default ContentExamRound;