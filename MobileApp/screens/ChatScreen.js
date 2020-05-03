import React from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView,StatusBar } from "react-native";
import { Header } from 'react-native-elements';
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from 'react-redux'

const ChatScreen = (props) => {

  const dispatch = useDispatch();
  const selfUser = useSelector(state => state.selfUser)
  const conversations = useSelector(state => state.conversations);
  const userId = props.route.params.userId;
  const username = props.route.params.username;
  const messages = conversations[userId].messages;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <GiftedChat
        messages={messages}
        onSend={messages => {
          dispatch({
            type: "private_message",
            data: { message: messages[0], conversationId: userId }
          });
          dispatch({
            type: "server/private_message",
            data: { message: messages[0], conversationId: userId }
          });
        }}
        user={{
          _id: selfUser.userId
        }}
      />
      {Platform.OS === "android" && (
        <KeyboardAvoidingView
        />
      )}
    </View>
  );
}
export default ChatScreen