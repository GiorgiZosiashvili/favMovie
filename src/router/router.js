import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/homePage";
import MoviePage from "../pages/moviePage";
import TVShowPage from "../pages/tvShowPage";
import AnimationsPage from "../pages/animationsPage";
import MovieDetailsPage from "../pages/movieDetailsPage";
import FavoriteMoviesPage from "../pages/favoritesPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="Movies" element={<MoviePage />} />
        <Route path="TV Shows" element={<TVShowPage />} />
        <Route path="Animations" element={<AnimationsPage />} />
        <Route path="MovieDetails/:id" element={<MovieDetailsPage />} />
        <Route path="FavoriteMovies" element={<FavoriteMoviesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
