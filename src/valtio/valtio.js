import { proxy } from "valtio";

export const state = proxy({ currentUser: null });
export const FavMovie = proxy({ favMovie: [] });
export const FavTVShow = proxy({ favTvShow: [] });
