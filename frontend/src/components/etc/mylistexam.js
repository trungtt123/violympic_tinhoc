import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { api_url } from './constants';
function ContentRank(props) {
    const isLoggedIn = props.isLoggedIn;
    const userData = props.userData;
    const history = useHistory();
    const [elmListExamTHCS, setElmListExamTHCS] = useState();
    const [elmListExamTHPT, setElmListExamTHPT] = useState();
    if (isLoggedIn === false || isLoggedIn === undefined) {
        history.push('/');
    }
    if (userData.infomation.permissionID === 0) {
        alert('Tài khoạn của bạn không được cấp quyền này!!!');
        history.push('/');
    }
    const arrStyleTable = [
        { "width": "10%", "textAlign": "center", "font-size": "14px" },
        { "width": "50%", "textAlign": "center", "font-size": "14px" },
        { "width": "20%", "textAlign": "center", "font-size": "14px" },
        { "width": "20%", "textAlign": "center", "font-size": "14px" }
    ];
    const handlePublishExam = (exam) => {
        fetch(api_url + '/exam/handlepublishexam/' + exam._id, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.success === true) {
                window.location.reload();
            }
        });
    }
    const handleDeleteExam = (exam) => {
        fetch(api_url + '/exam/deleteexam/' + exam._id, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.success === true && data.result === true) {
                window.location.reload();
            }
        });
    }
    useEffect(() => {
        fetch(api_url + '/exam/getallexam/' + userData.userID, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    var listExam = data.result;
                    var listExamTHCS = data.result.filter((exam)=>{return exam.examLevel === 1});
                    var listExamTHPT = data.result.filter((exam)=>{return exam.examLevel === 2});

                    var tmp = listExamTHCS.map((exam, index) => {
                        var hrefEdit = "/edit-exam/" + exam._id;
                        var hrefAddProblem = "/exam/" + exam._id + "/add-problem";
                        var style = { color: "white", backgroundColor: "#69c5de" };
                        var namePublish = "Đóng kì thi";
                        if (exam.isPublished === false) {
                            style = undefined;
                            namePublish = "Mở kì thi";
                        }

                        return <div key={index}>
                            <div className="list-group-item mb-2 cursor-pointer rounded" style={style} >{exam.examName}</div>
                            <div className="btnControl mb-2 text-light">
                                <button className="btn btn-info mr-1 btn-sm" onClick={() => { history.push(hrefEdit) }}>Chỉnh sửa</button>
                                <button className="btn btn-success mr-1 btn-sm" onClick={() => { history.push(hrefAddProblem) }}>Quản lý bài tập</button>
                                <button className="btn btn-warning text-light btn-sm mr-1" onClick={() => handlePublishExam(exam)}>{namePublish}</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteExam(exam)}>Xóa kì thi</button>
                            </div>
                        </div>
                    });
                    setElmListExamTHCS(tmp);
                    tmp = listExamTHPT.map((exam, index) => {
                        if (exam.examLevel === 1) return;
                        var hrefEdit = "/edit-exam/" + exam._id;
                        var hrefAddProblem = "/exam/" + exam._id + "/add-problem";
                        var style = { color: "white", backgroundColor: "#69c5de" };
                        var namePublish = "Đóng kì thi";
                        if (exam.isPublished === false) {
                            style = undefined;
                            namePublish = "Mở kì thi";
                        }

                        return <div key={index}>
                            <div className="list-group-item mb-2 cursor-pointer rounded" style={style} >{exam.examName}</div>
                            <div className="btnControl mb-2 text-light">
                                <button className="btn btn-info mr-1 btn-sm" onClick={() => { history.push(hrefEdit) }}>Chỉnh sửa</button>
                                <button className="btn btn-success mr-1 btn-sm" onClick={() => { history.push(hrefAddProblem) }}>Quản lý bài tập</button>
                                <button className="btn btn-warning text-light btn-sm mr-1" onClick={() => handlePublishExam(exam)}>{namePublish}</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteExam(exam)}>Xóa kì thi</button>
                            </div>
                        </div>
                    });
                    
                    setElmListExamTHPT(tmp);
                    if (listExamTHCS.length === 0) {
                        setElmListExamTHCS(<div className="list-group-item mb-2 cursor-pointer rounded">Bạn chưa tạo kì thi nào!</div>);
                    }
                    if (listExamTHPT.length === 0) {
                        setElmListExamTHPT(<div className="list-group-item mb-2 cursor-pointer rounded">Bạn chưa tạo kì thi nào!</div>);
                    }
                }
                
            });
    }, []);
    return (
        <div className="my-list-exam mt-4">
            <div className="d-flex justify-content-center">
                <h4>Danh sách kì thi đã tạo</h4>
            </div>
            <div style={{ margin: "auto", width: "700px", padding: "20px" }}>
               
                
            </div>

            <div style={{ margin: "auto", width: "700px", padding: "20px" }}>
                <div className="mb-3"><b>Khối THCS</b></div>
                {elmListExamTHCS}
                <div className="mt-5 mb-3"><b>Khối THPT</b></div>
                {elmListExamTHPT}
                <button className="btn btn-info btn-sm"
                    onClick={() => { history.push("/create-exam") }}>Tạo mới kì thi</button>
            </div>

        </div>
    );
}
export default ContentRank;