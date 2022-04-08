import '../../css/create-problem.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { domain, api_url } from './constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ContentListExam from './contentlistexam';
import ContentListProblem from './contentlistproblem';

function Practice(props) {
    const history = useHistory();
    var isLoggedIn = props.isLoggedIn;
    if (isLoggedIn === false) {
        window.location.href = domain + '/login';
    }
    const [checked, setChecked] = useState(true);
    if (checked === true) {
        return (
            <>
                <NotificationContainer />
                <div className="form-check-control ml-5 mt-2" style={{marginBottom: "20px"}}>
                    <input className="form-check-input" type="checkbox" checked={checked} onChange={() => setChecked(true)} />
                    <label className="form-check-label mr-5" style={{fontSize: "15px"}}>Kì thi thử</label>
                    <input className="form-check-input" type="checkbox" checked={!checked} onChange={() => setChecked(false)} />
                    <label className="form-check-label" style={{fontSize: "15px"}}>Bài tập</label>
                </div>
                <ContentListExam userData={props.userData}
                    isLoggedIn={props.isLoggedIn}
                    userAddress={props.userAddress}
                />

            </>
        );
    }
    else return (
        <>
            <NotificationContainer />
            <div className="form-check-control ml-5 mt-2" style={{marginBottom: "20px"}}>
                    <input className="form-check-input" type="checkbox" checked={checked} onChange={() => setChecked(true)} />
                    <label className="form-check-label mr-5" style={{fontSize: "15px"}}>Kì thi thử</label>
                    <input className="form-check-input" type="checkbox" checked={!checked} onChange={() => setChecked(false)} />
                    <label className="form-check-label" style={{fontSize: "15px"}}>Bài tập</label>
            </div>
            <ContentListProblem userData={props.userData}
                isLoggedIn={props.isLoggedIn}
                userAddress={props.userAddress}
            />

        </>
    );

}
export default Practice;