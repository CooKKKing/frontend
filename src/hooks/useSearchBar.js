import { useState, useCallback } from "react";

// 1. 검색어 상태 관리
// 2. 입력(onChange) 핸들러
// 3. 검색(onSearch) 핸들러 (엔터키 지원, 검색 후 검색어 자동 초기화)
// 4. 검색어 초기화 기능

export default function useSearchBar({ onSearch: externalOnSearch } = {}) {
  const [query, setQuery] = useState("");

  // 입력값 변경 핸들러
  const handleChange = (e) => setQuery(e.target.value);

  // 검색 실행 핸들러 (버튼 클릭 또는 엔터)
  const handleSearch = useCallback(() => {
    if (externalOnSearch) {
      externalOnSearch(query);
    }
    setQuery(""); // 검색 후 검색어 비우기
  }, [externalOnSearch, query]);

  // input에서 엔터키로 검색
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 검색어 초기화 핸들러
  const reset = () => setQuery("");

  return {
    query,
    setQuery,
    handleChange,
    handleSearch,
    handleKeyDown,
    reset,
  };
}
