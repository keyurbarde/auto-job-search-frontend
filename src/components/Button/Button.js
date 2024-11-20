import "./Button.css";

const Button = ({ children, onClick, bgcolor, color, size }) => {
  const mystyle = {
    color: color ? color : "#e2f3f5",
    backgroundColor: bgcolor ? bgcolor : "#0e153a",
    padding: "8px 12px",
    fontSize: size ? size : "16px",
  };

  return (
    <button className="button" onClick={onClick} style={mystyle}>
      {children}
    </button>
  );
};

export default Button;
