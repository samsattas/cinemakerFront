import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/templates/Layout";
import MoviesPage from "./components/pages/MoviesPage";
import PageContainer from "./components/templates/PageContainer";
import ReservationPage from "./components/pages/ReservationsPage";
import RoomsPage from "./components/pages/RoomsPage";
import SchedulesPage from "./components/pages/SchedulesPage";
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
            <Route path="movies" element={<MoviesPage />} />
            <Route path="reservations" element={<ReservationPage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="schedules" element={<SchedulesPage />} />
            {/* <Route path='*' element={<NotFound />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
