import { useEffect, useState } from "react";
import Skill from "../Skill/Skill";
import "./Listings.css";
import SingleListing from "../SingleListing/SingleListing";

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

const Listings = ({ chosenSkills, onBack }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    setListings(jobListings);
  }, []);

  return (
    <>
      <button className="btn" onClick={onBack}>
        Back
      </button>

      <div className="skills-container">
        {Array.from(chosenSkills).map((skill, idx) => (
          <Skill key={idx} isSelected={false}>
            {skill}
          </Skill>
        ))}
      </div>

      <div className="listings-container">
        {listings.map((listing) => (
          <SingleListing listing={listing} />
        ))}
      </div>
    </>
  );
};

export default Listings;
