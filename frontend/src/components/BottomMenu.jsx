import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BottomMenu = ({isSlidingPanelOpen}) => {
  const [userQuery, setUserQuery] = useState("");
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(!isSlidingPanelOpen) {
      setUserQuery("");
    }
  }, [isSlidingPanelOpen]);

  const handleInputChange = (e) => {
    setUserQuery(e.target.value);
  };

  const handleQuerySubmit = async () => {
    try {
      let skill = userQuery.toLowerCase();
      navigate("/mentors", {
        state: {
          skill: skill
        }
      });
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-300 p-4 m-4 rounded max-h-[600px] overflow-y-auto">
      <h3 className="text-lg font-bold mb-2 text-center">
      Hi Bhuvan Kumar, Hope you are doing great today! I am Luna, your AI assistant, Do you want me to search for a mentor?
      </h3>

      <div className="flex flex-col items-center">
      <textarea
        value={userQuery}
        onChange={handleInputChange}
        placeholder="Type your issues here..."
        draggable="false"
        className="p-4 border-2 border-gray-300 rounded-lg w-full mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleQuerySubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default BottomMenu;

