import React, { useState, useEffect, useRef } from 'react';
function ContentAboutUs(props) {
    var isLoggedIn = props.isLoggedIn;
    var userData = props.userData;
    return (
        <>
            <div className="row ml-4 mr-4" style={{fontSize: "15px"}}>
               
                <div style={{width: "60%", margin: "auto"}}>
                <img style={{width: "80%", height: "80%", marginLeft: "70px"}}src="https://static6.depositphotos.com/1003595/585/i/600/depositphotos_5850433-stock-photo-about-us.jpg">
                </img>
                <div style={{marginLeft: "60px"}}>
                &emsp;&emsp;Do dịch bệnh COVID-19 đang diễn biến rất phức tạp, việc tổ chức các cuộc thi tại các cụm thi gặp rất nhiều khó khăn, đặc biệt là trong công tác phòng chống dịch bệnh. Vì vậy, <b>website Olympic Tin học </b>có thể giúp nhà trường và các thầy có thể tổ chức, học sinh có thể tham gia cuộc thi một cách dễ dàng, chặt chẽ mà vẫn đảm bảo an toàn sức khỏe cho các thầy cô, phụ huynh và thí sinh.
                <br/>
                &emsp;&emsp;Hệ thống của <b>website Violimpic Tin học</b> về cơ bản đã định hướng được chức năng của thầy cô và học sinh như: Thầy cô có thể tạo kì thi cho học sinh, có thể đổi bài thi khi gặp sự cố dựa trên ứng dụng của việc lựa chọn bài tập cho kì thi, Học sinh có thể làm bài tập và chấm bài ngay khi làm xong,…Và đặc biệt hiệu quả của việc thi online cũng khắc phục được một số vấn đề về thời gian so với thi viết như: Thầy cô và các bạn không phải chấm từng bài một của học sinh mà đã có hệ thống giải quyết, các bạn học sinh cũng không còn phải chờ đợi kết quả thi mà thay vào đó là kết quả nhanh , chính xác, trực quan. Như vậy, website cũng đã thực hiện được các chức năng đáp ứng như cầu của người dùng.
                </div>
                </div>
            </div>
        </>
    );
}
export default ContentAboutUs;