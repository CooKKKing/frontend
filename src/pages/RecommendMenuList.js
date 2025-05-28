import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  toggleRecipeBookmark,
  toggleRecipeLike,
} from "../api/mutations/recipeService";
import FoodGrid from "../components/FoodGrid";
import LoadingBar from "../components/LoadingBar";
import PageTitle from "../components/PageTitle";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import useIsMobile from "../hooks/useIsMobile";
import { useRecipe } from "../hooks/useRecipe";
import { useUser } from "../hooks/useUser";
import { useRecommendMenu } from "../contexts/RecommendMenuContext";

const RecommendMenuList = () => {
  const navigate = useNavigate();
  const { isMobile } = useIsMobile();
  const { member } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("최신 게시글");
  const { recommendMenu } = useRecommendMenu();

  const { fetchRecommendData, recommendRecipes, setRecommendRecipes, loading } =
    useRecipe();

  useEffect(() => {
    fetchRecommendData();
  }, [member]);

  if (loading) {
    return <LoadingBar />;
  }

  const toggleLike = async (id) => {
    setRecommendRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              isLiked: !recipe.isLiked,
              likes: recipe.isLiked ? recipe.likes - 1 : recipe.likes + 1,
            }
          : recipe
      )
    );

    try {
      await toggleRecipeLike(id);
    } catch (error) {
      setRecommendRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === id
            ? {
                ...recipe,
                isLiked: !recipe.isLiked,
                likes: recipe.isLiked ? recipe.likes + 1 : recipe.likes - 1,
              }
            : recipe
        )
      );
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  const toggleBookmark = async (id) => {
    setRecommendRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              isBookmarked: !recipe.isBookmarked,
            }
          : recipe
      )
    );

    try {
      toggleRecipeBookmark(id);
    } catch (error) {
      setRecommendRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === id
            ? {
                ...recipe,
                isBookmarked: !recipe.isBookmarked,
              }
            : recipe
        )
      );
      alert("북마크 실패패");
    }
  };

  // const myRecipe = recommendRecipes.filter(el => el.memberId === member.memberId);

  // 검색어로 필터링된 아이템
  const filteredAndSortedItems = recommendRecipes
    .filter((item) => {
      const mainIngredients = item.ingredients.main.map((ing) => ing.name);
      const subIngredients = item.ingredients.sub.map((ing) => ing.name);
      const allIngredients = [...mainIngredients, ...subIngredients];

      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        allIngredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "최신 게시글":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "오래된 게시글":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "좋아요 순":
          return b.likes - a.likes;
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const handleCreatePost = () => {
    navigate("create-post");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="w-full pb-6">
      <div className="flex justify-between items-center mb-6">
        <PageTitle
          title={`${recommendMenu.menuName} 게시글`}
          isMargin={false}
        />
      </div>

      <div
        className={`flex gap-2 mb-6 ${
          isMobile
            ? "flex-col items-end justify-end"
            : "flex-row items-center justify-between"
        }`}>
        <div className={`w-full ${isMobile ? "" : "max-w-[300px]"}`}>
          <SearchBar
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
        </div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="max-w-[150px] w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200">
          <option value="최신 게시글">최신 게시글</option>
          <option value="오래된 게시글">오래된 게시글</option>
          <option value="좋아요 순">좋아요 순</option>
        </select>
      </div>

      {/* 음식 그리드 */}
      <FoodGrid
        items={filteredAndSortedItems}
        currentPage={1}
        itemsPerPage={12}
        searchQuery={searchQuery}
        onItemClick={handleItemClick}
        toggleLike={toggleLike}
        toggleBookmark={toggleBookmark}
      />

      {/* 페이지네이션 */}
      {recommendRecipes?.totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={recommendRecipes.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default RecommendMenuList;
