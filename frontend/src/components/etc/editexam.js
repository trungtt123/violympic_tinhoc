import React, { useState, useEffect, useRef } from 'react';
import '../../css/create-exam.css';
import { useHistory } from 'react-router-dom';
import { api_url, adminID } from './constants';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Calendar from './Calendar';
function EditExam(props) {
    var isLoggedIn = props.isLoggedIn;

    var userData = props.userData;
    var arrHours = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
    var arrMinutes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
        "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
    const history = useHistory();
    const [currentExam, setCurrentExam] = useState();
    const [examName, setExamName] = useState();
    const [selectedHour, setSelectHour] = useState(arrHours[0]);
    const [selectedMinute, setSelectMinute] = useState(arrMinutes[0]);
    const [selectNotTime, setSelectNotTime] = useState(false);
    const [selectRange, setSelectRange] = useState(false);
    const [examCode, setExamCode] = useState();
    const [examOpenTime, setExamOpenTime] = useState();
    const [memberList, setMemberList] = useState([]);
    const [memberID, setMemberID] = useState();
    const [examLevel, setExamLevel] = useState();
    const [elmMemberList, setElmMemberList] = useState(<button className="btn btn-sm">Chưa có thí sinh nào!</button>);
    const handleChangeRange = () => {
        !selectRange ? setElmMemberList(undefined) : setElmMemberList(<button className="btn btn-sm">Chưa có thí sinh nào!</button>);
        !selectRange ? setMemberList(undefined) : setMemberList([]);
        setSelectRange(!selectRange);
    }
    const handleChangeHour = (e) => {
        setSelectHour(e.target.value);
    }
    const handleChangeMinute = (e) => {
        setSelectMinute(e.target.value);
    }
    const handleSubmitExam = () => {
        const isExamRound = userData.userID === adminID ? true : false
        var data = {
            isCreatedBy: userData.userID,
            examName,
            examCode,
            examOpenTime,
            examTime: (selectNotTime) ? undefined : {selectedHour, selectedMinute},
            memberList: memberList,
            isExamForAll: selectRange,
            isExamRound,
            examLevel
        }
        fetch(api_url + '/exam/editexam/' + currentExam._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            if (data.success === true) {
                NotificationManager.success('Chỉnh sửa thành công');
                setTimeout(()=>{
                    history.push('/my-list-exam');
                },2000);
                
                window.scrollTo(0,0);
            }
        });
    }
    const handleSearchMember = () => {
        if (memberID === undefined) {
            alert('Hãy nhập mã thí sinh');
            return;
        }
        fetch(api_url + '/user/finduserbyid/' + memberID, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",
        }).then(response => response.json()).then(data => {
            try {
                let arrTmp = memberList;

                for (let i = 0; i < arrTmp.length; i++) {
                    if (arrTmp[i].userID === data.result.userID) {
                        alert('Thí sinh này đã được thêm!');
                        return;
                    }
                }
                arrTmp.push(data.result);
                setMemberList(arrTmp);
                var elmTmp = arrTmp.map((item, index) => {
                    return <button key={index} className="btn btn-sm mr-1">{item.infomation.fullName}</button>;
                });
                setElmMemberList(elmTmp);
                setMemberID('');
            }
            catch (e) {
                alert('Sai mã thí sinh hoặc thí sinh không tồn tại?!')
            }
        });
    }
    const handleChangeMemberID = (e) => {
        setMemberID(e.target.value);
    }
    const handleChangeExamName = (e) => {
        setExamName(e.target.value);
    }
    const handleChangeExamCode = (e) => {
        setExamCode(e.target.value);
    }
    const callBackSaveTimeExam = (time) => {
        setExamOpenTime(time);
    }
    useEffect(() => {
        var examID = window.location.pathname.split('/')[2];
        fetch(api_url + '/exam/getexam/' + examID, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    console.log(data.result);
                    setCurrentExam(data.result);
                    setExamLevel(data.result.examLevel);
                    setSelectRange(data.result.isExamForAll);
                    if (data.result.isExamForAll === false){
                        if (data.result.memberList.length === 0)
                        setElmMemberList(<button className="btn btn-sm">Chưa có thí sinh nào!</button>);
                        else {
                            var elmTmp = data.result.memberList.map((item, index) => {
                                return <button key={index} className="btn btn-sm mr-1">{item.infomation.fullName}</button>;
                            });
                            setElmMemberList(elmTmp);
                        }
                    }
                    else {
                        setElmMemberList(undefined)
                    }
                    setMemberList(data.result.memberList);
                    if (data.result.examTime === undefined ) {
                        setSelectNotTime(true);
                    }
                    else {
                        setSelectHour(data.result.examTime.selectedHour);
                        setSelectMinute(data.result.examTime.selectedMinute);
                    }
                }
            });
    }, []);
    if (currentExam !== undefined)
    return (
        <>
            <NotificationContainer />
            <div className="create-exam">
                <h5 className="text-center" style={{ marginTop: "25px", marginBottom: "25px" }}>
                    Chỉnh sửa kì thi kì thi
                </h5>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Tên kì thi</label>
                    </div>
                    <div className="col-25">
                        <input type="text" placeholder="Tên kì thi" defaultValue={currentExam.examName} onChange={(e) => handleChangeExamName(e)} />
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="country">Mã code</label>
                    </div>
                    <div className="col-25">
                        <input type="text" placeholder="Mã code" defaultValue={currentExam.examCode} onChange={(e) => handleChangeExamCode(e)} />
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Khối thi</label>
                    </div>
                    <div className="mt-3">
                        <input type="checkbox" className="mr-2"
                            checked={(examLevel === 1)} 
                            onChange={() => setExamLevel(1)}></input>THCS

                        <input type="checkbox" className="ml-5 mr-2"
                            checked={(examLevel === 2)}
                            onChange={() => setExamLevel(2)}></input>THPT
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="country">Danh sách thí sinh</label>
                    </div>
                    <div className="col-75">
                        {elmMemberList}
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">

                    </div>
                    <div className="col-25 mr-3">
                        <input className="mt-2" type="text" value={memberID}
                        disabled={(selectRange ? true : false)} placeholder="Nhập ID thí sinh. . ." onChange={(e) => handleChangeMemberID(e)} />

                    </div>

                </div>
                <div className="row ml-4">
                    <div className="col-25"></div>
                    <div className="col-25">
                        <button className="btn btn-sm btn-info" disabled={selectRange ? true : false} onClick={() => handleSearchMember()}>Thêm</button>

                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25"></div>
                    <div className="col-25 ml-4">
                        <input className="form-check-input mt-3" type="checkbox" checked={selectRange} onChange={() => handleChangeRange()} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Dành cho tất cả thí sinh
                            </label>
                    </div>
                </div>

                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="country">Thời gian mở</label>
                    </div>
                    <div className="col-25">
                        <Calendar examOpenTime={currentExam.examOpenTime} disableCalendar={true} callBackSaveTimeExam={callBackSaveTimeExam} />
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Thời gian làm bài</label>
                    </div>
                    <div className="col-25 mt-3">Chọn giờ:
                    <select onChange={handleChangeHour} value={selectedHour} disabled={selectNotTime}>
                            {arrHours.map((item, index) => (
                                <option key={index + 1} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>


                </div>
                <div className="row ml-4">
                    <div className="col-25">

                    </div>

                    <div className="col-25 mt-3">Chọn phút:
                    <select onChange={handleChangeMinute} value={selectedMinute} disabled={selectNotTime}>
                            {arrMinutes.map((item, index) => (
                                <option key={index + 1} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25"></div>
                    <div className="col-25 ml-4">
                        <input className="form-check-input mt-3" type="checkbox" checked={selectNotTime} onChange={() => setSelectNotTime(!selectNotTime)} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Không đặt thời gian
                            </label>
                    </div>
                </div>
                <div className="row ml-4 mb-4">
                    <input type="submit" value="Gửi" onClick={() => handleSubmitExam()} />
                </div>
            </div>
        </>
    );
    else return <></>
}
export default EditExam;