import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { deleteChannel, updateChannel } from "../slices/channelsSlice";
import ChannelDeleteModal from "./ChannelDeleteModal";
import ChannelRenameModal from "./ChannelRenameModal";
import { getAuthInfo } from "../slices/authSlice";

const ChannelsListItemControl = ({ channel, activeChannelId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { token } = useSelector(getAuthInfo);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteChannel({ id: channel.id, token }));
    setShowDeleteModal(false);
  };

  const handleRename = (newName) => {
    dispatch(updateChannel({ id: channel.id, name: newName, token }));
    setShowRenameModal(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <button
        type="button"
        id={`dropdown-${channel.id}`}
        className={classNames(
          "flex-grow-0",
          "dropdown-toggle",
          "dropdown-toggle-split",
          "btn",
          {
            "btn-secondary": channel.id === activeChannelId,
          },
        )}
        onClick={toggleDropdown}
        aria-expanded={dropdownOpen}
      >
        <span className="visually-hidden">Управление каналом</span>
      </button>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          aria-labelledby={`dropdown-${channel.id}`}
          className="dropdown-menu show"
          data-popper-placement="bottom-end"
          style={{
            position: "absolute",
            inset: "0px 0px auto auto",
            transform: "translate3d(0px, 40px, 0px)",
          }}
        >
          <a
            className="dropdown-item"
            role="button"
            onClick={() => {
              closeDropdown();
              setShowDeleteModal(true);
            }}
          >
            Удалить
          </a>
          <a
            className="dropdown-item"
            role="button"
            onClick={() => {
              closeDropdown();
              setShowRenameModal(true);
            }}
          >
            Переименовать
          </a>
        </div>
      )}

      <ChannelDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
      />

      <ChannelRenameModal
        show={showRenameModal}
        handleClose={() => setShowRenameModal(false)}
        handleRename={handleRename}
        initialName={channel.name}
      />
    </>
  );
};

export default ChannelsListItemControl;
