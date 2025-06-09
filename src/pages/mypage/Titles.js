import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import TitleInfoBox from '../../components/TitleInfoBox';
import TitleRadioButtons from '../../components/buttons/TitleRadioButtons';
import { getAllTitles, getOwnedTitles, getUnownedTitles } from '../../api/queries/titleService';
import { title } from 'framer-motion/client';

//칭호 페이지지
const Titles = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 라디오 버튼에 따라 API 호출
  useEffect(() => {
    const fetchTitles = async () => {
      setLoading(true);
      setError(null);
      try {
        let data = [];
        if (selectedFilter === '전체') {
          data = await getAllTitles();
        } else if (selectedFilter === '보유') {
          data = await getOwnedTitles();
          console.log("칭호 보유 data ========",data, data.length);
        } else if (selectedFilter === '미보유') {
          data = await getUnownedTitles();
        }
        setTitles(data);
      } catch (e) {
        setError('칭호 정보를 불러오지 못했습니다.');
        setTitles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTitles();
  }, [selectedFilter]);

  console.log(titles.length);

  return (
    <>
      <PageTitle title="칭호" />
      {/* max-w-7xl */}
      <div className=" mx-auto">
        <TitleRadioButtons
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        {loading ? (
          <div className="text-center py-10">로딩 중...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              width: `${titles.length === 1 ? '20%' : '100%'}`,
              gap: '24px',
            }}
          >
            {titles.map((info, index) => (
              <TitleInfoBox
                key={info.titleId || index}
                title={info.title}
                description={info.description}
                isAchieved={info.owned}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Titles; 