import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import CreatePost from './pages/CreatePost';
import { DictionaryProvider } from './contexts/DictionaryContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { ShowDetailProvider } from './contexts/ShowDetailContext';
import Titles from './pages/mypage/Titles';
import Challenges from './pages/mypage/Challenges';
import BookmarkList from './pages/BookmarkList';
import ChangePassword from './pages/ChangePassword';
import Withdrawal from './pages/mypage/Withdrawal';
import Ranking from './pages/Ranking';
import { ToastProvider } from './hooks/useToast';
import ProfileChange from './pages/ProfileChange';
import ApiTest from './pages/ApiTest';
import { LikeProvider } from './contexts/LikeContext';
import PostDetail from './pages/PostDetail';
import { SelectedMemberProvider } from './contexts/SelectedMemberContext';
import Checkout from './pages/payment/Checkout';
import Success from './pages/payment/Success';
import Fail from './pages/payment/Fail';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastProvider>
          <DictionaryProvider>
            <BookmarkProvider>
              <LikeProvider>
                <ShowDetailProvider>
                  <SelectedMemberProvider>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/post/:recipeId" element={<PostDetail />} />
                        <Route path="/create-post/:recipeId" element={<CreatePost />} />
                        <Route path='/recommend' element={<RecommendMenu />} />
                        <Route path="/mypage" element={<MyPage />}>
                          <Route index element={<MyPosts />} />
                          <Route path="create-post" element={<CreatePost />} />
                          <Route path="challenges" element={<Challenges />} />
                          <Route path="titles" element={<Titles />} />
                          <Route path="bookmarks" element={<BookmarkList />} /> 
                          <Route path="change-password" element={<ChangePassword />} />
                          <Route path="profile-edit" element={<ProfileChange />} />
                          <Route path="withdrawal" element={<Withdrawal />} />
                        </Route>
                        <Route path="/shop" element={<Shop />}>
                          <Route index element={<ShopMain />} />
                          <Route path="history" element={<ShopHistory />} />
                        </Route>
                        <Route path="/payment">
                          <Route path="checkout" element={<Checkout />} />
                          <Route path="success" element={<Success />} />
                          <Route path="fail" element={<Fail />} />
                        </Route>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/find-id" element={<FindId />} />
                        <Route path="/find-password" element={<ChangePassword />} />
                        <Route path="/recommend" element={<RecommendMenu />} />
                        <Route path="/dictionary" element={<Dictionary />} />
                        <Route path="/ranking" element={<Ranking />} />
                      </Routes>
                    </Layout>
                  </SelectedMemberProvider>
                </ShowDetailProvider>
              </LikeProvider>
            </BookmarkProvider>
          </DictionaryProvider>
        </ToastProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

 {/* <HeaderPC/> */}
//  <Main/>
 {/* <ButtonTest/> */}

