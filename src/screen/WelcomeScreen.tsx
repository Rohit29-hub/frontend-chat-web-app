import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo"
import LogoImg from '../assets/logo-chat.png'
import Input from "../components/ui/Input";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

const WelcomeScreen = () => {
    const {name} = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    return (
        <div className="w-full h-auto md:h-screen items-center justify-center flex flex-col">
            <Logo image_url={LogoImg} />
            <div className="w-full p-2 flex flex-col md:flex-row items-center gap-y-4 lg:gap-x-4 justify-center">
                <Input />
                <Button btn_title="Let's start" handlefunction={() => {
                    if(name){
                        navigate('/chat')
                    }else{
                        alert('Enter your name. Please!')
                    }
                }} />
            </div>
        </div>
    )
}

export default WelcomeScreen