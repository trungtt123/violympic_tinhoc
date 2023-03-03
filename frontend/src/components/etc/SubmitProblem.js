import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { api_url } from './constants';
import '../../css/submit-problem.css'
import { UnControlled as CodeMirror } from 'react-codemirror2';
import {NotificationContainer, NotificationManager} from 'react-notifications';

require('codemirror/lib/codemirror.css');
export default function SubmitForm(props) {
    var isSubmitted = props.isSubmitted;
    var problemID = props.problemID;
    var userData = props.userData;
    console.log(problemID);
    console.log(userData);
    const history = useHistory();
    const [problem, setProblem] = useState();
    const [optionViewSubmitProblem, setOptionViewSubmitProblem] = useState(0);
    const [elmViewSubmitProblem, setElmViewSubmitProblem] = useState();
    const [sourceCode, setSourceCode] = useState();
    const [submit, setSubmit] = useState(true);
    const [language, setLanguage] = useState();
    const arrStyleTableThread = [
        { "width": "20%", "textAlign": "center", "font-size": "14px" },
        { "width": "70%", "textAlign": "center", "font-size": "14px" },
        { "width": "10%", "textAlign": "center", "font-size": "14px" }
    ];
    const arrStyleTableTbody = [
        { "width": "20%", "textAlign": "center", "font-size": "14px" },
        { "width": "70%", "textAlign": "center", "font-size": "14px" },
        { "width": "10%", "textAlign": "center", "font-size": "14px" }
    ]
    const handleClick0 = () => {
        setOptionViewSubmitProblem(0);
    }
    const handleClick1 = () => {
        setOptionViewSubmitProblem(1);
    }
    const handleClickSubmitProblem = () => {
        
        if (optionViewSubmitProblem === 0) {
            if (language === "" || sourceCode === undefined || language === undefined || sourceCode === ""){
                NotificationManager.error("Chưa chọn trình biên dịch hoặc chưa nhập source code");
                return;
            }
            NotificationManager.warning("Đang chấm bài vui lòng chờ trong ít phút","",10000,{},false);
            var data = {
                sourceCode: sourceCode,
                language: language
            }
            fetch(api_url + '/problem/compilercode/' + userData.userID + '/' + problemID, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }).then(response => response.json()).then(data => {
                NotificationManager.success("Đã chấm xong");
                setOptionViewSubmitProblem(1);
                setLanguage(undefined);
                setSourceCode(undefined);
            });

        }
        else {
            setLanguage(undefined);
            setSourceCode(undefined);
            setOptionViewSubmitProblem(0);
        }
    }
    const handleCancelSubmitProblem = () => {
        props.handleCancelSubmitProblem();
    }
    const getCode = (editor, data, value) => {
        setSourceCode(value);
    }
    const getLanguage = (e) => {
        setLanguage(e.target.value);
    }
    useEffect(async() => {
        var elmtmp;
        fetch(api_url + '/problem/getproblem/' + problemID, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            setProblem(data.result);
        });
        if (optionViewSubmitProblem == 0) {
            var result = await fetch(api_url + '/problem/getproblem/' + problemID, {
                method: 'GET',
            }).then(response => response.json());
            var indexSubmit = Number (result.result.problemIndexSubmitLimit);
            result = await fetch(api_url + '/submission/getsubmission/' + userData.userID + '/' + problemID, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET",
            }).then(response => response.json());
            var indexSubmitted = Number (result.result.length);
            if (indexSubmitted  === indexSubmit) setSubmit(false);

            
            elmtmp = <div className="col-9 mt-2 mr-2">
                <select className="form-select form-select-lg mb-2" onChange={(e) => getLanguage(e)}>
                    <option selected value="">Trình biên dịch</option>
                    <option value="67">Pascal</option>
                    <option value="50">C</option>
                    <option value="54">C++</option>
                    <option value="62">Java</option>
                    <option value="71">Python</option>
                </select>
                <CodeMirror
                    options={{
                        mode: 'javascript',
                        lineNumbers: true,
                        lint: true,
                    }}
                    onChange={(editor, data, value) => getCode(editor, data, value)}
                />
                <div>Bạn còn <span className="text-danger"><b>{indexSubmit - indexSubmitted}</b></span> lần nộp bài</div>
            </div>;
        }
        else {
            var elmContainer;
            await fetch(api_url + '/submission/getsubmission/' + userData.userID + '/' + problemID, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET",
            }).then(response => response.json()).then(data => {
                
                var listSubmission = data.result;
                props.handleReceiveProblemResult(problemID, data);
                elmContainer = listSubmission.map((submission, index) => {
                    var score = submission.score.split('/');
                    var styleScore = "text-danger";
                    
                    if (score[0] !== "0") styleScore = "text-warning";
                    if (score[0] === score[1]) styleScore = "text-success";
                    if (score[0] === "-")  styleScore = "text-danger";
                    return <tr key={index}>
                        <td style={arrStyleTableThread[0]}>{index + 1}</td>
                        <td style={arrStyleTableThread[1]}>{submission.status}</td>
                        <th style={arrStyleTableThread[2]} className={styleScore}>{submission.score}</th>
                    </tr>
                });
                elmtmp = <div className="col-9 mt-2 mr-2">
                    <table className="my-table" cellspacing="0" cellpadding="0">
                        <thead className="" >
                            <tr>
                                <th style={arrStyleTableThread[0]}>Lần chấm</th>
                                <th style={arrStyleTableThread[1]}>Status</th>
                                <th style={arrStyleTableThread[2]}>Điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elmContainer}
                        </tbody>
                    </table>
                </div>
            });

        }
        setElmViewSubmitProblem(elmtmp);

    }, [optionViewSubmitProblem]);
    if (problemID !== undefined && problem !== undefined && userData !== undefined)
        return (
            <>
            <NotificationContainer />
            <div className="submit-problem">
                <div className="container">
                    <div className="text-center text-info mb-2">
                        <h4>{problem.problemName}</h4>
                    </div>
                    <div className="row">
                        <div className="col-2 ml-4">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link text-info cursor-pointer" onClick={() => handleClick0()}>Chấm bài</a>
                                    <a className="nav-link text-info cursor-pointer" onClick={() => handleClick1()}>Kết quả</a>
                                </li>
                            </ul>
                        </div>
                        {elmViewSubmitProblem}
                    </div>
                    <div className="btn-control">
                        <button className="btn btn-info mr-1" disabled={!submit} onClick={() => handleClickSubmitProblem()}>Chấm bài</button>
                        <button className="btn btn-danger" onClick={() => handleCancelSubmitProblem()}>Hủy</button>
                    </div>
                </div>
            </div>
            </>
        );
    else return <></>
};
