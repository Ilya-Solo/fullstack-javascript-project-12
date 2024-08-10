import ChannelsList from "./ChannelsList";
import ChannelCreateElement from "./ChannelCreateElement";

const ChannelsModule = () => {
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelCreateElement />
      <ChannelsList />
    </div>
  );
};

export default ChannelsModule;
