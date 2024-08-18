import { useContext, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "./components/context/authcontext";
import Friends from "./components/friends/Friends";

function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient()

  const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!currentUser) {
        navigate("/login");
        // return null;
      }
    },[]);
    if(!currentUser){
      return null;
    }
   

    return children;
  };
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div>
        <Navigation />
        <div style={{ display: "flex" }} className="layoutWrapper">
          <Leftbar />
          <div style={{ flex: 6,backgroundColor:"#f2f2f2"}}>
            <Outlet />
          </div>

          <Rightbar />
        </div>
      </div>
      </QueryClientProvider>
    );
  };
  const FriendsLayout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div>
        <Navigation />
        <div style={{ display: "flex" }} className="layoutWrapper">
          <Leftbar />
          <div style={{ flex: 6,backgroundColor:"#f2f2f2"}}>
            <Friends />
          </div>

          {/* <Rightbar /> */}
        </div>
      </div>
      </QueryClientProvider>
    );
  };

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path ="/friends" element ={<Friends />} />
          </Route>
          <Route
            path="/friendss"
            element={
              <ProtectedRoute>
                <FriendsLayout />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          
        </Routes>
      </>
    </Router>
  );
}

export default App;
