import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getMessagesLength } from "../slices/messagesSlice";
import { getChannelName, getChannelsInfo } from "../slices/channelsSlice";

const ChannelInfo = () => {
  const { t } = useTranslation();
  const { activeChannelId } = useSelector((state) => getChannelsInfo(state));
  const name = useSelector((state) => getChannelName(state, activeChannelId));
  const length = useSelector((state) =>
    getMessagesLength(state, activeChannelId),
  );

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {name}</b>
      </p>
      <span className="text-muted">
        {t("messages.messageCounter", { count: length })}
      </span>
    </div>
  );
};

export default ChannelInfo;
