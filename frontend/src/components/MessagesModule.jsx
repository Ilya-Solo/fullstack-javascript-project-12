import MessageInput from "./MessagesInput";
import ChannelInfo from "./ChannelInfo";
import MessagesDisplay from "./MessagesDisplay";

const MessagesModule = () => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChannelInfo />
        <MessagesDisplay />
        <MessageInput />
      </div>
    </div>
  );
};

export default MessagesModule;
