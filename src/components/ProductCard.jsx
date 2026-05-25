import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";


import backpack from "../images/backpack.webp";

function ProductCard(props) {
    
   const navigate = useNavigate();

  return (
<div>
      <Card
        style={{
          width: "18rem",
          padding: "1rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          height: "100%",
        }}
      >
        
        <Card.Img variant="top" src={props.product.imageColor.image} />
        
        <Card.Body>
          <Card.Title>{props.product.title}</Card.Title>
          <Card.Text>{props.product.description}</Card.Text>
          
          <Button
            style={{ margin: "0.5rem" }}
            variant="primary"
            onClick={() => {
              navigate(`/recipes/${props.product.id}`);
            }}
          >
            View Details
          </Button>
        </Card.Body>
      </Card>
    </div>


    // <>
    //   <Card
    //     onClick={navigate(`/recipes/${props.product.id}`)}
    //     sx={{
    //       maxWidth: 345,
    //       position: "relative",
    //       cursor: "pointer",
    //       transition: "0.2s",
    //       "&:hover": {
    //         transform: "scale(1.02)",
    //         boxShadow: 6,
    //       },
    //     }}
    //   >
    //     {/* // favorite icon */}
    //     <IconButton
    //       sx={{
    //         position: "absolute",
    //         top: 8,
    //         right: 8,
    //         backgroundColor: "white",
    //         "&:hover": {backgroundColor: "#f5f5f5"},
    //       }}
    //     >
    //       <FavoriteIcon />
    //     </IconButton>
    //     {/* HandleImage */}
    //     <CardMedia
    //       component="img"
    //       alt={props.product.title}
    //       height="140"
    //       image={backpack}
    //     />
    //       {/* CONTENT */}
    //     <CardContent sx={{ textAlign: "left" }}>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Typography gutterBottom variant="h5" component="div">
    //          {props.product.title}
    //         </Typography>
    //       </Box>

    //       <Typography gutterBottom variant="h4" variant="body2" sx={{ color: "text.secondary" }}>
    //        {props.product.description}
    //       </Typography>

    //       <Typography variant="body2">
    //        {props.product.price} $
    //       </Typography>
    //     {/* COLORS */}
    //     <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
    //       {props.product.colors.map((color) => (
    //         <Box
    //           key={color.name}
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             setSelectedColor(color);
    //           }}
    //           sx={{
    //             width: 20,
    //             height: 20,
    //             borderRadius: "50%",
    //             backgroundColor: color.name,
    //             cursor: "pointer",
    //             border:
    //               selectedColor.name === color.name
    //                 ? "2px solid black"
    //                 : "none",
    //           }}
    //         />
    //       ))}
    //     </Box>
    //     </CardContent>
    //     {/* <CardActions>
    //       <Button size="small">Share</Button>
    //       <Button size="small">Learn More</Button>
    //     </CardActions> */}
       
    //   </Card>
    // </>
  );
}

export default ProductCard;
