import '../../css/login.css';
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { api_url, domain } from './constants';
function Register(props) {
    var isShowRegister = props.isShowRegister;
    var isLoggedIn = props.isLoggedIn;
    if (isLoggedIn === true) {
        window.location.href = domain;
    }
    const history = useHistory();
    const [optionProvince, setOptionProvince] = useState();
    const [optionDistrict, setOptionDistrict] = useState();
    const [optionSchool, setOptionSchool] = useState();
    const [fullName, setFullName] = useState();
    const [userName, setUserName] = useState();
    const [passWord, setPassWord] = useState();
    const [passWordAgain, setPassWordAgain] = useState();
    const [provinceID, setProvinceID] = useState();
    const [districtID, setDistrictID] = useState();
    const [schoolID, setSchoolID] = useState();
    const [permissionID, setPermissionID] = useState();
    const [optionExamLevel, setOptionExamLevel] = useState();
    const handleCancelRegister = () => {
        history.push('/');
    }
    const handleSubmitRegister = () => {
        if (passWordAgain !== passWord) {
            alert("Nhập lại mật khẩu không đúng!");
            return;
        }
        var data = {
            userName,
            passWord,
            infomation: {
                fullName,
                provinceID,
                districtID,
                schoolID,
                permissionID,
                examLevel: optionExamLevel
            }
        }
        console.log(data);
        fetch(api_url + '/user/createuser', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json()).then(userData => {
            localStorage.setItem('userData', JSON.stringify(userData.userData));
            window.location.href = domain;
        });


        // call api create user -> get token of user


    }
    const handleChangePassWordAgain = (e) => {
        setPassWordAgain(e.target.value);
    }
    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    }
    const handleChangePassWord = (e) => {
        setPassWord(e.target.value);
    }
    const handleChangeFullName = (e) => {
        setFullName(e.target.value);
    }
    const handleSelectSchool = (e) => {
        setSchoolID(e.target.value);
    }
    const handleSelectProvince = (e) => {
        setProvinceID(e.target.value);
        getDistrict(e.target.value);
    }
    const handleSelectDistrict = (e) => {
        setDistrictID(e.target.value);
        getSchool(e.target.value);
    }
    const handleSelectPermission = (e) => {
        setPermissionID(e.target.value);
    }
    const getProvince = () => {
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            method: 'GET',
            headers: {
                'token': 'ff998f5d-a65e-11eb-8be2-c21e19fc6803',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var provinces = data.data;
                var elmtmp = provinces.map((province, index) => {
                    return <option key={index} value={province.ProvinceID}>{province.ProvinceName}</option>
                });
                setOptionProvince(elmtmp);
            });
    }

    const getDistrict = (provinceID) => {
        function filterByID(item) {
            if (item.ProvinceID == provinceID) {
                return true;
            }
            return false;
        }
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
            method: 'GET',
            headers: {
                'token': 'ff998f5d-a65e-11eb-8be2-c21e19fc6803',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                var districts = data.data.filter(filterByID);
                console.log(districts);
                var elmtmp = districts.map((district, index) => {
                    if (district.ProvinceID == provinceID) {
                        return <option key={index} value={district.DistrictID}>{district.DistrictName}</option>
                    }
                });
                setOptionDistrict(elmtmp);
            });
    }
    const getSchool = (districtID) => {
        fetch(api_url + '/school/getallschool/' + districtID, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                var listSchool = data.listSchool;
                console.log(listSchool);
                var elmtmp = listSchool.map((school, index) => {
                    if (school.DistrictID == districtID) {
                        return <option key={index} value={school._id}>{school.SchoolName}</option>
                    }
                });
                setOptionSchool(elmtmp);
            });
    }
    useEffect(() => {
        getProvince();
    }, []);
    if (isShowRegister === true) {
        return (
            <div className="login wrapper">
                <div className="fadeInDown">
                    <div id="formContent">
                        <h2 className="text-info">Đăng kí</h2>
                        <div>
                            <input type="text" id="fullname" className="fadeIn second"
                                name="fullname" placeholder="Họ và tên"
                                onChange={(e) => handleChangeFullName(e)} />
                            <select className="fadeIn first text-center" onChange={(e) => handleSelectProvince(e)}>
                                <option value="">Tỉnh/Thành phố</option>
                                {optionProvince}
                            </select>
                            <select className="fadeIn first text-center" onChange={(e) => handleSelectDistrict(e)} >
                                <option value="">Quận/Huyện</option>
                                {optionDistrict}
                            </select>

                            <select className="fadeIn second text-center" onChange={(e) => handleSelectSchool(e)} >
                                <option value="">Trường học/Trung tâm giáo dục</option>
                                {optionSchool}
                            </select>
                            <select className="fadeIn first text-center" onChange={(e) => handleSelectPermission(e)} >
                                <option value="">Đối tượng</option>
                                <option value="0">Học sinh</option>
                                <option value="1">Giáo viên</option>
                                <option value="2">Chuyên viên</option>
                            </select>

                            <div className="float-left ml-4">
                                <input className="ml-5 cursor-pointer" type="checkbox" 
                                    checked = {(optionExamLevel === 1)}
                                    onChange={() => setOptionExamLevel(1)}/> THCS
                                <input className="ml-5 cursor-pointer" type="checkbox" 
                                    checked = {(optionExamLevel === 2)}
                                    onChange={() => setOptionExamLevel(2)}/> THPT
                                <input className="ml-5 cursor-pointer" type="checkbox" 
                                    checked = {(optionExamLevel === 0)}
                                    onChange={() => setOptionExamLevel(0)}/> Cả hai
                            </div>


                            <input type="text" id="username" className="fadeIn second"
                                name="username" placeholder="Tên đăng nhập"
                                onChange={(e) => handleChangeUserName(e)} />
                            <input type="password" id="password" className="fadeIn third"
                                name="password" placeholder="Mật khẩu"
                                onChange={(e) => handleChangePassWord(e)} />
                            <input type="password" id="passwordagain" className="fadeIn third"
                                name="passwordagain" placeholder="Nhập lại mật khẩu"
                                onChange={(e) => handleChangePassWordAgain(e)} />
                            <input type="submit" className="fadeIn fourth" value="Gửi" onClick={() => handleSubmitRegister()} />
                            <input type="submit" className="fadeIn fourth" value="Hủy" onClick={() => handleCancelRegister()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else return <> </>;
}
export default Register;