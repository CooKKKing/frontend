import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import MyPosts from './pages/mypage/MyPosts';
import ButtonTest from './test/buttonTest';
import HeaderPC from './components/HeaderPC';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<MyPage />}>
            <Route index element={<MyPosts />} />
            <Route path="challenges" element={<div>도전과제 페이지</div>} />
            <Route path="titles" element={<div>칭호 페이지</div>} />
            <Route path="bookmarks" element={<div>북마크 리스트 페이지</div>} />
            <Route path="change-password" element={<div>비밀번호 변경 페이지</div>} />
            <Route path="withdrawal" element={<div>회원탈퇴 페이지</div>} />
          </Route>
          <Route path="/recommend" element={<div>추천메뉴 페이지</div>} />
          <Route path="/ranking" element={<div>랭킹 페이지</div>} />
          <Route path="/dictionary" element={<div>도감 페이지</div>} />
          <Route path="/shop" element={<div>밥풀상점 페이지</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

 {/* <HeaderPC/> */}
//  <Main/>
 {/* <ButtonTest/> */}

