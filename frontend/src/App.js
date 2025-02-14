import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// pages and components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import TagPage from './pages/TagPage'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
          path="/"
          element={user? <Home/>: <Navigate to='/login' />}
          />
          <Route
          path="/login"
          element={ !user ? <Login/>: <Navigate to='/' />}
          />
          <Route
          path="/signup"
          element={!user? <Signup/>: <Navigate to='/' />}
          />
          <Route
              path="/tags"
              element={<TagPage />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
