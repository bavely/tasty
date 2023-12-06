import "./utils/css/App.css";
import Recipe from "./components/Recipe";
import { getRecipes } from "./services/APICalls";
import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { MouseEvent } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import BottomNavigation from '@mui/material/BottomNavigation';
const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setRecipes([]);
    setMsg("");
    setLoading(true);
    if (userInput === "") {
      setMsg("Please type something!");
      setLoading(false);
      return;
    }
    setMsg("");
    getRecipes(userInput)
      .then((res) => {
        res?.data?.count && res.data.count > 0
          ? setMsg(`${res.data.count} results found`)
          : setMsg("No Results");
        setRecipes(
          res.data.hits.map(
            (hit: { recipe: { name: string; ingredients: string[] } }) =>
              hit.recipe
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        setMsg("Something went wrong!");
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h5>Tasty</h5>
      <Container sx={{ py: 8 }}>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                float: "right",
                alignSelf: "center",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Tasty Dish!"
                // inputProps={{ 'aria-label': 'search google maps' }}
                value={userInput}
                onChange={handleChange}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
        <Grid xs={4}>
          <Typography>{msg}</Typography>
        </Grid>
        <ul>
          {loading && <CircularProgress />}
          <Grid container spacing={2}>
            {recipes.map((recipe, index) => (
              <Grid key={index} xs={4}>
                {" "}
                <Recipe item={recipe} />
              </Grid>
            ))}
          </Grid>
        </ul>

      </Container>

            
          <div className="footer row">
      <div className='text-center pt-3 pb-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.09)' , position: 'fixed', bottom: 0, width: '100%'}}>
        © 2023 Bavely Tawfik
      </div>
      </div>
          {/* </Typography>
        </BottomNavigation> */}
    </div>
  );
};

export default App;
