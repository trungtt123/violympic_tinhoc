import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { api_url } from './constants';
import $ from 'jquery';
function ContentListProblem(props) {
    var isLoggedIn = props.isLoggedIn;
    const arrStyleTable = [
        { "width": "5%", "textAlign": "center", "font-size": "14px" },
        { "width": "30%", "textAlign": "center", "font-size": "14px" },
        { "width": "30%", "textAlign": "center", "font-size": "14px" },
        { "width": "15%", "textAlign": "center", "font-size": "14px" },
    ];
    const optionExamIsSolved = [
        {
            title: "Tất cả",
        },
        {
            title: "Đã giải",
        },
        {
            title: "Chưa giải"
        }
    ];
    const optionPersonCreatedExam = [
        {
            title: "Người tạo",
        },
        {
            title: "Của bạn",
        }
    ];
    const optionExamCode = [
        {
            title: "Ghi chú",
        },
        {
            title: "Có mã",
        },
        {
            title: 'Không mã'
        }
    ];
    const history = useHistory();
    if (isLoggedIn === false || isLoggedIn === undefined) {
        history.push('/');
    }

    var userData = props.userData;
    const handleSearchProblem = (data) => {
        if (data === 'Tất cả các dạng bài') {
            $(document).ready(function () {

                var value = data.toLowerCase();
                $("#tableProblem tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf('') > -1)
                });

            });
            return;
        }
        $(document).ready(function () {

            var value = data.toLowerCase();
            $("#tableProblem tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });

        });
    }
    useEffect(() => {


    }, []);
    return (
        <div className="ml-4 mr-4">
            <select onChange={(e) => handleSearchProblem(e.target.value)}
                className="form-select form-select-sm mb-3 mt-5 mb-2 ml-1" style={{ fontSize: "14px" }}>
                <option selected>Tất cả các dạng bài</option>
                <option value="Mức độ dễ">Mức độ dễ</option>
                <option value="Mức độ cơ bản">Mức độ cơ bản</option>
                <option value="Mức độ khó">Mức độ khó</option>
                <option value="Mức độ rất khó">Mức độ rất khó</option>
            </select>
            <div className="row ml-1 mr-1">
                <div style={{ width: "70%" }}>
                    <table className="table table-sm table-hover table-bordered"   >
                        <thead >
                            <tr>
                                <th style={arrStyleTable[0]}>STT</th>
                                <th style={arrStyleTable[1]}>Tên bài tập</th>
                                <th style={arrStyleTable[2]}>Dạng bài</th>
                                <th style={arrStyleTable[3]}>Số người giải được</th>
                            </tr>
                        </thead>
                        <tbody id="tableProblem">
                            <tr>
                                <th style={arrStyleTable[0]}>1</th>
                                <td style={arrStyleTable[1]}>Tổng A + B</td>
                                <td style={arrStyleTable[2]}>Mức độ dễ</td>
                                <td style={arrStyleTable[3]}>12</td>
                            </tr>
                            <tr>
                                <th style={arrStyleTable[0]}>2</th>
                                <td style={arrStyleTable[1]}>Số hoàn hảo</td>
                                <td style={arrStyleTable[2]}>Mức độ dễ</td>
                                <td style={arrStyleTable[3]}>10</td>
                            </tr>
                            <tr>
                                <th style={arrStyleTable[0]}>3</th>
                                <td style={arrStyleTable[1]}>Số nguyên tố</td>
                                <td style={arrStyleTable[2]}>Mức độ dễ</td>
                                <td style={arrStyleTable[3]}>11</td>
                            </tr>
                            <tr>
                                <th style={arrStyleTable[0]}>4</th>
                                <td style={arrStyleTable[1]}>Số fibonacy</td>
                                <td style={arrStyleTable[2]}>Mức độ cơ bản</td>
                                <td style={arrStyleTable[3]}>9</td>
                            </tr>
                            <tr>
                                <th style={arrStyleTable[0]}>5</th>
                                <td style={arrStyleTable[1]}>Tính giai thừa</td>
                                <td style={arrStyleTable[2]}>Mức độ cơ bản</td>
                                <td style={arrStyleTable[3]}>9</td>
                            </tr>
                            <tr>
                                <th style={arrStyleTable[0]}>6</th>
                                <td style={arrStyleTable[1]}>Số bạn bè</td>
                                <td style={arrStyleTable[2]}>Mức độ khó</td>
                                <td style={arrStyleTable[3]}>6</td>
                            </tr>
                            <tr>
                                <th style={arrStyleTable[0]}>7</th>
                                <td style={arrStyleTable[1]}>Cái túi</td>
                                <td style={arrStyleTable[2]}>Mức độ khó</td>
                                <td style={arrStyleTable[3]}>5</td>
                            </tr>
                            <tr>
                                <th style={arrStyleTable[0]}>8</th>
                                <td style={arrStyleTable[1]}>Tổng nguyên tố</td>
                                <td style={arrStyleTable[2]}>Mức độ khó</td>
                                <td style={arrStyleTable[3]}>4</td>
                            </tr>
                            <tr>
                                <th style={arrStyleTable[0]}>9</th>
                                <td style={arrStyleTable[1]}>Trò chơi Line 2</td>
                                <td style={arrStyleTable[2]}>Mức độ khó</td>
                                <td style={arrStyleTable[3]}>2</td>
                            </tr>
                            <tr>
                                <th style={arrStyleTable[0]}>10</th>
                                <td style={arrStyleTable[1]}>Dãy tăng</td>
                                <td style={arrStyleTable[2]}>Mức độ rất khó</td>
                                <td style={arrStyleTable[3]}>1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ width: "20%", marginLeft: "10%" }}>
                    <table className="table table-sm table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>
                                    <span style={{ marginLeft: "10px", fontSize: "14px" }}>Bài tập mới</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            <div style={{ marginLeft: "10px", fontSize: "14px" }}>1. Cái túi</div>
                            <div style={{ marginLeft: "10px", fontSize: "14px" }}>2. Tổng nguyên tố</div>
                            <div style={{ marginLeft: "10px", fontSize: "14px" }}>3. Dãy tăng</div>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ContentListProblem;