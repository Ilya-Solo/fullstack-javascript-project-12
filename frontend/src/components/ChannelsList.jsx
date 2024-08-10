import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChannelsReqGet,
  // addChannelReqPost,
  // updateChannel,
  // deleteChannel,
  connectChannelsSocket,
} from "../slices/channelsSlice";
import ChannelsListItem from "./ChannelsListItem";

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { channels, status, error } = useSelector((state) => state.channels);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(setChannelsReqGet(token));
    dispatch(connectChannelsSocket());
  }, [dispatch, token]);

  const channelArray = Object.values(channels);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channelArray.map((channel) => (
        <ChannelsListItem channel={channel} key={channel.id} />
      ))}
    </ul>
  );
};

export default ChannelsList;
