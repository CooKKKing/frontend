import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getCollectionList } from '../api/queries/collectionService';
import LoadingBar from '../components/LoadingBar';

const ApiTest = () => {
   const {data : collectionList, isLoading : isCollectionLoading, error : collectionError} = useQuery({
        queryKey : [`collectionList`],
        queryFn : () => getCollectionList(),
   })

   if(isCollectionLoading) return <LoadingBar/>;
   if(collectionError) return <div>Error</div>;

    return (
        <div>ApiTest</div>
    );
};

export default ApiTest;
