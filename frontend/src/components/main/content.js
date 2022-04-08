import React, { useState, useEffect, useRef } from 'react';
import Login from '../etc/login';
import Register from '../etc/register';
import ChangeInfomation from '../etc/changeinfomation';
import ChangePassWord from '../etc/changepassword';
import ContentHome from '../etc/contenthome';
import ExamRound from '../etc/examround';
import ContentResult from '../etc/contentresult';
import ContentRank from '../etc/contentrank';
import ContentRankProvince from '../etc/contentrankprovince';
import ContentRankDistrict from '../etc/contentrankdistrict';
import ContentNews from '../etc/contentnews';
import ContentAboutUs from '../etc/contentaboutus';
import CreateExam from '../etc/createexam';
import ContentExam from '../etc/contentexam';
import Practice from '../etc/practice';
import AddProblem from '../etc/addproblem';
import EditProblem from '../etc/editproblem';
import MyListExam from '../etc/mylistexam';
import EditExam from '../etc/editexam';
import ContentRankSchool from '../etc/contentrankschool';
import ReportMessage from '../etc/reportmessage';
import DetailReportExam from '../etc/detailreportexam';
import UserInfo from '../etc/userinfo';
import Search from '../etc/search';
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