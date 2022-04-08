import '../../css/create-problem.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { domain, api_url } from './constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
function EditProblem(props) {
    const history = useHistory();
    var examID = window.location.pathname.split('/')[2];
    var isLoggedIn = props.isLoggedIn;
    const problemID =  window.location.pathname.split('/')[4];
    if (isLoggedIn === false) {
        history.push('/');
    }
    const [currentProblem, setCurrentProblem] = useState();
    const [problemName, setProblemName] = useState();
    const [problemTags, setProblemTags] = useState();
    const [problemMemoryLimit, setProblemMemoryLimit] = useState();
    const [problemIndexSubmitLimit, setProblemIndexSubmitLimit] = useState();
    const [problemContent, setProblemContent] = useState();
    const [problemTestCase, setProblemTestCase] = useState([]);
    const [elmInOut, setElmInOut] = useState();
    const [elmProblemTestCase, setElmProblemTestCase] = useState(<button className="btn btn-sm">Chưa có test nào!</button>);
    const handleSubmitProblem = () => {
        if (problemName === '') {
            alert('Hãy nhập tên của kì thi');
            return;
        }
        if (problemTags === 'Chọn tag dạng bài') {
            alert('Hãy chọn tag dạng bài');
            return;
        }
        if (problemMemoryLimit === '') {
            alert('Hãy nhập giới bạn bộ nhớ');
            return;
        }
        if (problemIndexSubmitLimit === '') {
            alert('Hãy nhập giới hạn số lần nộp');
            return;
        }
        var data = {
            problemName,
            problemTags,
            problemMemoryLimit,
            problemContent,
            problemIndexSubmitLimit,
            problemTestCase,
            examID
        }
        fetch(api_url + '/problem/editproblem/' + problemID, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json()).then( async(data) => {
            if (data.success === true) {
                //console.log(data.result);
                NotificationManager.success("Chỉnh sửa bài tập thành công");
                setTimeout(() => {history.push('/exam/' + examID + '/add-problem')}, 2000);
            }
        });
    }
    const handleChangeProblemName = (e) => {
        setProblemName(e.target.value);
    }
    const handleChangeProblemTags = (e) => {
        setProblemTags(e.target.value);
    }
    const handleChangeProblemMemoryLimit = (e) => {
        setProblemMemoryLimit(e.target.value);
    }
    const handleChangeProblemIndexSubmitLimit = (e) => {
        setProblemIndexSubmitLimit(e.target.value);
    }
    const handleChangeProblemConTent = (data) => {
        setProblemContent(data);
    }
    const handleCancelCreateTestCase = () => {
        setElmInOut(undefined);
    }
    const handleCreateTestCase = () => {
        var data = {
            input: JSON.parse(localStorage.getItem('input')),
            output: JSON.parse(localStorage.getItem('output')),
            timeLimit: JSON.parse(localStorage.getItem('timelimit')),
            score: JSON.parse(localStorage.getItem('score'))
        }
        var arrTmp = problemTestCase;
        arrTmp.push(data);
        setProblemTestCase(arrTmp);
        setElmInOut(undefined);
        var tmpElmProblemTestCase = arrTmp.map((test, index) => {
            return <button className="btn btn-sm mr-1" onClick={() => handleElmEditTest(test, index)}>Test {index + 1}</button>
        });
        setElmProblemTestCase(tmpElmProblemTestCase);
        localStorage.removeItem('input');
        localStorage.removeItem('output');
        localStorage.removeItem('timelimit');
        localStorage.removeItem('score');
    }
    const handleEditTestCase = (test, index) => {
        var data = {
            input: localStorage.getItem('editinput') === null ? test.input : JSON.parse(localStorage.getItem('editinput')),
            output: localStorage.getItem('editoutput') === null ? test.output : JSON.parse(localStorage.getItem('editoutput')),
            timeLimit: localStorage.getItem('edittimelimit') === null ? test.timeLimit : JSON.parse(localStorage.getItem('edittimelimit')),
            score: localStorage.getItem('editscore') === null ? test.score : JSON.parse(localStorage.getItem('editscore'))
        }
        localStorage.removeItem('editinput');
        localStorage.removeItem('editoutput');
        localStorage.removeItem('edittimelimit');
        localStorage.removeItem('editscore');
        var arrTmp = problemTestCase;
        arrTmp[index] = data;
        setProblemTestCase(arrTmp);
        setElmInOut(undefined);
        var tmpElmProblemTestCase = arrTmp.map((test, index) => {
            return <button className="btn btn-sm mr-1" onClick={() => handleElmEditTest(test, index)}>Test {index + 1}</button>
        });
        setElmProblemTestCase(tmpElmProblemTestCase);
    }
    const handleDeleteTestCase = (index) => {
        var arrTmp = problemTestCase;
        arrTmp.splice(index, 1);
        setProblemTestCase(arrTmp);
        setElmInOut(undefined);
        var tmpElmProblemTestCase = arrTmp.map((test, index) => {
            return <button className="btn btn-sm mr-1" onClick={() => handleElmEditTest(test, index)}>Test {index + 1}</button>
        });
        if (arrTmp.length === 0) setElmProblemTestCase(<button className="btn btn-sm">Chưa có test nào!</button>)
        else setElmProblemTestCase(tmpElmProblemTestCase);
    }
    const handleElmEditTest = (test, index) => {
        var time = test.timeLimit + '(s)';
        var score = test.score + ' điểm';
        var elmtmp = <>
            <div className="col-25">
                <label htmlFor="fname">Thêm test</label>
            </div>
            <div className="col-75">
                <div className="col-50">
                    <label htmlFor="fname">Input</label>
                    <div className="border">
                        <CodeMirror
                            value={test.input}
                            options={{
                                mode: 'javascript',
                                lineNumbers: true,
                                lint: true,
                            }}
                            onChange={(editor, data, value) => getEditInput(editor, data, value)}
                        />
                    </div>
                </div>
                <div className="col-50">
                    <label htmlFor="fname">Output</label>
                    <div className="border">
                        <CodeMirror
                            value={test.output}
                            options={{
                                mode: 'javascript',
                                lineNumbers: true,
                                lint: true,
                            }}
                            onChange={(editor, data, value) => getEditOutput(editor, data, value)}
                        />
                    </div>
                </div>

            </div>

            <div className="col-25 mt-4">Giới hạn thời gian</div>
            <div className="col-25 mt-3">
                <input type="text" placeholder={time} onChange={(e) => getEditTimeOfTest(e)} />
            </div>
            <div className="col-50"></div>
            <div className="col-25 mt-4">Điểm</div>
            <div className="col-25 mt-3">
                <input type="text" placeholder={score} onChange={(e) => getEditScoreOfTest(e)} />
            </div>
            <div className="col-25 ml-3">
                <button className="btn btn-info mr-1" onClick={() => handleEditTestCase(test, index)}>Sửa</button>
                <button className="btn btn-danger" onClick={() => handleDeleteTestCase(index)}>Xóa</button>
            </div>
        </>
        setElmInOut(elmtmp);
    }
    const getInput = (editor, data, value) => {
        localStorage.setItem('input', JSON.stringify(value));
    }
    const getEditInput = (editor, data, value) => {
        localStorage.setItem('editinput', JSON.stringify(value));
    }
    const getEditOutput = (editor, data, value) => {
        localStorage.setItem('editoutput', JSON.stringify(value));
    }
    const getOutput = (editor, data, value) => {
        localStorage.setItem('output', JSON.stringify(value))
    }
    const getEditTimeOfTest = (e) => {
        localStorage.setItem('edittimelimit', JSON.stringify(e.target.value));
    }
    const getTimeOfTest = (e) => {
        localStorage.setItem('timelimit', JSON.stringify(e.target.value));
    }
    const getEditScoreOfTest = (e) => {
        localStorage.setItem('editscore', JSON.stringify(e.target.value));
    }
    const getScoreOfTest = (e) => {
        console.log(e.target.value);
        localStorage.setItem('score', JSON.stringify(e.target.value));
    }
    const handleAddTestCase = () => {
        var elmtmp = <>
            <div className="col-25">
                <label htmlFor="fname">Thêm test</label>
            </div>
            <div className="col-75">
                <div className="col-50">
                    <label htmlFor="fname">Input</label>
                    <div className="border">
                        <CodeMirror
                            options={{
                                mode: 'javascript',
                                lineNumbers: true,
                                lint: true,
                            }}
                            onChange={(editor, data, value) => getInput(editor, data, value)}
                        />
                    </div>
                </div>
                <div className="col-50">
                    <label htmlFor="fname">Output</label>
                    <div className="border">
                        <CodeMirror
                            options={{
                                mode: 'javascript',
                                lineNumbers: true,
                                lint: true,
                            }}
                            onChange={(editor, data, value) => getOutput(editor, data, value)}
                        />
                    </div>
                </div>

            </div>

            <div className="col-25 mt-4">Giới hạn thời gian</div>
            <div className="col-25 mt-3">
                <input type="text" placeholder="Tính theo giây (s)" onChange={(e) => getTimeOfTest(e)} />
            </div>
            <div className="col-50"></div>
            <div className="col-25 mt-4">Điểm</div>
            <div className="col-25 mt-3">
                <input type="text" placeholder="Nhập điểm của test (nhập số dương)" onChange={(e) => getScoreOfTest(e)} />
            </div>
            <div className="col-25 ml-3">
                <button className="btn btn-info mr-1" onClick={() => handleCreateTestCase()}>Tạo</button>
                <button className="btn btn-danger" onClick={() => handleCancelCreateTestCase()}>Hủy</button>
            </div>


        </>
        setElmInOut(elmtmp);
    }

    useEffect(()=>{
        fetch(api_url + '/problem/getproblem/' + problemID, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.success === true) {
                console.log(data.result);
                setProblemTestCase(data.result.problemTestCase);
                setCurrentProblem(data.result);
                
                
                var tmpElmProblemTestCase = data.result.problemTestCase.map((test, index) => {
                    return <button className="btn btn-sm mr-1" onClick={() => handleElmEditTest(test, index)}>Test {index + 1}</button>
                });
                if (data.result.problemTestCase.length === 0) setElmProblemTestCase(<button className="btn btn-sm">Chưa có test nào!</button>)
                else setElmProblemTestCase(tmpElmProblemTestCase);
                
            }
        });

    },[]);
    if (currentProblem !== undefined)
    return <>
        <NotificationContainer />
        <div className="create-exam">
            
            <h4 className="text-info ml-4 mt-5 text-center mb-3">Chỉnh sửa bài tập</h4>
            <div className="problem">
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Tên bài</label>
                    </div>
                    <div className="col-25">
                        <input type="text" name="examname" defaultValue={currentProblem.problemName}
                        placeholder="Tên bài" onChange={(e) => handleChangeProblemName(e)} />
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Tag</label>
                    </div>
                    <div className="col-25">
                        <select className="form-select" onChange={(e) => handleChangeProblemTags(e)} defaultValue={currentProblem.problemTags}>
                            <option value="Chọn tag dạng bài">Chọn tag dạng bài</option>
                            <option value="Mức độ dễ">Mức độ dễ</option>
                            <option value="Mức độ cơ bản">Mức độ cơ bản</option>
                            <option value="Mức độ khó">Mức độ khó</option>
                            <option value="Mức độ rất khó">Mức độ rất khó</option>
                        </select>
                        {/* <input type="text" name="examname" placeholder="Tags" onChange={(e) => handleChangeProblemTags(e)} /> */}
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Giới hạn bộ nhớ</label>
                    </div>
                    <div className="col-25">
                        <input type="text" defaultValue={currentProblem.problemMemoryLimit}
                        name="examname" placeholder="Giới hạn bộ nhớ" onChange={(e) => handleChangeProblemMemoryLimit(e)} />
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Giới hạn số lần nộp</label>
                    </div>
                    <div className="col-25">
                        <input type="text" defaultValue={currentProblem.problemIndexSubmitLimit}
                         name="examname" placeholder="Giới hạn số lần nộp" onChange={(e) => handleChangeProblemIndexSubmitLimit(e)} />
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Đề bài</label>
                    </div>
                    <div className="col-75">
                        <CKEditor
                            editor={ClassicEditor}
                            data={currentProblem.problemContent}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                handleChangeProblemConTent(data);
                                console.log({ event, editor, data });
                            }}
                        />
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Test case</label>
                    </div>
                    <div className="col-75">
                        {elmProblemTestCase}
                    </div>
                    {elmInOut}
                    <div className="col-75">
                        <button className="btn btn-info" onClick={() => handleAddTestCase()}>Tạo test</button>
                    </div>
                </div>
                <div className="row ml-4 mt-4 mb-3">
                    <input type="submit" value="Gửi" onClick={() => handleSubmitProblem()} />
                </div>
            </div>
        </div>
    </>
    else return <></>
}
export default EditProblem;