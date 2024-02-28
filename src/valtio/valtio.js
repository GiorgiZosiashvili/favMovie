import { proxy } from "valtio";

export const state = proxy({ user: [] });
export const FavMovie = proxy({ favMovie: [] });
export const FavTVShow = proxy({ favTvShow: [] });
