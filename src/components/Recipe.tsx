import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import "../utils/css/Recipe.scss"
import { Button } from "@mui/material";
const Recipe = (props: {
  item: {
    label: string;
    ingredientLines: string[];
    image: string;
    healthLabels: string[];
    url: string;
    calories: number;
  };
}) => {
  const { label, ingredientLines, image, calories } = props.item;

  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardHeader
        title={label}
        subheader={`Calories: ${Math.round(calories)}`}
        sx={{ minHeight: "150px", maxHeight: "150px" }}
      />
      <CardMedia component="img" height="194" image={image} alt={label} />
      <CardContent>
        <Typography variant="body1" color="">
          Ingredients:
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            minHeight: "200px",
            maxHeight: "200px",
            overflow: "auto",
            paddingBottom: "30px",
            marginTop: "10px",
          }}
        >
          {ingredientLines.map((line, index) => (
            <li key={index} style={{ listStyleType: "none" }}>
              {line}
            </li>
          ))}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ float: "right" }}>
        <Button
          href={props.item.url}
          target="_blank"
          rel="noreferrer"
          variant="outlined"
          className="recipe-card"
        >
          View More...
        </Button>
      </CardActions>
    </Card>
  );
};

export default Recipe;

// const Recipe: React.FC<{item: {name: string, ingredients: string[]}}> = (props) => {

//     const {name, ingredients} = props.item

//   return (
//     <div>{name}</div>
//   )
// }

// export default Recipe
