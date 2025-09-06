// src/store/pagesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pages: [{ id: 1, content: "", pagecolor: null }], // each page has pagecolor
  activePage: 0,
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    addPage: (state,action) => {
      state.pages.push({
        id: Date.now(), // unique ID,
        content: "",
        pagecolor: action.payload, // use passed color or fallback
      });
     
      state.activePage = state.pages.length - 1;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    updatePageContent: (state, action) => {
      const { index, content } = action.payload;
      if (state.pages[index]) {
        state.pages[index].content = content;
      }
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    deletePage: (state, action) => {
      const index = action.payload;
      if (state.pages.length > 1) {
        state.pages.splice(index, 1);
        if (state.activePage >= state.pages.length) {
          state.activePage = state.pages.length - 1;
        }
      } else {
        state.pages[0].content = "";
        state.pages[0].pagecolor = pagecolor; // reset
      }
    },
    setPageColor: (state, action) => {
      if (state.pages[state.activePage]) {
        state.pages[state.activePage].pagecolor = action.payload;
      }
    },
    setDefaultPageColor: (state, action) => {
      if (state.pages[state.activePage]) {
    state.pages[state.activePage].pagecolor = action.payload;
  }
    },
  },
});

export const {
  addPage,
  setActivePage,
  updatePageContent,
  setPages,
  deletePage,
  setPageColor,
  setDefaultPageColor,
} = pagesSlice.actions;

export default pagesSlice.reducer;
