import { useEffect, useState } from 'react';
import '../../css/message.css';
import socketIOClient from 'socket.io-client';
import { api_url } from './constants';
export default function CurrentMessage(props) {
    const [displayMessage, setDisplayMessage] = useState();
    const [currentMessage, setCurrentMessage] = useState(props.currentMessage);
    const [bodyMessage, setBodyMessage] = useState();
    const [message, setMessage] = useState('');
    const currentMessageName = props.currentMessageName;
    const userData = props.userData;
    const ENDPOINT = api_url;
    const handleSendMessage = (e) => {
        if (e.key === 'Enter') {
            if (message === '') return;
            const socket = socketIOClient(ENDPOINT);
            socket.emit('clientSendMessage', { messageID: currentMessage._id, userID: userData.userID, message: message });
            setMessage('');
            socket.on('gotMessageByID', (data) => {
                setCurrentMessage(data);
                setDisplayMessage(undefined);
            });
        }
    }
    useEffect(()=>{
        const socket = socketIOClient(ENDPOINT);
        socket.emit('getMessageByID', { messageID: currentMessage._id, userID: userData.userID, message: message });
        setMessage('');
        socket.on('gotMessageByID', (data) => {
            setCurrentMessage(data);
            setDisplayMessage(undefined);
        });
    },[])
    useEffect(() => {
        
        if (currentMessage !== undefined) {
            var arrTmp = currentMessage.messages;
            arrTmp.push('endpoint');
            arrTmp.unshift('startpoint')
            setBodyMessage(arrTmp.map((message, index) => {
                if (message === 'startpoint'){
                    return <div className="user-chat-startpoint">
                    </div>
                }
                if (message === 'endpoint'){
                  
                    return <div className="user-chat-endpoint"></div>
                }
                if (message.userID !== userData.userID) {
                    var userLastName = message.fullName.split(" ")[message.fullName.split(" ").length - 1];
                    if (currentMessage.listUsers.length === 2) userLastName = '';
                    return <div style={{ width: "200px" }}>
                        <div className="admin-feed">
                            <div className="admin-icon">{userLastName}</div>
                            <span></span>
                            {message.message}
                            <small id="time__now">{message.time}</small>
                        </div>
                    </div>
                }
                else return <div className="user-chat">
                    <span></span>
                    {message.message}
                    <small id="time__now">{message.time}</small>
                </div>
            }));
        }
    }, [currentMessage]);
    useEffect(() => {
        if (bodyMessage !== undefined)
            document.getElementById('body-screen-msg').scrollTop = document.getElementById('body-screen-msg').scrollTop = document.getElementById('body-screen-msg').offsetHeight + 10000;;
    }, [bodyMessage])
    return (
        <>

            {(currentMessage !== undefined) ?
                <div id="screen-msg" className="screen-msg" style={{ display: displayMessage }}>
                    <div className="header-screen-msg">
                        <span className="text-light" id="tags-title" title={currentMessageName}><b>{currentMessageName}</b></span>
                        <span className="text-light" title="Đóng cửa sổ chat" id="close-msg-admin"
                            onClick={() => {
                                setDisplayMessage("none");
                                props.handleCloseMessage();
                            }}>
                            <h2>×</h2></span>
                    </div>

                    <div id="body-screen-msg" className="body-screen-msg">
                        {bodyMessage}
                    </div>
                    <div className="foot-screen-msg">
                        <input id="enter-msg" type="text" autocomplete="off" placeholder="Nhập nội dung..." value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => handleSendMessage(e)}
                        />

                        <div className="laugh">
                            <span><i className="fas fa-paperclip" /><span>Tệp đính kèm</span></span>&nbsp;
                            <span><i className="far fa-laugh" /><span>Biểu cảm</span></span>
                        </div>
                    </div>
                </div> : undefined}


        </>
    );
}