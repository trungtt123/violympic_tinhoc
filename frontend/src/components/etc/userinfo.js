import '../../css/create-problem.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { domain, api_url } from './constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ContentListExam from './ContentListExam';
import ContentListProblem from './ContentListProblem';
import socketIOClient from 'socket.io-client';
import CurrentMessage from './CurrentMessage';
import '../../css/message.css';
function UserInfo(props) {
    const history = useHistory();
    var isLoggedIn = props.isLoggedIn;
    const ENDPOINT = api_url;
    const userData = props.userData;
    const [userInfo, setUserInfo] = useState();
    const [provinceName, setProvinceName] = useState();
    const [districtName, setDistrictName] = useState();
    const [schoolName, setSchoolName] = useState();
    const [elmMessage, setElmMessage] = useState();
    const getProvince = (provinceID) => {
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            method: 'GET',
            headers: {
                'token': 'ff998f5d-a65e-11eb-8be2-c21e19fc6803',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                var provinces = data.data;
                provinces.forEach(province => {
                    if (String(province.ProvinceID) === String(provinceID)) {
                        setProvinceName(province.ProvinceName);
                        return;
                    }
                });

            });
    }
    const getDistrict = (districtID) => {
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
            method: 'GET',
            headers: {
                'token': 'ff998f5d-a65e-11eb-8be2-c21e19fc6803',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                var districts = data.data;
                districts.forEach(district => {
                    if (district.DistrictID == districtID) {
                        setDistrictName(district.DistrictName);
                        return;
                    }
                });

            });
    }
    const getSchool = (schoolID) => {
        fetch(api_url + '/school/getschoolfromid/' + schoolID, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                var school = data.school;
                setSchoolName(school.SchoolName);
            });
    }
    const handleCloseMessage = () => {
        setElmMessage(undefined);
    }
    const handleMessage = () => {
        const socket = socketIOClient(ENDPOINT);
        var userID = window.location.pathname.split('/')[2];
        if (userID === userData.userID) return;
        socket.emit('clientCreateMessage', { userID:userData.userID, listUsers: [userID, userData.userID]});
        socket.on('isCreatedMessage', (data) => {
            console.log(data);
            setElmMessage(< CurrentMessage 
                currentMessage={data.message}
                currentMessageName={data.messageName}
                userData={userData}
                handleCloseMessage={handleCloseMessage}
            />)
        })
    }
    useEffect(() => {
        window.scrollTo(0,0);
        var userID = window.location.pathname.split('/')[2];
        fetch(api_url + '/user/finduserbyid/' + userID, {
            method: 'GET',
        }).then(response => response.json()).then(async (data) => {
            setUserInfo(data.result);
            getProvince(data.result.infomation.provinceID);
            getDistrict(data.result.infomation.districtID);
            getSchool(data.result.infomation.schoolID);
        })
    }, []);
    if (userInfo !== undefined){
        return <>
            <div className="row">
                <div className="text-center" style={{ width: "40%", margin: "auto", marginTop: "100px", fontSize: "15px"}}>
                    <i className="fa fa-user-circle fa-5x" aria-hidden="true"></i>
                    <div>Họ tên: {userInfo.infomation.fullName}</div>
                    
                    
                    <div>
                        Trường {schoolName}
                    </div>
                    <div>
                    Quận/huyện: {districtName}
                    </div>
                    <div>
                        Tỉnh/thành phố:  {provinceName}
                    </div>
                    <div>ID: {userInfo.userID}</div> 
                    <div onClick={() => handleMessage()}className="cursor-pointer text-info" style={{fontSize: '14px'}}>(Nhắn tin)</div>
                </div>
            </div>
            <div className="msg-admin-main">
            {elmMessage}
            </div>
        </>
    }
    else return <></>


}
export default UserInfo;