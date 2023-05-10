import { UserIcon } from "../../common/icons";

export default function UserWindow(){
    return (
        <div className={'user-window'}>
            <div className={'user-icon'}>
                <UserIcon />
            </div>
            <span className={'user-name'}>TEST USER</span>
        </div>
    );
}