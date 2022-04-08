import '../../css/login.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { domain, api_url } from '../etc/constants';
function Login(props) {
    var isShowLogin = props.isShowLogin;
    var isLoggedIn = props.isLoggedIn;
    if (isLoggedIn === true) {
        window.location.href = domain;
    }
    const history = useHistory();
    const [userName, setUserName] = useState();
    const [passWord, setPassWord] = useState();
    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    }
    const handleChangePassWord = (e) => {
        setPassWord(e.target.value);
    }
    const handleCancelLogIn = () => {
        history.push('/');
    }
    const handleSubmitLogIn = () => {
        var data = {
            userName,
            passWord
        }
        fetch(api_url + '/user/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json()).then(userData => {
            if (userData.userData === null || userData.success === false) {
                alert("Sai tên đăng nhập hoặc mật khẩu!?");
                return;
            }
            localStorage.setItem('userData', JSON.stringify(userData.userData));
            window.location.href = domain;
        });
    }
    if (isShowLogin === true) {
        return (
            <div className="login wrapper">
                <div className="fadeInDown">
                    <div id="formContent">
                        <h2 className="text-info">Đăng nhập</h2>
                        <input type="text" id="username" className="fadeIn second"
                            name="username" placeholder="Tên đăng nhập" onChange={(e) => handleChangeUserName(e)} />
                        <input type="password" id="password" className="fadeIn third" onChange={(e) => handleChangePassWord(e)}
                            name="password" placeholder="Mật khẩu" />
                        <input type="submit" className="fadeIn fourth" value="Gửi" onClick={() => handleSubmitLogIn()} />
                        <input type="submit" className="fadeIn fourth" value="Hủy" onClick={() => handleCancelLogIn()} />
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
export default Login;