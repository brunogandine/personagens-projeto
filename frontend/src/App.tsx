import { BrowserRouter, Routes, Route } from "react-router-dom";

//Routes Import
import Layout from "./components/layout/Layout"
import Home from "./pages/Home/Home"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;