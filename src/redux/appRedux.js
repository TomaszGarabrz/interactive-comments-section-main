import { createSlice } from '@reduxjs/toolkit';

import jsonData from '../data.json';

const dataStorage =
  localStorage.getItem('data') != null
    ? JSON.parse(localStorage.getItem('data'))
    : jsonData.comments;

const stateIdStorage =
  localStorage.getItem('stateId') != null
    ? JSON.parse(localStorage.getItem('stateId'))
    : 6;

const initialState = {
  data: dataStorage,
  stateId: 6,
  currentUser: jsonData.currentUser,
  currentEditItem: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addScore: (state, action) => {
      console.log(action.payload);
      let localState = state.data;
      let findCurrentIndex = localState.findIndex(
        (item) => item.id === action.payload.commentId
      );

      if (action.payload.replyId == null) {
        // dodawanie na poszczególnych elementach (comments)
        localState[findCurrentIndex].score++;
      } else {
        let findCurrentReplyIndex = localState[
          findCurrentIndex
        ].replies.findIndex((reply) => reply.id === action.payload.replyId);

        console.log(findCurrentReplyIndex);

        localState[findCurrentIndex].replies[findCurrentReplyIndex].score++;
      }

      state.data = localState;

      localStorage.setItem('data', JSON.stringify(state.data));
    },
    removeScore: (state, action) => {
      let localState = state.data;
      let findCurrentIndex = localState.findIndex(
        (item) => item.id === action.payload.commentId
      );

      if (action.payload.replyId == null) {
        // dodawanie na poszczególnych elementach (comments)
        localState[findCurrentIndex].score--;

        if (localState[findCurrentIndex].score < 0) {
          localState[findCurrentIndex].score = 0;
        }
      } else {
        // dodawanie na poszczególnych elementach (reply)
        let findCurrentReplyIndex = localState[
          findCurrentIndex
        ].replies.findIndex((reply) => reply.id === action.payload.replyId);

        localState[findCurrentIndex].replies[findCurrentReplyIndex].score--;

        if (
          localState[findCurrentIndex].replies[findCurrentReplyIndex].score < 0
        ) {
          localState[findCurrentIndex].replies[findCurrentReplyIndex].score = 0;
        }
      }

      state.data = localState;
      localStorage.setItem('data', JSON.stringify(state.data));
    },
    addReply: (state, action) => {
      let localState = state.data;
      let findCurrentIndex = localState.findIndex(
        (item) => item.id === action.payload.parentId
      );

      //find element id tylko w coments
      console.log(action.payload);

      let findCurrentReplyIndex = localState[
        findCurrentIndex
      ].replies.findIndex((reply) => reply.id === action.payload.elementId);

      localState[findCurrentIndex].replies.splice(
        findCurrentReplyIndex + 1,
        0,
        action.payload
      );

      state.data = localState;
      localStorage.setItem('data', JSON.stringify(state.data));
      state.stateId = state.stateId + 1;
      localStorage.setItem('stateId', JSON.stringify(state.stateId));
    },
    deleteReply: (state, action) => {
      let localState = state.data;
      let findCurrentIndex = localState.findIndex(
        (item) => item.id === action.payload.commentId
      );

      //find element id tylko w coments

      let findCurrentReplyIndex = localState[
        findCurrentIndex
      ].replies.findIndex((reply) => reply.id === action.payload.replyId);

      let newCommentArray = localState[findCurrentIndex].replies.filter(
        (item) => item.id !== action.payload.replyId
      ); // nowa tablica to tylko jeden komentarz

      localState[findCurrentIndex].replies = [];

      localState[findCurrentIndex].replies.push(...newCommentArray); // tutaj dopiero update po usunięciu poprzednich

      state.data = localState;
      localStorage.setItem('data', JSON.stringify(state.data));
    },
    editReply: (state, action) => {
      let localState = state.data;
      let findCurrentIndex = localState.findIndex(
        (item) => item.id === action.payload.commentId
      );

      let findCurrentEditIndex = localState[findCurrentIndex].replies.findIndex(
        (reply) => reply.id === action.payload.replyId
      );

      console.log(findCurrentEditIndex);

      localState[findCurrentIndex].replies[findCurrentEditIndex].content =
        action.payload.content;
      // nowa tablica to tylko jeden komentarz

      // pobrać cały obiekt, nie tylko index
      let findElement = localState[findCurrentIndex].replies.find(
        (item) => item.id === action.payload.replyId
      );
      localStorage.setItem('data', JSON.stringify(state.data));
      state.currentEditItem = findElement;
    },
  },
});

export const { addScore, removeScore, addReply, deleteReply, editReply } =
  appSlice.actions;

export default appSlice.reducer;
