import React, { useEffect } from "react";
import leoProfanity from "leo-profanity";
import { useDispatch } from "react-redux";
import Navbar from "../components/Header";
import ChannelsModule from "../components/ChannelsModule";
import MessagesModule from "../components/MessagesModule";
import { connectSocket } from "../slices/messagesSlice";
import socket from "../slices/initializeSocket";

const loadBadWordsDict = () => {
  const englishWords = leoProfanity.getDictionary("en");
  const russianWords = leoProfanity.getDictionary("ru");
  const combinedWords = [...englishWords, ...russianWords];
  leoProfanity.add(combinedWords);
};

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadBadWordsDict();
    dispatch(connectSocket());

    return () => {
      socket.off("connect");
      socket.off("newMessage");
      socket.off("disconnect");
      socket.off("error");
    };
  }, [dispatch]);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Navbar />
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <ChannelsModule />
              <MessagesModule />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
