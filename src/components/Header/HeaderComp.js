import React, { useContext, useState } from "react";
import "./Header.scss";
import logo from "../../assets/img/favicon.png";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddIcon from "@mui/icons-material/Add";
import { RecipeState } from "../../context/context";
import axios from "axios";
import { reducer } from "../../context/reducer";
import { useNavigate } from "react-router-dom";
import AddRecipePopup from "./components/addRecipePopup";
import { Snackbar } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

function HeaderComp({ setSearch, search }) {
  const { state, dispatch } = RecipeState();
  const navigate = useNavigate();
  const [bookmarkPopup, setBookmarkPopup] = useState(false);
  const [openaddPopup, setOpenAddPopup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [inputObj, setInputObj] = useState({
    title: "Test123",
    URL: "Test123",
    ImageURL: "Test123",
    Publisher: "Test123",
    PrepTime: 0,
    Servings: 1,
    Ingredient1: "1,2,test",
    Ingredient2: "1,2,test",
    Ingredient3: "1,2,test",
    Ingredient4: "",
    Ingredient5: "",
    Ingredient6: "",
  });

  let apiKey = "98f72371-64e4-4384-b04d-e3e789d57a35";

  /**
   * function to handle search tab
   */
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  /**
   * function to dispatch the searched recipe to the state
   * @param {*} e
   * @returns
   */
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ state, type: "resetPagination" });
    try {
      const res = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}&key=${apiKey}`
      );
      if (res.data?.data) {
        dispatch({
          state,
          type: "searchRecipe",
          payload: res.data?.data?.recipes,
        });
      }
    } catch (err) {
      return err.status;
    }
  };

  const handleBookmarkRoute = (e, item) => {
    dispatch({
      state,
      type: "selectedRecipe",
      payload: item,
    });

    navigate(`/${item.id}`);

    setBookmarkPopup(false);
  };

  /** popup section here... */

  const handleClickOpen = () => {
    setOpenAddPopup(!openaddPopup);
  };

  const handleClose = () => {
    setOpenAddPopup(false);
  };

  const handleTextChange = (e) => {
    const data = { ...inputObj };
    const { name, value } = e.target;
    data[name] = value;
    setInputObj(data);
  };
  console.log("d", inputObj);

  const handleUpload = async () => {
    try {
      const ingredients = Object.entries(inputObj)
        .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
        .map((ing) => {
          const ingArr = ing[1].split(",").map((el) => el.trim());
          // const ingArr = ing[1].replaceAll(' ', '').split(',');
          if (ingArr.length !== 3)
            throw new Error(
              "Wrong ingredient fromat! Please use the correct format :)"
            );

          const [quantity, unit, description] = ingArr;

          return { quantity: quantity ? quantity : null, unit, description };
        });

      const recipe = {
        title: inputObj?.title,
        source_url: inputObj?.URL,
        image_url: inputObj?.ImageURL,
        publisher: inputObj?.Publisher,
        cooking_time: inputObj?.PrepTime,
        servings: inputObj?.Servings,
        ingredients,
      };
      const res = await axios.post(
        `https://forkify-api.herokuapp.com/api/v2/recipes?key=${apiKey}`,
        recipe
      );
      console.log(res);
    } catch (err) {
      throw err;
    }
    setOpenAddPopup(false);
    setOpen(true);
  };

const handleSnackBarClose = () => {
  setOpen(false)
}
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="header">
      <AddRecipePopup
        open={openaddPopup}
        handleClose={handleClose}
        handleTextChange={handleTextChange}
        handleUpload={handleUpload}
        inputObj={inputObj}
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Recipe was successfully added."
        action={action}
      />
      <div className="headerSecOne">
        <div className="logoSection">
          <img src={logo} alt="logo" className="headerLogo" />
          <div className="logoText">forkify</div>
        </div>
      </div>
      <div className="searchSection">
        <div className="inputDiv">
          <input
            onChange={(e) => handleChange(e)}
            id="search"
            placeholder="Search Over 1,000, recipes..."
            type="text"
          />
        </div>
        <div className="searchDiv" onClick={(e) => handleClick(e)}>
          <div className="searchIcon">
            <SearchIcon />
          </div>
          <div className="searchText">Search</div>
        </div>
      </div>
      <div className="headerSectionTwo">
        <div className="addRecipeSec" onClick={() => handleClickOpen()}>
          <AddIcon style={{ color: "#f38e82" }} />
          <div>Add Recipe</div>
        </div>
        <div style={{ position: "relative" }}>
          <div
            className="bookmarkSec"
            style={{ cursor: "pointer" }}
            onClick={() => setBookmarkPopup(!bookmarkPopup)}
          >
            <BookmarkBorderIcon style={{ color: "#f38e82" }} />
            <div>Bookmarks</div>
          </div>
          {bookmarkPopup && state?.bookmarkData?.length > 0 && (
            <div className="bookmarkDropdown">
              {
                <>
                  {state?.bookmarkData?.map((itm) => (
                    <div
                      className="dropdownDiv"
                      key={itm}
                      onClick={(e) => handleBookmarkRoute(e, itm)}
                    >
                      <div className="body_img">
                        <img src={itm?.image_url} />
                      </div>
                      <div className="body_list">
                        <div className="body_title">{itm?.title}</div>
                        <div className="body_publisher">{itm?.publisher}</div>
                      </div>
                    </div>
                  ))}
                </>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderComp;
