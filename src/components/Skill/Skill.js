import "./Skill.css";

const Skill = ({ isSelected, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={"skill" + (isSelected ? " skill-selected" : "")}
    >
      {children}
    </button>
  );
};

export default Skill;
