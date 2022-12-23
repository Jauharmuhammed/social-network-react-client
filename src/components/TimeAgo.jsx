import {parseISO, formatDistanceToNow} from "date-fns";

const TimeAgo = ({timestamp, className}) => {
    let timeAgo = "";
    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }
    return (
        <span title={timestamp} className={className}>
            {timeAgo}
        </span>
    );
};

export default TimeAgo;
