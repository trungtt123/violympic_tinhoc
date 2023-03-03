import React, { useState, useEffect, useRef } from 'react';
import Login from '../etc/Login';
import Register from '../etc/Register';
import ChangeInfomation from '../etc/ChangeInfomation';
import ChangePassWord from '../etc/ChangePassword';
import ContentHome from '../etc/ContentHome';
import ExamRound from '../etc/ExamRound';
import ContentResult from '../etc/ContentResult';
import ContentRank from '../etc/ContentRank';
import ContentRankProvince from '../etc/ContentRankProvince';
import ContentRankDistrict from '../etc/ContentRankDistrict';
import ContentNews from '../etc/ContentNews';
import ContentAboutUs from '../etc/ContentAboutus';
import CreateExam from '../etc/CreateExam';
import ContentExam from '../etc/ContentExam';
import Practice from '../etc/Practice';
import AddProblem from '../etc/AddProblem';
import EditProblem from '../etc/EditProblem';
import MyListExam from '../etc/MyListExam';
import EditExam from '../etc/EditExam';
import ContentRankSchool from '../etc/ContentRankSchool';
import ReportMessage from '../etc/ReportMessage';
import DetailReportExam from '../etc/DetailReportExam';
import UserInfo from '../etc/UserInfo';
import Search from '../etc/Search';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
function Content(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    var userAddress = props.userAddress;
    return (
        <div className="row" >
            <div className="col-md-10 mx-auto ">
                <nav className="">
                    <Router>
                        <Switch>
                        <Route
                                exact path='/report-message'
                                render={() => <ReportMessage userData={userData}
                                    isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/search/:keyword'
                                render={() => <Search />}
                            />
                            <Route
                                exact path='/user-info/:userID'
                                render={() => <UserInfo userData={userData}
                                    isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/exam-round'
                                render={() => <ExamRound userData={userData}
                                    isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/report-message/:examID'
                                render={() => <DetailReportExam userData={userData}
                                    isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/practice'
                                render={() => <Practice userData={userData}
                                    isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/create-exam'
                                render={() => <CreateExam userData={userData}
                                    isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/my-list-exam'
                                render={() => <MyListExam userData={userData}
                                    isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/edit-exam/:examID'
                                render={() => <EditExam userData={userData}
                                    isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/exam/:examID/add-problem'
                                render={() => <AddProblem userData={userData}
                                    isLoggedIn={isLoggedIn}
                                />}
                            />
                            <Route
                                exact path='/exam/:examID/edit-problem/:problemID'
                                render={() => <EditProblem userData={userData}
                                    isLoggedIn={isLoggedIn}
                                />}
                            />
                            <Route
                                exact path='/changeinfomation'
                                render={() => <ChangeInfomation isLoggedIn={isLoggedIn} isShowChangeInfomation={true} userData={userData} />}
                            />
                            <Route
                                exact path='/changepassword'
                                render={() => <ChangePassWord isLoggedIn={isLoggedIn} isShowChangePassWord={true} userData={userData} />}
                            />
                            <Route
                                exact path='/login'
                                render={() => <Login isLoggedIn={isLoggedIn} isShowLogin={true} />}
                            />
                            <Route
                                exact path='/register'
                                render={() => <Register isLoggedIn={isLoggedIn} isShowRegister={true} />}
                            />
                            <Route
                                exact path='/about-us'
                                render={() => <ContentAboutUs userData={userData} isLoggedIn={true} />}
                            />
                            <Route
                                exact path='/news'
                                render={() => <ContentNews userData={userData} isLoggedIn={isLoggedIn} />}
                            />
                            <Route
                                exact path='/rank'
                                render={() => <ContentRank userData={userData} isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/rank/:provinceID'
                                render={() => <ContentRankProvince userData={userData} isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/rank/:provinceID/:districtID'
                                render={() => <ContentRankDistrict userData={userData} isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/rank/:provinceID/:districtID/:schoolID'
                                render={() => <ContentRankSchool userData={userData} isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/result'
                                render={() => <ContentResult userData={userData} isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            <Route
                                exact path='/exam'
                                render={() => {}}
                            />
                            <Route
                                exact path='/exam/:examID'

                                render={() => <ContentExam userData={userData} isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                            {/* <Route
                                exact path='/exam/:examID/submit/problem/:problemID'
                                render={() => <>
                                    <ContentExam userData={userData} isLoggedIn={isLoggedIn}
                                        userAddress={userAddress}
                                    />
                                    <SubmitProblem userData={userData} isLoggedIn={isLoggedIn}
                                        userAddress={userAddress}
                                    />
                                </>}
                            /> */}
                            <Route
                                path='/'
                                render={() => <ContentHome userData={userData} isLoggedIn={isLoggedIn}
                                    userAddress={userAddress}
                                />}
                            />
                        </Switch>
                    </Router>
                </nav>
            </div>
        </div>
    );

}
export default Content;