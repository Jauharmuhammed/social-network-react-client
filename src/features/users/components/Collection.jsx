import React from "react";
import { Link } from "react-router-dom";

const Collection = ({ collection }) => {
    return (
        <Link to={collection?.slug} className="w-full flex flex-col gap-3">
            {collection?.cover ? (
                <img
                    className="w-full aspect-square rounded-3xl object-cover"
                    src={collection?.cover}
                    alt={collection.name}
                />
            ) : (
                <div className="w-full aspect-square bg-stone-500 rounded-3xl"></div>
            )}
            <p className="text-white">{collection?.name}</p>
        </Link>
    );
};

export default Collection;
