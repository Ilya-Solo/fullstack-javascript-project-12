import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  connectMessagesSocket,
  getMessages,
} from "../slices/messagesSlice";
import { getChannelsInfo } from "../slices/channelsSlice";

const MessagesDisplay = () => {
  const dispatch = useDispatch();
  const { activeChannelId } = useSelector((state) => getChannelsInfo(state));
  const messages = useSelector((state) => getMessages(state, activeChannelId));

  useEffect(() => {
    dispatch(fetchMessages());
    dispatch(connectMessagesSocket());
  }, [dispatch]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>: {message.body}
        </div>
      ))}
    </div>
  );
};

export default MessagesDisplay;
