import { useEffect, useState } from "react";

const AnimatedRightArrow = ({ isSlidingPanelOpen, onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let animationInterval;

    if (!isSlidingPanelOpen) {
      animationInterval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000); // Animation duration
      }, 3000); // Trigger every 5 seconds
    }

    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  }, [isSlidingPanelOpen]);

  return (
    <button
      onClick={onClick}
      className={`fixed top-1/2 -translate-y-1/2 bg-blue-500 text-white p-4 rounded-l-full shadow-lg hover:bg-blue-600 transition-all duration-500 -z-10 ${
        isSlidingPanelOpen ? "right-80" : "right-0"
      } ${
        !isSlidingPanelOpen && isAnimating ? "translate-x-0" : "translate-x-2"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transition-transform duration-500 ${
          isSlidingPanelOpen ? "rotate-180" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export default AnimatedRightArrow;
