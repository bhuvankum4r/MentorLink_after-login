import { useState } from "react";
import AnimatedRightArrow from "./AnimatedRightArrow";
import BottomMenu from "./BottomMenu";

const SlidingPanel = () => {
  const [isSlidingPanelOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isSlidingPanelOpen);
  };

  return (
    <>
      <AnimatedRightArrow
        isSlidingPanelOpen={isSlidingPanelOpen}
        onClick={togglePanel}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-custom-pink shadow-lg transform transition-transform duration-500 ease-in-out ${
          isSlidingPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl text-custom-brown font-bold mb-4 text-center">MentorLink Finder</h2>
        </div>

        <BottomMenu isSlidingPanelOpen={isSlidingPanelOpen}/>
      </div>
    </>
  );
};

export default SlidingPanel;
