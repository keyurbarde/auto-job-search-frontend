import { useEffect, useState } from "react";
import Skill from "../Skill/Skill";
import Listings from "../Listings/Listings";
import { useLocation } from "react-router-dom";

const dummySkills = [
  "ReactJs",
  "NodeJs",
  "ExpressJs",
  "Java",
  "C++",
  "UI/UX",
  "SQL",
  "MongoDB",
  "HTML",
  "CSS",
];

const jobListings = [
  {
    position: "Software Engineer, Front End",
    company: "Microsoft",
    location: "Hyderabad, Telangana, India",
    posted: "3 days ago",
    match: 4,
  },
  {
    position: "Frontend Developer",
    company: "Meta",
    location: "Bengaluru, Karnataka, India",
    posted: "2 weeks ago",
    match: 3,
  },
  {
    position: "React Developer",
    company: "Amazon",
    location: "Chennai, Tamil Nadu, India",
    posted: "5 days ago",
    match: 2,
  },
  {
    position: "UI/UX Engineer",
    company: "Adobe",
    location: "Noida, Uttar Pradesh, India",
    posted: "1 week ago",
    match: 1,
  },
  {
    position: "Web Developer",
    company: "Netflix",
    location: "Mumbai, Maharashtra, India",
    posted: "4 days ago",
    match: 4,
  },
];

const Search = () => {
  const [skills, setSkills] = useState([]);
  const [chosenSkills, setChosenSkills] = useState(() => new Set());
  const [customSkill, setCustomSkill] = useState("");
  const [showListings, setShowListings] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobListings, setJobListings] = useState();
  let { state } = useLocation();

  useEffect(() => {
    console.log(state);
    const skillsArr = [...state.skills.skill, ...state.skills.education];
    setSkills(skillsArr);
    setTitle(state.domain_info[1]);
  }, []);

  const onSkillClick = (skill) => {
    if (chosenSkills.has(skill)) {
      setChosenSkills((prev) => {
        const set = new Set(prev);
        set.delete(skill);
        return set;
      });
    } else {
      setChosenSkills((prev) => new Set(prev).add(skill));
    }
  };

  const OnClearChosenSkills = () => {
    setChosenSkills(() => new Set());
  };

  const OnChooseAllSkills = () => {
    let set = new Set();

    for (let skill of skills) {
      set.add(skill);
    }

    setChosenSkills(() => new Set(set));
  };

  const onCustomSkillChange = (e) => {
    setCustomSkill(e.target.value);
  };

  const onAddCustomSkill = (e) => {
    e.preventDefault();
    if (customSkill.trim().length < 1) {
      return;
    }
    setSkills([...skills, customSkill]);
    setCustomSkill("");
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const onContinue = () => {
    if (chosenSkills.size < 3 || !title || !location) {
      return;
    }
    async function sendChosenSkills() {
      try {
        const skills = Array.from(chosenSkills);

        const sendObj = JSON.stringify({ skills, title, location });

        const res = await fetch("http://localhost:8000/post-skills/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: sendObj,
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setJobListings(data);
          setShowListings(true);
        } else {
          const errorData = await res.json();
          alert(errorData.error || "Something went wrong");
        }
      } catch (error) {
        console.error("Error Sending Skills:", error);
      }
    }
    sendChosenSkills();
  };

  const onBackFromListings = () => {
    setShowListings(false);
  };

  if (showListings) {
    return (
      <Listings
        chosenSkills={chosenSkills}
        onBack={onBackFromListings}
        jobListings={jobListings}
      />
    );
  }

  return (
    <div>
      <h1>Choose your skills</h1>

      <div className="search-skills-container">
        {skills.map((skill, idx) => (
          <Skill
            key={idx}
            isSelected={chosenSkills.has(skill)}
            onClick={() => onSkillClick(skill)}
          >
            {skill}
          </Skill>
        ))}
      </div>

      <button className="btn" onClick={() => OnClearChosenSkills()}>
        Clear All
      </button>
      <button className="btn" onClick={() => OnChooseAllSkills()}>
        Select All
      </button>
      <button
        className="btn"
        onClick={() => {
          onContinue();
        }}
      >
        Continue
      </button>

      <form onSubmit={onAddCustomSkill}>
        <label>Add manually</label>
        <input type="text" onChange={onCustomSkillChange}></input>
        <button type="submit">Add Skill</button>
      </form>

      <form>
        <label>Job Title</label>
        <input
          type="text"
          onChange={onTitleChange}
          defaultValue={title}
        ></input>
        <label>Location</label>
        <input type="text" onChange={onLocationChange}></input>
      </form>
    </div>
  );
};

export default Search;
