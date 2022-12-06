import './footer.css'
import Logo from '../element/logo/Logo';
import { Link } from 'react-router-dom';

/**
 * 푸터 컴포넌트
 * @param {*} props 
 * @returns Footer
 */
function Footer(props) {
    return(
        <footer>
            <div className="container d-flex justify-between align-center">
                <div className="footer-info-box">
                    <Logo></Logo>
                    <p className='mt-3'>smart-socket | 개발자: 양희태, 정수민, 주승규</p>
                    <p className='mt-1'>Copyrightⓒ2022 주승규, 정수민, 양희태,  All rights reserved.</p>
                </div>
                <div className='d-flex'>
                    <ul>
                        <p className='mt-2'><Link to="/device/list">디바이스 목록</Link></p>
                        <p className='mt-2'><Link to="/device/create">디바이스 등록</Link></p>
                        <p className='mt-2'><Link to="/login">로그인</Link></p>
                        <p className='mt-2'><Link to="/join">회원가입</Link></p>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;