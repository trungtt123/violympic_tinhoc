import '../../css/header.css';

function Header(props) {
    const isLoggedIn = props.isLoggedIn;
    const userData = props.userData;
    console.log(userData);
    if (isLoggedIn === undefined || isLoggedIn === null)
        return (
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <nav className="navbar navbar-expand-lg ml-2">
                        <a className="navbar-brand" href="/">
                        Violympic Tin học
                        {/* <img style={{width: "50px", height: "50px", imageRendering: "pixelated"}}
                        src="https://scontent.xx.fbcdn.net/v/t1.15752-0/p206x206/196724525_112344500958098_7671633097223254588_n.png?_nc_cat=107&ccb=1-3&_nc_sid=58c789&_nc_ohc=LBNxGc3jR9oAX_8kApo&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&tp=30&oh=33eae396caeeb54960e9a6fde430863b&oe=60E0BA4E">
                        </img> */}
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/#">
                                        <i className="bi bi-telephone"> 1900636111 </i>
                                    </a>
                                </li>
                                <li className="nav-item">

                                    <a className="nav-link" href="/#">
                                        <i className="bi bi-envelope"> viotinhoc@edu.vn </i></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://www.facebook.com/">
                                        <i className="bi bi-facebook"> viotinhoc </i>

                                    </a>
                                </li>
                            </ul>
                        </div>
                        <form className="form-inline my-2 my-lg-0" style={{ fontSize: "14px" }}>
                            <a href="/register" className="text-dark" style={{ textDecoration: "none" }}>Đăng kí</a> &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a href="/login" className="text-dark" style={{ textDecoration: "none" }}>Đăng nhập</a>
                        </form>

                    </nav>
                </div>
            </div>
        );
    else return (
        <div className="row">
            <div className="col-md-10 mx-auto ">
                <nav className="navbar navbar-expand-lg ml-2">
                    <a className="navbar-brand" href="/">
                        Violympic Tin học
                    {/* <img style={{width: "200px", height: "200px", imageRendering: "pixelated"}}
                        src="https://scontent.xx.fbcdn.net/v/t1.15752-0/p206x206/191665369_500650021283682_1162250185653668181_n.png?_nc_cat=106&ccb=1-3&_nc_sid=58c789&_nc_ohc=4qokCadevVkAX9n5uF2&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&tp=30&oh=383bac511f32ed71136324be58dc639f&oe=60E0B0D4">
                        </img> */}
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/#">
                                    <i className="bi bi-telephone"> 1900636111 </i>
                                </a>
                            </li>
                            <li className="nav-item">

                                <a className="nav-link" href="/#">
                                    <i className="bi bi-envelope"> viotinhoc@edu.vn </i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.facebook.com/">
                                    <i className="bi bi-facebook"> viotinhoc </i>

                                </a>
                            </li>
                        </ul>
                    </div>
                    <form className="form-inline my-2 my-lg-0" style={{ fontSize: "14px" }}>
                        <a href={"/user-info/" + userData.userID} className="text-dark" style={{ textDecoration: "none" }}>Xin chào, {userData.infomation.fullName}</a> &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="/logout" className="text-dark" style={{ textDecoration: "none" }} onClick={()=>localStorage.removeItem('userData')}>Đăng xuất</a>
                    </form>

                </nav>
            </div>
        </div>
    );
}
export default Header;