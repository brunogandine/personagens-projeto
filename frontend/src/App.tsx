import { BrowserRouter, Routes, Route } from "react-router-dom";

//Routes Import
import Layout from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./contexts/LoggedUserContext";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App;