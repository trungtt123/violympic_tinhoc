import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { api_url } from './constants';
function ContentRank(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    const arrStyleTable = [
        { "width": "10%", "textAlign": "center", "font-size": "14px" },
        { "width": "40%", "textAlign": "center", "font-size": "14px" },
        { "width": "25%", "textAlign": "center", "font-size": "14px" },
        { "width": "25%", "textAlign": "center", "font-size": "14px" }
    ];
    const [elmProvince, setElmProvince] = useState();
    const history = useHistory();
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            method: 'GET',
            headers: {
                'token': 'ff998f5d-a65e-11eb-8be2-c21e19fc6803',
                'Content-Type': 'application/json'
            }
        }).then(response =>
            response.json()).then(async (data) => {
                
                    const userList = await fetch(api_url + '/examresult/getlistuserinprovince', {
                        method: 'POST',
                        headers: {

                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data.data)
                    }).then(response => response.json());
                var elm = data.data.map((province, index) => {

                    return <tr key={index}>

                        <td style={arrStyleTable[0]}>{index + 1}</td>
                        <td style={arrStyleTable[1]} className="cursor-pointer"
                            onClick={() => history.push('/rank/province-' + province.ProvinceID)}
                        >{province.ProvinceName}</td>
                        <td style={arrStyleTable[2]}>{userList.result[index].thcsCnt}</td>
                        <td style={arrStyleTable[3]}>{userList.result[index].thptCnt}</td>
                    </tr>
                });

                setElmProvince(elm);
            });

    }, [])
    return (
        <>
            <div className="row ml-4 mr-4">
                <div style={{ fontSize: "14px", marginTop: "100px", width: "50%" }}>


                    <table className="table table-sm table-bordered">
                        <thead>
                            <tr>

                                <th style={arrStyleTable[0]}>STT</th>
                                <th style={arrStyleTable[1]}>Tỉnh/Thành phố</th>
                                <th style={arrStyleTable[2]}>THCS</th>
                                <th style={arrStyleTable[3]}>THPT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elmProvince}
                        </tbody>
                    </table>


                </div>
                <div style={{marginTop: "90px"}}>
                    <img src="/assets/img/bg-rank.png" style={{marginLeft: '40%', width: '400px'}}>
                    </img>
                </div>
            </div>
        </>
    );
}
export default ContentRank;