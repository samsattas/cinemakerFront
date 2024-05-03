import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/templates/Layout";
import { MyContext } from "./utils/MyContext";

function App() {
  const [page, setPage] = useState("Home");

  return (
    <MyContext.Provider value={{ page, setPage }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PageContainer>
                <Layout />
              </PageContainer>
            }
          >
            {/* <Route path="" element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="partners" element={<Partners />} />
              <Route path='*' element={<NotFound />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
