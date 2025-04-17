import './styles/App.css';
import Button from './components/Button';
import Main from './pages/Main';
import ButtonTest from './test/buttonTest';
import HeaderPC from './components/HeaderPC';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<Main/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

 {/* <HeaderPC/> */}
//  <Main/>
 {/* <ButtonTest/> */}

