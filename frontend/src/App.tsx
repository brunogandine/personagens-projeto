import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import { Home } from "./pages/Home";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardOverview from "./pages/Dashboard/components/DashboardOverview/DashboardOverview";
import UsersDashboard from "./pages/Dashboard/components/UsersDashboard/UsersDashboard";
import ContentDashboard from "./pages/Dashboard/components/ContentDashboard/ContentDashboard";
import CharacterCreation from "./pages/Dashboard/components/ContentDashboard/components/CharacterCreation/CharacterCreation";
import ContentMain from "./pages/Dashboard/components/ContentDashboard/components/ContentMain/ContentMain";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AuthRoute } from "./routes/guards/AuthRoute";
import { RoleRoute } from "./routes/guards/RoleRoute";
import { MessageModalContextProvider } from "./contexts/UIFeedbackContext";

function App() {
  return (
      <BrowserRouter>
        <AuthContextProvider>
          <MessageModalContextProvider>
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
                  <Route path="content" element={<ContentDashboard />}>
                    <Route index element={<ContentMain />} />
                    <Route path="characters/create" element={<CharacterCreation />} />
                  </Route>
                  <Route path="settings" />
                </Route>
              </Route>
            </Routes>
          </MessageModalContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
  )
}

export default App;