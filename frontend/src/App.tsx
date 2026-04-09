import { BrowserRouter, Routes, Route } from "react-router-dom";

//Routes Import
import Layout from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AuthRoute } from "./routes/guards/AuthRoute";
import Profile from "./pages/Profile/Profile";
import { RoleRoute } from "./routes/guards/RoleRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardOverview from "./pages/Dashboard/components/DashboardOverview/DashboardOverviewContent/DashboardOverview";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route element={<AuthRoute/>}>
                <Route path='/profile' element={<Profile />}/>
              </Route>
            </Route>
            <Route element={<RoleRoute allowed={["Admin"]} />}>
              <Route path='/dashboard' element={<Dashboard />}>
                <Route index element />
                <Route path="users" />
                <Route path="characters" />
                <Route path="settings" />
              </Route>
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App;