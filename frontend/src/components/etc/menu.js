import { useEffect, useState } from 'react';
import '../../css/menu.css'
export default function Menu(props) {
	const userData = props.userData;
	console.log(userData);
	const [elmButton, setElmButton] = useState();
	
	useEffect(()=>{
		if (userData !== undefined) {
			if (userData.infomation.permissionID !== 0)
			setElmButton(
				<>
					<div className="items__menu_auth">
						<a href="/my-list-exam"><i class="fas fa-pencil-ruler"></i> Quản lý kì thi</a>
					</div>
					<div className="items__menu_auth">
						<a href="/report-message"><i class="fas fa-bug" /> Báo cáo lỗi</a>
					</div>
				</>
			)
		}
	},[])
	return (
		<>
			<input hidden className="nav__input_check" type="checkbox" id="checkmenu" />
			<label htmlFor="checkmenu" className="layout__menu" />

			<div id="nav" className="show___menu">
				<label htmlFor="checkmenu" className="close__menu">
					<i className="fas fa-ellipsis-v" />
				</label>
				<div className="main__menu_show">
					<div className="items__menu_auth">
						<a href="/changeinfomation"><i className="fas fa-user-cog" /> Thay đổi thông tin</a>
					</div>
					<div className="items__menu_auth">
						<a href="/changepassword"><i className="fas fa-cog" /> Thay đổi mật khẩu</a>
					</div>
					{elmButton}
					<div className="items__menu_auth">
						<a href="/system"><i className="fas fa-envelope" /> Tin nhắn hệ thống</a>
					</div>


					<div className="items__menu_auth">
						<a href="/profile"><i className="fas fa-cog" /> Cài đặt</a>
					</div>
				</div>
			</div>
		</>
	);
}