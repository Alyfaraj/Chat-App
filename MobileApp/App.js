import React, { Component } from 'react';
import { YellowBox, StatusBar } from "react-native";
YellowBox.ignoreWarnings([""]);
import Navigator from './screens/navigator';
import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddelware from 'redux-socket.io'
import io from 'socket.io-client'
import { Provider } from 'react-redux';

const socket = io("http://192.168.1.6:3001");

const socketIoMiddelware = createSocketIoMiddelware(socket, "server/");

const reducer = (state = { conversations: {} }, action) => {
  switch (action.type) {
    case "users_online":
      const conversations = { ...state.conversations };
      const usersOnline = action.data;
      for (let i = 0; i < usersOnline.length; i++) {
        const userId = usersOnline[i].userId;
        if (conversations[userId] === undefined) {
          conversations[userId] = {
            messages: [],
            username: usersOnline[i].username
          };
        }
      }
      return { ...state, usersOnline, conversations };
    case "private_message":
      const conversationId = action.data.conversationId;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [
              action.data.message,
              ...state.conversations[conversationId].messages
            ]
          }
        }
      };
    case "self_user":
      return { ...state, selfUser: action.data };
    default:
      return state;
  }

}

const store = applyMiddleware(socketIoMiddelware)(createStore)(reducer);
store.subscribe(() => {
  console.log("new state", store.getState())
})


const App = props => {
  return (
    <Provider store={store} >
      <StatusBar backgroundColor="#0084ff" />
      <Navigator />
    </Provider>
  );

};

export default App;
