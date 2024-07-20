import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BottomMenu = () => {
  const [userQuery, setUserQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserQuery(e.target.value);
  };

  const handleQuerySubmit = async () => {
      try {
        const response = await axios.get("http://localhost:3001/categories");
        const categories = response.data;
        for (const category of categories) {
          if (userQuery.toLowerCase().includes(category.toLowerCase())) {
            navigate("/mentors", { state: { category: category } });
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-300 p-4 m-4 rounded max-h-[600px] overflow-y-auto">
      <h3 className="text-lg font-bold mb-2 text-center">
        Hi! I'm AVA! I am here to find you a mentor! Please type in your issues below, and I can fetch you a mentor.
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

