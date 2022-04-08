import '../../css/login.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { domain, api_url } from '../etc/constants';
function ChangePassWord(props) {
    var isShowChangePassWord = props.isShowChangePassWord;
    var userData = props.userData;
    var isLoggedIn = props.isLoggedIn;
    if (isLoggedIn === false) {
        window.location.href = domain;
    }
    const history = useHistory();
    const [oldPassWord, setOldPassWord] = useState();
    const [newPassWord, setNewPassWord] = useState();
    const [newPassWordAgain, setNewPassWordAgain] = useState();
    const handleChangeOldPassWord = (e) => {
        setOldPassWord(e.target.value);
    }
    const handleChangeNewPassWord = (e) => {
        setNewPassWord(e.target.value);
    }
    const handleChangeNewPassWordAgain = (e) => {
        setNewPassWordAgain(e.target.value);
    }
    const handleCancel = () => {
        history.push('/');
    }
    const handleSubmit = () => {
        if (newPassWord !== newPassWordAgain) {
            alert("Nhập lại mật khẩu không đúng ?!");
            return;
        }
        var data = {
            token: userData.token,
            oldPassWord,
            newPassWord
        }
        fetch(api_url + '/user/checkpassword', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json()).then(userData => {
            if (userData.checkPass === false) {
                alert("Sai mật khẩu!?");
                return;
            }
            fetch(api_url + '/user/changepassword', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }).then(response => response.json()).then(userData => {
                //console.log(userData);
                console.log(userData)
                localStorage.removeItem('userData');
                localStorage.setItem('userData', JSON.stringify(userData.userData));
                alert("Đổi mật khẩu thành công!!");
                //window.location.href = domain;

            });

        });
    }
    if (isShowChangePassWord === true) {
        return (
            <div className="login wrapper">
                <div className="fadeInDown">
                    <div id="formContent">
                        <h2 className="text-info">Đổi mật khẩu</h2>
                        <input type="password" id="oldpassword" className="fadeIn second"
                            name="username" placeholder="Mật khẩu cũ" onChange={(e) => handleChangeOldPassWord(e)} />
                        <input type="password" id="newpassword" className="fadeIn third" onChange={(e) => handleChangeNewPassWord(e)}
                            name="password" placeholder="Mật khẩu mới" />
                        <input type="password" id="newpasswordagain" className="fadeIn third" onChange={(e) => handleChangeNewPassWordAgain(e)}
                            name="password" placeholder="Nhập lại mật khẩu mới" />
                        <input type="submit" className="fadeIn fourth" value="Gửi" onClick={() => handleSubmit()} />
                        <input type="submit" className="fadeIn fourth" value="Hủy" onClick={() => handleCancel()} />
                        <div id="formFooter">
                            <a className="underlineHover" style={{ "text-decoration": "none" }} href="#">Quên mật khẩu</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else return <> </>
}
export default ChangePassWord;