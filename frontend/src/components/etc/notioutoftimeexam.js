
import '../../css/noti-outoftime.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router-dom';
import { api_url } from './constants';
import { useState } from 'react';

export default function NotiOutOfTimeExam(props) {
    const isSubmitted = props.isSubmitted;
    const userData = props.userData;
    const finalResult = props.finalResult;
    console.log(finalResult);
    const endPointExam = props.endPointExam;
    const examID = props.examID;
    const time = props.time;
    const title = props.title;
    const history = useHistory();
    const handleCancelSaveExam = () =>{
        props.examCallBackCancelSubmit();
    }
    const handleSaveExam = () => {
        var resultScore = 0;
        var totalScore = 0;
        for (var i = 0 ; i < finalResult.length; i++) {
            resultScore += Number (finalResult[i].score.split("/")[0]);
            totalScore += Number (finalResult[i].score.split("/")[1]);
        }
        const data = {
            userID: userData.userID,
            examID: examID,
            score: resultScore + '/' + totalScore,
            time
        }
        fetch(api_url + '/examresult/saveexamresult/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            console.log(data);
            if (data.success === true) {
                NotificationManager.success("Lưu kết quả thành công");
                setTimeout(function () {
                    window.scrollTo(0, 0);
                    history.push("/");
                }, 2000);
            }
        });

    }
    const handleAgain = () => {
        var resultScore = 0;
        var totalScore = 0;
        for (var i = 0 ; i < finalResult.length; i++) {
            resultScore += Number (finalResult[i].score.split("/")[0]);
            totalScore += Number (finalResult[i].score.split("/")[1]);
        }
        const data = {
            userID: userData.userID,
            examID: examID,
            score: resultScore + '/' + totalScore,
            time
        }
        fetch(api_url + '/examresult/retestexam/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            if (data.success === true) {
                setTimeout(function () {
                    window.scrollTo(0, 0);
                    history.push("/");
                }, 2000);
            }
        });
    }
    if (endPointExam === true && finalResult !== undefined && isSubmitted) {
        var resultScore = 0;
        var totalScore = 0;
        for (var i = 0 ; i < finalResult.length; i++) {
            resultScore += Number (finalResult[i].score.split("/")[0]);
            totalScore += Number (finalResult[i].score.split("/")[1]);
        }
        if (5 * resultScore < totalScore){
            return <div>
            <NotificationContainer />
            <div className="noti-outoftime">
                <div className="container text-center">
                    <h4 className="text-danger">{title}</h4>
                    <p>Kết quả: {resultScore}/{totalScore}</p>
                    <p>Thời gian làm bài: {time} phút</p>
                    <p style={{fontSize: "14px"}}>Kết quả của bạn không vượt quá 20% số điểm của bài thi <br/>Vui lòng thi lại</p>
                    <button className="btn btn-warning mt-2 mr-2 btn-sm text-light" onClick={() => handleAgain()}>Thi lại</button>
                    <button className="btn btn-danger mt-2 btn-sm" 
                    onClick={() => handleCancelSaveExam()}
                    style={{display: (title === 'Hết thời gian làm bài' ? "none" : "undefined")}}
                    >Hủy nộp</button>
                </div>

            </div>
        </div>
        }
        else {
            return <div>
            <NotificationContainer />
            <div className="noti-outoftime">
                <div className="container text-center">
                    <h4 className="text-danger">{title}</h4>
                    <p>Kết quả: {resultScore}/{totalScore}</p>
                    <p>Thời gian làm bài: {time} phút</p>
                    <button className="btn btn-info mt-2 mr-2 btn-sm" onClick={() => handleSaveExam()}>Nộp bài</button>
                    <button className="btn btn-warning mt-2 mr-2 btn-sm text-light" onClick={() => handleAgain()}>Thi lại</button>
                    <button className="btn btn-danger mt-2 btn-sm" 
                    onClick={() => handleCancelSaveExam()}
                    style={{display: (title === 'Hết thời gian làm bài' ? "none" : "undefined")}}
                    >Hủy nộp</button>
                </div>

            </div>
        </div>
        }
        
    }
    else return <></>
};
