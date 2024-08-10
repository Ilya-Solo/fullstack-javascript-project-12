import React, { useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  setChannelsReqGet,
  // addChannelReqPost,
  // updateChannel,
  // deleteChannel,
  connectChannelsSocket,
} from "../slices/channelsSlice";

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { channels, status, error, activeChannelId } = useSelector(
    (state) => state.channels,
  );
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
        <li className="nav-item w-100" key={channel.id}>
          <button
            type="button"
            className={classNames("w-100", "rounded-0", "text-start", "btn", {
              "btn-secondary": channel.id === activeChannelId,
            })}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
