import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodGrid from '../../components/FoodGrid';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/Button';
import CreatePost from '../../pages/CreatePost';
import { foodItems } from '../../data/foodData';
import PageTitle from '../../components/PageTitle';

const MyPosts = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('최신 게시글');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePost = () => {
    navigate('create-post');
  };

  // 검색어로 필터링된 아이템
  const filteredAndSortedItems = useMemo(() => {
    // 먼저 검색어로 필터링
    let filtered = foodItems.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // 정렬 옵션에 따라 정렬
    switch (sortOption) {
      case '최신 게시글':
        return [...filtered].sort((a, b) => b.createdAt - a.createdAt);
      case '오래된 게시글':
        return [...filtered].sort((a, b) => a.createdAt - b.createdAt);
      case '좋아요 순':
        return [...filtered].sort((a, b) => b.likes - a.likes);
      case '조회수 순':
        return [...filtered].sort((a, b) => b.views - a.views);
      default:
        return filtered;
    }
  }, [searchQuery, sortOption]);

  // 현재 페이지의 아이템 수 계산
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      {showCreatePost ? (
        <CreatePost onCancel={() => setShowCreatePost(false)} />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <PageTitle title="내 게시글" />
            <Button
              variant="orange"
              value="게시글 작성"
              size="fit"
              onClick={handleCreatePost}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="w-[300px]">
              <SearchBar 
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="검색어를 입력하세요"
              />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              <option value="최신 게시글">최신 게시글</option>
              <option value="오래된 게시글">오래된 게시글</option>
              <option value="좋아요 순">좋아요 순</option>
              <option value="조회수 순">조회수 순</option>
            </select>
          </div>

          {/* 음식 그리드 */}
          <FoodGrid 
            items={filteredAndSortedItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            searchQuery={searchQuery}
          />

          {/* 페이지네이션 - 아이템이 있을 때만 표시 */}
          {filteredAndSortedItems.length > 0 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MyPosts; 