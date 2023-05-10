
const year = 31536000;
const month = 2592000;
const day = 86400;
const hour = 3600;
const minute = 60;

export default function Timestamp({datetime}){
    const time = () => {
        let timeDiff = Math.floor((Date.now() - new Date(datetime).getTime()) / 1000);
        let val = timeDiff;
        let timeUnit = "second";
        if(timeDiff / year > 1){
            val = Math.floor(timeDiff / year);
            timeUnit = "year";
        }
        else if(timeDiff / month > 1){
            val = Math.floor(timeDiff / month);
            timeUnit = "month";
        }
        else if(timeDiff / day > 1){
            val = Math.floor(timeDiff / day);
            timeUnit = "day";
        }
        else if(timeDiff / hour > 1){
            val = Math.floor(timeDiff / hour);
            timeUnit = "hour";
        }
        else if(timeDiff / minute > 1){
            val = Math.floor(timeDiff / minute);
            timeUnit = "minute";
        }

        return `${val} ${timeUnit}${val > 1 ? "s" : ""} ago`;
    }

    return(
        <>{time()}</>
    );
}