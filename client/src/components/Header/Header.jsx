import { Link } from "react-router-dom";
import UserWindow from "../UserWindow/UserWindow";

export default function Header(){
    return(
        <div className={'header'} >
            <Link to="/"><span className={'logo'}>Tagd</span></Link>
            <UserWindow />
        </div>
    )
}