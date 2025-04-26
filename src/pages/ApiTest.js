import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getCollectionList } from '../api/queries/collectionService';
import LoadingBar from '../components/LoadingBar';
import { useUser } from '../hooks/useUser';
import PageTitle from '../components/PageTitle';

const ApiTest = () => {
    const {member} = useUser();
    console.log(member);

    const {data : collectionList, isLoading : isCollectionLoading, error : collectionError} = useQuery({
            queryKey : ['collectionList'],
            queryFn : () => getCollectionList(),
            retry: 1, // 실패 시 1번만 재시도
            onError: (error) => {
                console.error('컬렉션 목록 조회 실패:', error);
            }
    });

    if (isCollectionLoading) return <LoadingBar />;
    
    if (collectionError) {
        if (collectionError.message === 'No access token found') {
            return <div>로그인이 필요합니다.</div>;
        }
        return <div>에러가 발생했습니다: {collectionError.message}</div>;
    }

    return (
        <div>
            <PageTitle title="API 테스트" />
            {collectionList?.data?.map((collection) => (
                <div key={collection.id}>
                    {collection.name}
                </div>
            ))}
        </div>
    );
};

export default ApiTest;
