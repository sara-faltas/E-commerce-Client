import Button from "react-bootstrap/Button";

function CustomButton({
  text,
  onClick,
  type = "button",
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      className="custom-btn"
    >
      {text}
    </Button>
  );
}

export default CustomButton;