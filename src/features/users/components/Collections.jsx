import { useCollectionsByUserQuery } from "app/api/usersApiSlice";
import Spinner from "components/Spinner";
import React from "react";
import { useEffect } from "react";
import Collection from "./Collection";

const Collections = ({ username }) => {
    const { data: collections_list, isLoading, refetch } = useCollectionsByUserQuery({ username });
    useEffect(() => {
        refetch();
    }, []);

    if (isLoading) return <Spinner />;
    return collections_list.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-3">
            {collections_list?.map((collection) => (
                <Collection key={collection.slug} collection={collection} />
            ))}
        </div>
    ) : (
        <h2 className=" text-xl md:text-3xl text-center my-10">No collections to show! </h2>
    );
};

export default Collections;
