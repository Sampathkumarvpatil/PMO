import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import ProjOptions from "../components/ProjOptions";
import LastButtons from "../components/LastButtons";

const Home = ({ sidebarToggle }) => {
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [numSections, setNumSections] = useState(3);
  const [sectionHeadings, setSectionHeadings] = useState(Array(numSections).fill(""));
  const [showNumSections, setShowNumSections] = useState(false); // State to track visibility of the second dropdown
  const navigate = useNavigate();
  const socket = io("http://localhost:8000");

  const defaultModels = {
    "4Ls Model": [
      "Liked: Things that team members enjoyed.",
      "Learned: New knowledge or skills acquired.",
      "Lacked: Resources or support that were missing.",
      "Longed For: Desired improvements or changes."
    ],
    "Sailboat Model": [
      "Anchors: Factors that held the team back.",
      "Wind: Forces that propelled the team forward.",
      "Rocks: Potential risks or obstacles.",
      "Island: Goals or destination for the next sprint."
    ],
    "DAKI Model": [
      "Drop: Practices that should be discontinued.",
      "Add: New ideas or practices to introduce.",
      "Keep: Effective strategies to retain.",
      "Improve: Areas for refinement or enhancement."
    ],
    "Starfish Model": [
      "Super: What was superlative or outstanding?",
      "Smile: What made the team smile or feel proud?",
      "Sustain: What should be sustained or continued?",
      "Stop: What should be stopped or ceased?",
      "Start: What should be started or initiated?"
    ],
    "Rocket Retrospective": [
      "Boosters: What accelerated our progress?",
      "Orbit: What kept us on track and in orbit?",
      "Black Holes: What sucked our energy and focus?",
      "Stars: What were the shining moments or achievements?",
      "New Frontiers: What new territories or challenges do we want to explore?"
    ],
    "Drama Triangle": [
      "Victim: Where did we feel powerless or overwhelmed?",
      "Persecutor: Were there any external pressures or conflicts?",
      "Rescuer: How did we support each other and overcome challenges?",
      "Author: What new story or narrative do we want to create for the next sprint?"
    ],
    "Detective Retrospective": [
      "Clues: What evidence or indicators of success did we find?",
      "Mysteries: What remained unclear or unresolved?",
      "Solved Cases: What problems did we successfully solve?",
      "Unsolved Cases: What challenges do we need to address in the next sprint?",
      "Detective Tools: What tools or methods helped us investigate and solve issues?"
    ]
  };


  const handleSubmit = () => {
    const sections = {};
    sectionHeadings.forEach((heading, index) => {
      sections[heading] = [];
    });

    const details = {
      desc: desc,
      sections: sections,
    };
    socket.emit("create", details);

    navigate(`/retrospective/${desc}`, {
      state: {
        desc: desc,
        sections: sections,
      },
    });
  };

  const handleChangeSectionHeading = (index, value) => {
    const newHeadings = [...sectionHeadings];
    newHeadings[index] = value;
    setSectionHeadings(newHeadings);
  };

  const handleNumSectionsChange = (value) => {
    setNumSections(value);
    setSectionHeadings(Array(value).fill(""));
  };

  const handleDefaultOption = (model) => {
    if (model === "Custom") {
      setDesc("");
      setShowNumSections(true);
    } else {
      setDesc(model);
      setNumSections(defaultModels[model].length);
      setSectionHeadings(defaultModels[model]);
      setShowNumSections(false);
    }
  };

  const navigateToRoom = () => {
    navigate(`/retrospective/${name}`, {
      state: {
        desc: name,
        sections: {},
      },
    });
  };

  const sectionInputs = [];
  for (let i = 0; i < numSections; i++) {
    sectionInputs.push(
      <div key={i}>
        <input
          type="text"
          placeholder={`Section ${i + 1} Heading`}
          value={sectionHeadings[i]}
          onChange={(e) => handleChangeSectionHeading(i, e.target.value)}
          className="input-field mt-2"
        />
      </div>
    );
  }

  return (
    <div className={`transition-all duration-300 ${sidebarToggle ? "ml-0" : "ml-64"}`}>
      <ProjOptions />
      <div
      style={{
        backgroundImage: 'url("https://conceptboard.com/wp-content/uploads/Header_retro_article_V2-01.png"), linear-gradient(to right, #ffffff, #000000)',
        backgroundSize: 'cover',
        position: 'relative',
        // left: '10%',
        // width: sidebarToggle ? '60%':'100%' 
        width: '60%'
      }}

      className={`hero w-full flex justify-center items-center h-screen bg-gray-100 `}>
      
      <div className="bg-transparent bg-white relative left-[65%] rounded-lg shadow-2xl border-[4px] border-gray-400 p-10 max-w-md w-full">
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDesc(e.target.value);
              setShowNumSections(false); // Hide the second dropdown when the description changes
            }}
            className="input-field"
          />
        </div>
        <div className="mb-6">
          <select
            value={desc}
            onChange={(e) => {
              if (e.target.value === "Custom") {
                setShowNumSections(true); // Show the second dropdown when "Custom" is selected
              } else {
                handleDefaultOption(e.target.value);
              }
            }}
            className="input-field"
          >
            <option value="">Select a default option or choose Custom</option>
            {Object.keys(defaultModels).map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
            <option value="Custom">Custom</option>
          </select>
        </div>
        {showNumSections && (
          <div className="mb-6">
            <select
              value={numSections}
              onChange={(e) => handleNumSectionsChange(parseInt(e.target.value))}
              className="input-field"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value} Sections
                </option>
              ))}
            </select>
          </div>
        )}
        {sectionInputs}
        <button onClick={handleSubmit} className="note-btn-primary w-full mt-6">
          Create Room
        </button>
        <p className="text-gray-600 text-sm mt-4 text-center">or</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter Room Description"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="input-field"
          />
        </div>
        <button onClick={navigateToRoom} className="note-btn-secondary w-full mt-4">
          Join Room
        </button>
      </div>
    </div>

        {/* <LastButtons current={"Home"} /> */}
    </div>
  );
};

export default Home;
