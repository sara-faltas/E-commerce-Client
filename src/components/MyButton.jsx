import Button from "@mui/material/Button";

export default function MyButton({ 
  children,
  variant = "contained",
  color = "primary",
  hoverColor,
  bgColor,
  onClick,
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
     sx={{
        textTransform: "none",
        borderRadius: "8px",
        backgroundColor: bgColor,
        "&:hover": {
          backgroundColor: hoverColor,
        },
         padding: "8px 16px",
         mt:2,
      }}
       
    >
      {children}
    </Button>
  );
}