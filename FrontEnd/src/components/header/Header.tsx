import { Link } from "react-router-dom";
import Logo from '../../assets/LogoIcon.png';
import SearchBar from "./SearchBar";
import ProfileButton from "./ProfileButton";
import '../../Styles/Header.css'


function Header(){

    return(

        <header>
            <Link to={'/home'}>
                <div>
                    <img src={Logo} alt="Logo"/>
                    <h1>Busca<span>Med</span></h1>
                </div>
            </Link>

            <SearchBar />

            <ProfileButton />

        </header>

    )

}

export default Header;