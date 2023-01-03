import { useCollectionsByUserQuery } from 'app/api/usersApiSlice'
import Spinner from 'components/Spinner'
import React from 'react'
import { useEffect } from 'react'
import Collection from './Collection'

const Collections = ({username}) => {
    const {data: collections_list, isLoading} = useCollectionsByUserQuery({username})
    useEffect(() => {
      console.log(collections_list);
    }, [collections_list])
    
    if (isLoading) return <Spinner/>
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-3'>
        {collections_list?.map(collection => (
            <Collection key={collection.id} collection={collection} />
        ))}
    </div>
  )
}

export default Collections