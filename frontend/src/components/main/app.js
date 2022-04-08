import NavBar from '../etc/navbar';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../etc/header';
import '../../css/home.css';
import Content from './content';
import Footer from '../etc/footer';
import {api_url} from '../etc/constants';
import Menu from '../etc/menu';
import MyMessage from '../etc/mymessage';
import 'react-notifications/lib/notifications.css';

function App(props) {

    
    const userData = JSON.parse(localStorage.getItem('userData'));
    var isLoggedIn = false;
    const [provinceName, setProvinceName] = useState();
    const [districtName, setDistrictName] = useState();
    const [schoolName, setSchoolName] = useState();
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
                var provinces = data?.data;
                provinces?.forEach(province => {
                    if (province.ProvinceID == provinceID) {
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
                var districts = data?.data;
                districts?.forEach(district => {
                    if (district.DistrictID == districtID) {
                        setDistrictName(district.DistrictName);
                        return;
                    }
                });

            });
    }
    const getSchool = (schoolID) => {
        fetch(api_url + '/school/getschoolfromid/' + schoolID , {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                var school = data?.school;
                setSchoolName(school.SchoolName);
            });
    }
    if (userData !== undefined && userData !== null) {
        isLoggedIn = true;
        getProvince(userData.infomation.provinceID);
        getDistrict(userData.infomation.districtID);
        getSchool(userData.infomation.schoolID);
    }
    const [positionSeeMoreForm, setPositionSeeMoreForm] = useState({ display: 'none' });
    const handleClickLogOut = () => {
        localStorage.removeItem('userData');
        window.location.reload();
    }
    const handleMoveSeeMore = () => {
        var rect = document.getElementById("seemoreinfomationuser").getBoundingClientRect();
        var position = {
            top: (rect.top + rect.bottom) / 2 + 20,
            left: (rect.left + rect.right) / 2 - 180,
            display: 'block'
        }
        setPositionSeeMoreForm(position);
    }
    const handleLeaveSeeMore = () => {
        setPositionSeeMoreForm({ display: 'none' });
    }
    if (isLoggedIn === true) {
        return (
            <div style={{backgroundColor: 'aliceblue'}}>
                <Header isLoggedIn={isLoggedIn} userData={userData} userAddress={{provinceName, districtName, schoolName}}/>
                <Menu userData={userData}/>
                <MyMessage isLoggedIn={isLoggedIn} userData={userData}/>
                <div className="row cancel">
                    <div className="col-md-10 mx-auto">
                    </div>
                </div>
                <NavBar isLoggedIn={isLoggedIn} />
                <Content isLoggedIn={isLoggedIn} userData={userData} userAddress={{provinceName, districtName, schoolName}}/>
                <Footer />
            </div>
        );
    }
    else {
        return (
            <div style={{backgroundColor: 'aliceblue'}}>
                <Header />
                <div className="row">
                    <div className="col-md-12 mx-auto">
                    </div>
                </div>
                <NavBar isLoggedIn={isLoggedIn} />
                <Content isLoggedIn={isLoggedIn} />
                <Footer />
            </div>
        );
    }

}
export default App;