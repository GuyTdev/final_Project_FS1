import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import AllMovies from "./AllMovies";
import AddMovie from "./AddMovie";
import { useNavigate, useParams, useResolvedPath } from "react-router-dom";
import EditMovie from "./EditMovie";

const MoviesMenu = () => {
  const route= useResolvedPath()
  const {id} = useParams()
  const pages = [
    { componentName: AllMovies, viewName: "All Movies", routeName: "" },
    { componentName: AddMovie, viewName: "Add Movie", routeName: "addmovie"}
  ];
  const [value, setValue] = useState(route.pathname ==='/api/movies/addmovie'?pages[1].viewName:pages[0].viewName);
  const navigate = useNavigate();
  useEffect(() => {
    setValue(route.pathname ==='/api/movies/addmovie'?pages[1].viewName: pages[0].viewName)
  }, [route.pathname])

  
  const handleChange = (event, newValue) => {
    console.log("event.target.name",event.target.name);
    console.log(event.target.value);
    setValue(newValue);
    navigate(`${event.target.name}`)
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
    <h3>Movies</h3>
      {!id?
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            centered
            aria-label="lab API tabs example"
          >
            {pages?.map((page) => (
              <Tab
                key={page.componentName}
                label={page.viewName}
                name = {page.routeName}
                value={page.viewName}
              />
            ))}
          </TabList>
        </Box>
        {pages?.map((page) => (
          <TabPanel key={page.componentName} value={page.viewName}>
            <page.componentName />
          </TabPanel>
        ))}
      </TabContext>
      :<EditMovie/>}
    </Box>
  );
};
export default MoviesMenu;