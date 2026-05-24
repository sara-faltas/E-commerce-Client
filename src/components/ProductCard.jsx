import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import backpack from "../images/backpack.webp";

function ProductCard(props) {
    
   const navigate = useNavigate();

  return (
    <>
      <Card
        onClick={navigate(`/recipes/${props.product.id}`)}
        sx={{
          maxWidth: 345,
          position: "relative",
          cursor: "pointer",
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 6,
          },
        }}
      >
        {/* // favorite icon */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "white",
            "&:hover": {backgroundColor: "#f5f5f5"},
          }}
        >
          <FavoriteIcon />
        </IconButton>
        {/* HandleImage */}
        <CardMedia
          component="img"
          alt={props.product.title}
          height="140"
          image={selectedColor.image}
        />
          {/* CONTENT */}
        <CardContent sx={{ textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
             {props.product.title}
            </Typography>
          </Box>

          <Typography gutterBottom variant="h4" variant="body2" sx={{ color: "text.secondary" }}>
           {props.product.description}
          </Typography>

          <Typography variant="body2">
           {props.product.price} $
          </Typography>
        {/* COLORS */}
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          {product.colors.map((color) => (
            <Box
              key={color.name}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(color);
              }}
              sx={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: color.name,
                cursor: "pointer",
                border:
                  selectedColor.name === color.name
                    ? "2px solid black"
                    : "none",
              }}
            />
          ))}
        </Box>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
       
      </Card>
    </>
  );
}

export default ProductCard;
