import { BrowserRouter, Routes, Route } from "react-router-dom";

//Routes Import
import Layout from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AuthRoute } from "./routes/guards/AuthRoute";
import Profile from "./pages/Profile/Profile";
import { RoleRoute } from "./routes/guards/RoleRoute";
import AdmPanel from "./pages/AdmPanel/AdmPanel";
import Dashboard from "./pages/AdmPanel/components/Dashboard/Dashboard";

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
              <Route element={<RoleRoute allowed={["Admin"]} />}>
                <Route path='/adm-panel' element={<AdmPanel />}>
                  <Route index element={<Dashboard />} />
                  {/* <Route path="users" element={<UsersPage />} /> */}
                </Route>
              </Route>
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App;