import '../../css/create-problem.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { domain, api_url } from './constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
function AddProblem(props) {
    const history = useHistory();
    var examID = window.location.pathname.split('/')[2];
    var isLoggedIn = props.isLoggedIn;
    if (isLoggedIn === false) {
        history.push('/');
    }
    const [elmListProblem, setElmListProblem] = useState();
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
        console.log(data);
        fetch(api_url + '/problem/createproblem/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            if (data.success === true) {
                NotificationManager.success("Tạo bài tập thành công");
                setTimeout(function () {

                    window.location.reload()
                }, 2000);
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
    const handleSelectProblem = (problem) => {
        fetch(api_url + '/exam/selectproblem/' + examID + '/' + problem._id, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.success === true) {
                NotificationManager.success("Chọn bài tập thành công");
                setTimeout(function () {
                    window.location.reload()
                }, 2000);
            }
        });
    }
    const handleUnSelectProblem = (problem) => {
        fetch(api_url + '/exam/unselectproblem/' + examID + '/' + problem._id, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.success === true) {
                NotificationManager.success("Bỏ chọn bài tập thành công");
                setTimeout(function () {
                    window.location.reload()
                }, 2000);
            }
        });
    }
    const handleEditProblem = (problem) => {
        history.push('/exam/' + examID + '/edit-problem/' + problem._id);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(api_url + '/exam/getallproblemofexam/' + examID, {
            method: 'GET',
        }).then(response => response.json()).then(data => {
            if (data.success === true) {
                var elmTmp = data.result.map((problem, index) => {
                    var title;
                    if (problem.isSelected === true)
                        title = <div className="list-group-item cursor-pointer rounded"
                            style={{ backgroundColor: "#69c5de", color: 'white' }}>
                            Bài {index + 1}: {problem.problemName}
                        </div>
                    else title = <div className="list-group-item cursor-pointer rounded">
                        Bài {index + 1}: {problem.problemName}</div>
                    return <>

                        <div className="btnControl mb-2">
                            {title}
                            <button className="btn btn-info btn-sm mr-1" onClick={() => handleSelectProblem(problem)}>Chọn</button>
                            <button className="btn btn-success btn-sm mr-1" onClick={() => handleUnSelectProblem(problem)}>Bỏ chọn</button>
                            <button className="btn btn-warning btn-sm text-light mr-1" onClick={() => handleEditProblem(problem)}>Chỉnh sửa</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleEditProblem(problem)}>Xóa</button>
                        </div>
                    </>
                })
                setElmListProblem(elmTmp);
            }
        });

    }, []);
    return <>
        <NotificationContainer />
        <div className="create-exam">
            <div className="d-flex justify-content-center mt-5 mb-3 text-info">
                <h5>Danh sách bài tập</h5>
            </div>
            <div className="content-list-problem mb-5">
                {elmListProblem}
            </div>

            <h4 className="text-info ml-4 text-center mb-3">Tạo bài tập</h4>
            <div className="problem">
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Tên bài</label>
                    </div>
                    <div className="col-25">
                        <input type="text" name="examname" placeholder="Tên bài" onChange={(e) => handleChangeProblemName(e)} />
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Tag</label>
                    </div>
                    <div className="col-25">
                        <select className="form-select" onChange={(e) => handleChangeProblemTags(e)}>
                            <option selected>Chọn tag dạng bài</option>
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
                        <input type="text" name="examname" placeholder="Giới hạn bộ nhớ" onChange={(e) => handleChangeProblemMemoryLimit(e)} />
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Giới hạn số lần nộp</label>
                    </div>
                    <div className="col-25">
                        <input type="text" name="examname" placeholder="Giới hạn số lần nộp" onChange={(e) => handleChangeProblemIndexSubmitLimit(e)} />
                    </div>
                </div>
                <div className="row ml-4">
                    <div className="col-25">
                        <label htmlFor="fname">Đề bài</label>
                    </div>
                    <div className="col-75">
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Nhập đề bài</p>"
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
}
export default AddProblem;