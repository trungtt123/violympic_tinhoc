import '../../css/footer.css';

function Footer(props) {

    return (
        <div className="footer-dark">
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <ul>
                                <li><a href="#">Xếp hạng</a></li>
                                <li><a href="#">Hướng dẫn</a></li>
                                <li><a href="#">Giới thiệu</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <ul>
                                <li><a href="#">Tin tức</a></li>
                                <li><a href="#">Giái đáp thắc mắc</a></li>
                                <li><a href="#">Tin sự kiện</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>Violympic Tin học</h3>
                            <p>ViOlympic Tin học sử dụng tốt nhất bằng trình duyệt Google Chrome có thể download tại Google Chrome</p>
                        </div>
                        <div className="col item social"><a href="#"><i className="icon ion-social-facebook" /></a><a href="#"><i className="icon ion-social-twitter" /></a><a href="#"><i className="icon ion-social-snapchat" /></a><a href="#"><i className="icon ion-social-instagram" /></a></div>
                    </div>
                    <p className="copyright">crackertvn © 2021</p>
                </div>
            </footer>
        </div>
    );
}
export default Footer;