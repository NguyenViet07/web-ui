import { createSlice } from "reduxjs/toolkit";
import HTTP from "@/services/HTTP";

const initialState = {
  listSongShare: [],
  auth: null,
  total: 0,
  status: "",
};
export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    pushListSongShare: (state, action) => {
      state.list = action.payload.data;
    },
  },
});
export const { pushListSongShare } = homeSlice.actions;

export default homeSlice.reducer;
