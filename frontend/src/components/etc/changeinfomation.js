import '../../css/login.css';
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { api_url, domain} from './constants';
function ChangeInfomation(props) {
    var isLoggedIn = props.isLoggedIn;
    const history = useHistory();
    if (isLoggedIn === false || isLoggedIn === undefined){
        history.push('/');
    }
    var isShowChangeInfomation = props.isShowChangeInfomation;
    var userData = props.userData;
    const [optionProvince, setOptionProvince] = useState();
    const [optionDistrict, setOptionDistrict] = useState();
    const [optionSchool, setOptionSchool] = useState();
    const [fullName, setFullName] = useState();
    const [provinceID, setProvinceID] = useState();
    const [districtID, setDistrictID] = useState();
    const [schoolID, setSchoolID] = useState();
    const [permissionID, setPermissionID] = useState();
    const handleCancelChangeInfomation = () => {
        history.push('/');
    }
    const handleSubmitChangeInfomation = () => {
        var data = {
            token: userData.token,
            infomation: {
                fullName,
                provinceID,
                districtID,
                schoolID,
                permissionID: userData.infomation.permissionID
            }
        }
        fetch(api_url + '/user/changeinfomation', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json()).then(userData => {
            localStorage.removeItem('userData');
            //console.log(userData);
            localStorage.setItem('userData', JSON.stringify(userData.userData));
            alert("Thay đổi thông tin thành công");
            window.location.href = domain;
        });


        // call api create user -> get token of user
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
    const handleSelectPermission = () => {
        alert('Bạn không thể thay đổi mục này !!');
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
                var provinces = data.data;
                var elmtmp = provinces.map((province, index) => {
                    return <option key={index} value = {province.ProvinceID}>{province.ProvinceName}</option>
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
                var elmtmp = districts.map((district, index) => {
                    if (district.ProvinceID == provinceID) {
                        return <option key={index} value={district.DistrictID}>{district.DistrictName}</option>
                    }
                });
                setOptionDistrict(elmtmp);
            });
    }
    const getSchool = (districtID) => {
        fetch(api_url + '/school/getallschool/' + districtID , {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                var listSchool = data.listSchool;
                var elmtmp = listSchool.map((school, index) => {
                    if (school.DistrictID == districtID) {
                        return <option key={index} value={school._id}>{school.SchoolName}</option>
                    }
                });
                setOptionSchool(elmtmp);
            });
    }
    useEffect(() => {
        if (userData !== null && userData !== undefined) {
            setFullName(userData.infomation.fullName);
            setDistrictID(userData.infomation.districtID);
            setProvinceID(userData.infomation.provinceID);
            setSchoolID(userData.infomation.schoolID);
            setPermissionID(userData.infomation.permissionID);
            getProvince();
            getDistrict(userData.infomation.provinceID);
            getSchool(userData.infomation.districtID);
        }
    }, []);
    if (isShowChangeInfomation === true) {
        return (
            <div className="login wrapper">
                <div className="fadeInDown">
                    <div id="formContent">
                        <h2 className="text-info">Thay đổi thông tin</h2>
                        <div>
                            <input type="text" id="fullname" className="fadeIn second"
                                name="fullname" value={fullName}
                                onChange={(e) => handleChangeFullName(e)} />
                            <select className="fadeIn first text-center" value={provinceID} onChange={(e) => handleSelectProvince(e)}>
                                {optionProvince}
                            </select>
                            <select className="fadeIn first text-center" value={districtID} onChange={(e) => handleSelectDistrict(e)} >
                                {optionDistrict}
                            </select>
                            <select className="fadeIn second text-center" value={schoolID} onChange={(e) => handleSelectSchool(e)} >
                                {optionSchool}
                            </select>
                            <select className="fadeIn first text-center" disabled value={permissionID}>
                                <option value="">Chức vụ</option>
                                <option value="0">Học sinh</option>
                                <option value="1">Giáo viên</option>
                                <option value="2">Chuyên viên</option>
                            </select>
                            <input type="submit" className="fadeIn fourth" value="Gửi" onClick={() => handleSubmitChangeInfomation()} />
                            <input type="submit" className="fadeIn fourth" value="Hủy" onClick={() => handleCancelChangeInfomation()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else return <> </>;
}
export default ChangeInfomation;