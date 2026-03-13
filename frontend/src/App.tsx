import { BrowserRouter, Routes, Route } from "react-router-dom";

//Routes Import
import Layout from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./contexts/LoggedUserContext";
import { AuthRoute } from "./routes/guards/AuthRoute";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route element={<AuthRoute/>}>
              <Route path='/profile' element={<Profile />}/>
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App;