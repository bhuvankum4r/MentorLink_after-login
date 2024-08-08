import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DisplayMentors = () => {
  const location = useLocation();
  const { state } = location;
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const skill = state?.skill;
    if (skill) {
      // Log the skill for debugging purposes
      // Assuming an endpoint exists at /mentors/skill/:skillName
      const apiUrl = `http://localhost:3001/users/skills/${skill}`; // Adjusted to use skill
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setMentors(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching mentors:", error);
          setError(error);
          setLoading(false);
        });
    }
  }, [state?.skills]); // Changed dependency to state.skills

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Mentors in {state?.skills}</h1> {/* Updated to display skill */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={mentor.profileImage}
              alt={`${mentor.fname} ${mentor.lname}`}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">
              {mentor.fname} {mentor.lname}
            </h2>
            <p className="text-gray-600 mb-4">{mentor.skills.join(', ')}</p> {/* Assuming skills is an array */}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => window.location.href = `https://mentorlink.in/#/categories/${mentor.category}`}
            >
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayMentors;
