import { BrowserRouter, Routes, Route } from "react-router-dom";

//Routes Import
import Layout from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AuthRoute } from "./routes/guards/AuthRoute";
import Profile from "./pages/Profile/Profile";
import { RoleRoute } from "./routes/guards/RoleRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardOverview from "./pages/Dashboard/components/DashboardOverview/DashboardOverview";
import UsersDashboard from "./pages/Dashboard/components/UsersDashboard/UsersDashboard";
import CharactersDashboard from "./pages/Dashboard/components/CharactersDashboard/CharactersDashboard";
import CharacterCreation from "./pages/Dashboard/components/CharactersDashboard/CharacterCreation/CharacterCreation";
import CharactersList from "./pages/Dashboard/components/CharactersDashboard/components/CharactersList/CharactersList";

function App() {
  return (
      <BrowserRouter>
        <AuthContextProvider>
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
                <Route index element={<DashboardOverview />} />
                <Route path="users" element={<UsersDashboard />} />
                <Route path="characters" element={<CharactersDashboard />}>
                  <Route index element={<CharactersList />} />
                  <Route path="creation" element={<CharacterCreation />} />
                  {/* <Route path="edit"element={<CharacterEdit />} /> */}
                </Route>
                <Route path="settings" />
              </Route>
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
  )
}

export default App;