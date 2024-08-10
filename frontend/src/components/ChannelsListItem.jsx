import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import {
  setActiveChannel,
  deleteChannel,
  renameChannel,
} from "../slices/channelsSlice";

const ChannelsListItem = ({ channel }) => {
  const dispatch = useDispatch();
  const { activeChannelId } = useSelector((state) => state.channels);

  const handleDelete = () => {
    dispatch(deleteChannel(channel.id));
  };

  const handleRename = () => {
    const newName = prompt("Введите новое имя канала", channel.name);
    if (newName) {
      dispatch(renameChannel({ id: channel.id, name: newName }));
    }
  };

  return (
    <li className="nav-item w-100" key={channel.id}>
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
            }
          )}
          onClick={() => {
            dispatch(setActiveChannel(channel.id));
          }}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
        {channel.removable && (
          <>
            <button
              type="button"
              id={`dropdown-${channel.id}`}
              className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Управление каналом</span>
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby={`dropdown-${channel.id}`}
            >
              <li>
                <button className="dropdown-item" onClick={handleDelete}>
                  Удалить
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleRename}>
                  Переименовать
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </li>
  );
};

export default ChannelsListItem;
