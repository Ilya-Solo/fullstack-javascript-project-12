import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, getMessages } from "../slices/messagesSlice";
import { getAuthInfo } from "../slices/authSlice";
import { getChannelsInfo } from "../slices/channelsSlice";

const MessagesDisplay = () => {
  const dispatch = useDispatch();
  const { activeChannelId } = useSelector(getChannelsInfo);
  const messages = useSelector((state) => getMessages(state, activeChannelId));
  const { token } = useSelector(getAuthInfo);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(fetchMessages(token));
  }, [dispatch, token]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>: {message.body}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesDisplay;
