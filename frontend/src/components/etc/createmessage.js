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
import socketIOClient from 'socket.io-client';
import CurrentMessage from './currentmessage';
import '../../css/message.css';
function CreateMessage(props) {
    const history = useHistory();
    var isLoggedIn = props.isLoggedIn;
    const ENDPOINT = api_url;
    const userData = props.userData;
    const [elmMessage, setElmMessage] = useState();
    const [listUsers, setListUser] = useState();
    const handleCloseMessage = () => {
        setElmMessage(undefined);
    }
    const handleChangeInput = (e) => {
        setListUser(e.target.value);
    }
    const handleCreateMessage = () => {
        const socket = socketIOClient(ENDPOINT);
        var arrUsers = listUsers.split(',');
        for (var i = 0; i < arrUsers.length;i++){
            arrUsers[i] = arrUsers[i].trim();
        }
        arrUsers.push(userData.userID);
        socket.emit('clientCreateMessage', { userID: userData.userID, listUsers: arrUsers });
        socket.on('isCreatedMessage', (data) => {
            props.isCreatedMessage(data)
            props.handleCancelCreateMessage();
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);

    return <>
        <div className="row" style={{
            position: "fixed",
            width: "400px",
            height: "150px",
            top: "50%",
            left: "50%",
            marginTop: "-75px", /* Negative half of height. */
            marginLeft: "-200px",
            border: "1px solid #40b2d6",
            borderRadius: "25px",
            backgroundColor: "#c2eaea",
            zIndex: "10000"
        }}>

            <div className="" style={{ width: "50%", margin: "auto", marginTop: "20px" }}>
                <h5 className="text-center text-info">Tạo tin nhắn mới</h5>
                <input type="text" className="form-control" placeholder="Nhập ID các thành viên" onChange={(e)=>handleChangeInput(e)}></input>
                <div className="mt-2" style={{ marginLeft: "50px" }}>
                    <button className="btn btn-info btn-sm mr-1" onClick={()=>handleCreateMessage()}>Tạo</button>
                    <button className="btn btn-danger btn-sm" onClick={() => {props.handleCancelCreateMessage()}}>Hủy</button>
                </div>
            </div>
        </div>
    </>




}
export default CreateMessage;