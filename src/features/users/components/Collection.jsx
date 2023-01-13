import TimeAgo from "components/TimeAgo";
import React from "react";
import { Link } from "react-router-dom";

const Collection = ({ collection }) => {
    return (
        <Link to={collection?.slug} className="w-full flex flex-col gap-3 mb-2">
            {collection?.cover ? (
                <img
                    className="w-full aspect-square rounded-3xl object-cover"
                    src={collection?.cover}
                    alt={collection.name}
                />
            ) : (
                <div className="w-full aspect-square bg-stone-500 rounded-3xl"></div>
            )}
            <div>
                <div  className="flex justify-between items-center" >
                    <p className="text-white text-lg truncate">{collection?.name}</p>
                    <div className="flex gap-2">
                    {collection?.private && (
                        <span className="text-white flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width=".8em"
                                height=".8em"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M6 22q-.825 0-1.412-.587Q4 20.825 4 20V10q0-.825.588-1.413Q5.175 8 6 8h1V6q0-2.075 1.463-3.538Q9.925 1 12 1t3.538 1.462Q17 3.925 17 6v2h1q.825 0 1.413.587Q20 9.175 20 10v10q0 .825-.587 1.413Q18.825 22 18 22Zm6-5q.825 0 1.413-.587Q14 15.825 14 15q0-.825-.587-1.413Q12.825 13 12 13q-.825 0-1.412.587Q10 14.175 10 15q0 .825.588 1.413Q11.175 17 12 17ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6Z"
                                />
                            </svg>
                        </span>
                    )}<span className="text-gray-400 text-sm">{collection?.posts.length} Posts</span></div>
                </div>
                <p className="text-gray-600 text-xs -mt-.5"><TimeAgo timestamp={collection?.updated}/></p>
            </div>
        </Link>
    );
};

export default Collection;
