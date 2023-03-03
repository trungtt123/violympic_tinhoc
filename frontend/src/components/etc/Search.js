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
function Search(props) {
    const history = useHistory();
    const [elmListUser, setElmListUser] = useState();
    const [elmListExam, setElmListExam] = useState();
    const [elmNone, setElmNone] = useState();
    useEffect(() => {
        const keyword = decodeURIComponent(window.location.pathname.split('/')[2]);
        fetch(api_url + '/search/' + keyword, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            console.log(data);
            if (data.users.length === 0 && data.exams.length === 0) {
                setElmNone(<div style={{ fontSize: "14px" }}>Không có kết quả tìm thấy</div>);
                return;
            }
            if (data.users.length > 0) {
                var elmUser = <table className="table table-sm table-hover table-bordered" style={{ fontSize: "14px", width: "50%" }} >
                    <thead>
                        <tr>
                            <td className="bg-light" >Người dùng</td>

                        </tr>
                    </thead>
                    <tbody >
                        {data.users.map((user, index) => {
                            return <tr key={index} className="cursor-pointer">
                                <td onClick={() => history.push('/user-info/' + user._id)}>{user._id} - {user.infomation.fullName}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                setElmListUser(elmUser);
            }
            if (data.exams.length > 0) {
                var elmExam = <table className="table table-sm table-hover table-bordered" style={{ fontSize: "14px", width: "50%" }} >
                    <thead>
                        <tr>
                            <td className="bg-light" >Kì thi</td>

                        </tr>
                    </thead>
                    <tbody >
                        {data.exams.map((exam, index) => {
                            return <tr key={index} className="cursor-pointer">
                                <td onClick={() => history.push({ pathname: '/exam/' + exam._id, state: { exam } })}>{exam._id} - {exam.examName}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                setElmListExam(elmExam);
            }
        });
    }, [])
    return <div className="mt-5 ml-4">
        <h6>Kết quả tìm kiếm</h6>
        {elmNone}
        {elmListUser}
        {elmListExam}
    </div>


}
export default Search;