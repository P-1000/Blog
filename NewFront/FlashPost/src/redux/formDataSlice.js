import { createSlice } from '@reduxjs/toolkit';

// Define name and initialState separately
const sliceName = 'formData';
const initialFormState = {
  title: 'Title Blog',
  description: '',
  tags: [],
  coverUrl: '',
  Content: {},
};

const formDataSlice = createSlice({
  name: sliceName,
  initialState: initialFormState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    updateTags: (state, action) => {
      state.tags = action.payload;
    },
    updateCoverUrl: (state, action) => {
      state.coverUrl = action.payload;
    },
    updateContent: (state, action) => {
      state.Content = action.payload;
    },

    resetForm: state => {
      state.title = '';
      state.description = '';
      state.tags = [];
      state.coverUrl = '';
      state.Content = '';
    },
  },
});

export const { updateTitle, updateDescription, updateTags, updateContent,  updateCoverUrl, resetForm } = formDataSlice.actions;
export default formDataSlice.reducer;
