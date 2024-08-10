import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { setActiveChannel } from "../slices/channelsSlice";
import ChannelsListItemControl from "./ChannelsListItemControl";

const ChannelsListItem = ({ channel }) => {
  const dispatch = useDispatch();
  const { activeChannelId } = useSelector((state) => state.channels);

  return (
    <li className="nav-item w-100">
      <div
        role="group"
        className={classNames("d-flex", "btn-group", {
          dropdown: channel.removable,
        })}
      >
        <button
          type="button"
          className={classNames(
            "w-100",
            "rounded-0",
            "text-start",
            "text-truncate",
            "btn",
            {
              "btn-secondary": channel.id === activeChannelId,
            },
          )}
          onClick={() => {
            dispatch(setActiveChannel({ id: channel.id }));
          }}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
        {channel.removable && (
          <ChannelsListItemControl
            channel={channel}
            activeChannelId={activeChannelId}
          />
        )}
      </div>
    </li>
  );
};

export default ChannelsListItem;
