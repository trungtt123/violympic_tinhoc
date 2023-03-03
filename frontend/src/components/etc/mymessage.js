import { useEffect, useState } from 'react';
import '../../css/message.css';
import socketIOClient from 'socket.io-client';
import { api_url } from './constants';
import CurrentMessage from './CurrentMessage';
import CreateMessage from './CreateMessage';
import $ from 'jquery';
export default function MyMessage(props) {
    const [elmListMessage, setElmListMessage] = useState();
    const [displayListMessage, setDisplaytListMessage] = useState('none');
    const [currentMessage, setCurrentMessage] = useState();
    const [currentMessageName, setCurrentMessageName] = useState();
    const [createMessage, setCreateMessage] = useState();
    const userData = props.userData;
    const ENDPOINT = api_url;
    const handleSelectMessage = (message) => {
        setDisplaytListMessage('none');
        const socket = socketIOClient(ENDPOINT);
        socket.emit('getMessageByID', { messageID: message.messageID });
        socket.on('gotMessageByID', (data) => {
            setCurrentMessage(data);
            setCurrentMessageName(message.messageName);
        });


    }
    const handleSearchMessage = (e) => {
        const value = e.target.value.toLowerCase();
        console.log($(".message"));
        $(".message").each((index, item) => {
            const id = '#message-' + index + ' span';
            if ($(id).text().toLowerCase().indexOf(value) === -1) {
                item.style.display = "none"
            }
            else {
                item.style.display = "block"
            }
        })
    }
    const isCreatedMessage = (data) => {
        setCurrentMessage(data.message);
        setCurrentMessageName(data.messageName);
        setDisplaytListMessage('none');
    }
    const handleCreateMessage = () => {
        setCreateMessage(< CreateMessage userData={userData} handleCancelCreateMessage={handleCancelCreateMessage} isCreatedMessage={isCreatedMessage} />)
    }
    const handleCancelCreateMessage = () => {
        setCreateMessage(undefined);
    }
    const handleCloseMessage = () => {
        setCurrentMessage(undefined);
    }
    const handGetAllMessages = () => {
        setCurrentMessage(undefined);
        setDisplaytListMessage(undefined);
        const socket = socketIOClient(ENDPOINT);
        socket.emit('getAllMessages', { userID: userData.userID });
        socket.on('gotAllMessages', (data) => {
            var elmTmp = data.map((message, index) => {
                const id = 'message-' + index;
                return <div
                    key={index} className="list-group-item cursor-pointer message" id={id} onClick={() => handleSelectMessage(message)}>
                    <span style={{width: "160px"}}><div style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "160px",
                        
                    }}>{message.messageName}</div></span> <i className="fas fa-edit float-right" style={{ marginTop: "-18px" }}></i>
                </div>

            });
            setElmListMessage(elmTmp);
        })
    }
    return (
        <>
            <div className="msg-admin-main">
                <div id="msg-admin" className="msg-admin" onClick={() => handGetAllMessages()}
                    style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy9Mla-XYSj0XcvbjTyDfTfEjwbl6wXuF-MrAOa_hoj64Zz9ErfM27y4NV8rISnv7udiQ&usqp=CAU")` }}>
                    <h4 id="title-admin" className="title-admin">Tin nhắn</h4>
                </div>
                <div id="screen-list-msg" className="screen-list-msg" style={{ display: displayListMessage }}>
                    <div className="header-screen-list-msg">
                        <span className="text-light" id="tags-title"><b>Tin nhắn của bạn</b></span>
                        <span className="text-light cursor-pointer float-right"
                            style={{ fontSize: "30px", marginTop: "-5px", marginRight: "8px" }}
                            title="Đóng cửa sổ chat" onClick={() => setDisplaytListMessage("none")}><b>×</b></span>
                        <span className="text-light float-right" style={{ marginTop: "9px", marginRight: "10px" }} title="Tạo tin nhắn mới">
                            <i className="fas fa-edit cursor-pointer" onClick={() => handleCreateMessage()}></i>
                        </span>


                    </div>
                    <input className="form-control rounded-0" id="inputListMessage"
                        style={{ fontSize: "14px", webkitBoxShadow: "none" }}
                        placeholder="Tìm kiếm tin nhắn . . ." name="srch-term"
                        type="text"
                        onChange={(e) => handleSearchMessage(e)}
                    />

                    <div id="body-screen-list-msg" className="body-screen-list-msg">
                        {elmListMessage}
                    </div>
                </div>
                {
                    (currentMessage !== undefined)
                        ?
                        <CurrentMessage
                            currentMessage={currentMessage}
                            currentMessageName={currentMessageName}
                            userData={userData}
                            handleCloseMessage={handleCloseMessage}
                        />
                        : undefined
                }

            </div>
            {createMessage}
        </>
    );
}