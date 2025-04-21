import React from 'react';
import PageTitle from '../../components/PageTitle';
import TitleInfoBox from '../../components/TitleInfoBox';
import { challengeData } from '../../data/challengeData';

const Titles = () => {
  const titleInfos = [
    {
      title: {
        type: challengeData.korean.type,
        imagePath: challengeData.korean.imagePath,
        level: 1,
        boldName: '한',
        name: '식 초보'
      },
      description: '한식요리 5가지 조리'
    },
    {
      title: {
        type: challengeData.korean.type,
        imagePath: challengeData.korean.imagePath,
        level: 2,
        boldName: '한', 
        name: '식 중수  '
      },
      description: '한식요리 10가지 조리'
    },
    {
      title: {
        type: challengeData.korean.type,
        imagePath: challengeData.korean.imagePath,
        level: 3,
        boldName: '한',
        name: '식 고수'
      },
      description: '한식요리 15가지 조리'
    },
    {
      title: {
        type: challengeData.japanese.type,
        imagePath: challengeData.japanese.imagePath,
        level: 1,
        boldName: '일',
        name: '식 초보'
      },
      description: '일식요리 5가지 조리'
    },
    {   
      title: {
        type: challengeData.japanese.type,
        imagePath: challengeData.japanese.imagePath,
        level: 2,
        boldName: '일',
        name: '식 중수'
      },    
      description: '일식요리 10가지 조리'
    },
    {
      title: {
        type: challengeData.japanese.type,
        imagePath: challengeData.japanese.imagePath,    
        level: 3,
        boldName: '일',
        name: '식 고수'
      },
      description: '일식요리 15가지 조리'
    }
    

    // 다른 칭호들도 여기에 추가할 수 있습니다
  ];

  return (
    <div className="p-4">
      <PageTitle title="칭호" />
      <div className="max-w-2xl mx-auto">
        {titleInfos.map((info, index) => (
          <TitleInfoBox
            key={index}
            title={info.title}
            description={info.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Titles; 