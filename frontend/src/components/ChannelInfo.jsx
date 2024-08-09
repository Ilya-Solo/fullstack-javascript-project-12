import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getMessagesLength } from "../slices/messagesSlice";
import { getChannelName, getChannelsInfo } from "../slices/channelsSlice";

const ChannelInfo = () => {
  const { activeChannelId } = useSelector((state) => getChannelsInfo(state));
  const name = useSelector((state) => getChannelName(state, activeChannelId));
  const length = useSelector((state) =>
    getMessagesLength(state, activeChannelId)
  );

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small" bis_skin_checked="1">
      <p className="m-0">
        <b># {name}</b>
      </p>
      <span className="text-muted">{length} сообщения</span>
    </div>
  );
};

export default ChannelInfo;
