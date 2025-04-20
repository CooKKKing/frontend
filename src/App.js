import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import MyPosts from './pages/mypage/MyPosts';
import Shop from './pages/Shop';
import ShopMain from './pages/shop/ShopMain';
import ShopHistory from './pages/shop/ShopHistory';
import ButtonTest from './test/buttonTest';
import HeaderPC from './components/HeaderPC';
import RecommendMenu from './pages/RecommendMenu';
import SignUp from './pages/SignUp';
import Dictionary from './pages/Dictionary';
import { DictionaryProvider } from './contexts/DictionaryContext';

function App() {
  return (
    <Router>
      <DictionaryProvider>
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
            <Route path="/shop" element={<Shop />}>
              <Route index element={<ShopMain />} />
              <Route path="history" element={<ShopHistory />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/recommend" element={<RecommendMenu />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/ranking" element={<div>랭킹 페이지</div>} />
          </Routes>
        </Layout>
      </DictionaryProvider>
    </Router>
  );
}

export default App;

 {/* <HeaderPC/> */}
//  <Main/>
 {/* <ButtonTest/> */}

