import React, { useEffect, useState } from "react";
import "./body.scss";
import { RecipeState } from "../../context/context";
import { CircularProgress } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Body() {
  const { state, dispatch } = RecipeState();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updatedData = state?.searchedRecipe.slice(0, 10);
    dispatch({ state, type: "currentData", payload: updatedData });
    const totalPageCount = Math.ceil(state?.searchedRecipe.length / 10);
    setCount(totalPageCount);
  }, [state.searchedRecipe]);

  /**
   * function to handle next click
   * @param {*} e
   */
  const nextClick = (e) => {
    let currentPage = state?.currentVal + 1;
    let nextCount = state?.nextVal;
    let prevCount = state?.prevVal;
    let num1;
    let num2;
    dispatch({ state, type: "nextVal", payload: nextCount + 1 });
    dispatch({ state, type: "prevVal", payload: prevCount + 1 });
    dispatch({ state, type: "currentVal", payload: currentPage });
    num1 = Number(currentPage * 10);
    num2 = Number(currentPage * 10 + 10);
    const updatedData = state?.searchedRecipe.slice(num1, num2);
    dispatch({ state, type: "currentData", payload: updatedData });
  };

  /**
   * function to handle prev click
   * @param {} e
   */
  const prevClick = (e) => {
    let currentPage = state?.currentVal - 1;
    let nextCount = state?.nextVal;
    let prevCount = state?.prevVal;
    let num1;
    let num2;
    dispatch({ state, type: "nextVal", payload: nextCount - 1 });
    dispatch({ state, type: "prevVal", payload: prevCount - 1 });
    dispatch({ state, type: "currentVal", payload: currentPage });
    num1 = Number(currentPage * 10);
    num2 = Number(currentPage * 10 + 10);
    const updatedData = state?.searchedRecipe.slice(num1, num2);
    dispatch({ state, type: "currentData", payload: updatedData });
  };

  const handleRecipePreview = async (item) => {
    try {
      const res = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${item?.id}`
      );
      if (res.data?.data) {
        dispatch({
          state,
          type: "selectedRecipe",
          payload: res.data?.data?.recipe,
        });
      }
      navigate(`/${item.id}`);
    } catch (err) {
      return err.status;
    }
  };

  console.log(state?.selectedRecipeData);

  const updateServing = (currentServing) => {
    state?.selectedRecipeData?.ingredients.forEach((ing) => {
      ing.quantity =
        (ing.quantity * currentServing) / state.selectedRecipeData.servings;
      // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
    });

    state.selectedRecipeData.servings = currentServing;
    dispatch({
      state,
      type: "selectedRecipe",
      payload: state.selectedRecipeData,
    });
  };

  /**
   * function to handle bookmarks
   */
  const handleBookmark = (selected) => { 
    let shallowCopy = [...state?.bookmarkData]
    if(shallowCopy?.length > 0) {
      if(shallowCopy.some((itm) => itm.id !== selected?.id)) {
         shallowCopy.push(selected)
        dispatch({ state, type: "bookmarkRecipe", payload: shallowCopy });
      } else {
       let filterData =  shallowCopy?.filter((f) => f?.id !== selected?.id)
        dispatch({ state, type: "filterBookmarkRecipe", payload: filterData });
      }
    } else {
      shallowCopy.push(selected)
      dispatch({ state, type: "bookmarkRecipe", payload: shallowCopy });
    }
    
  }

  console.log(state)

  return (
    <div
      className={`${
        state?.searchedRecipe?.length === 0 && "body_addHeight"
      } main-body`}
    >
      <div className="body_left--section">
        <div
          className="body_left--sectionOne"
          style={{ display: "flex", flexDirection: "column"}}
        >
          {state.currentData?.length > 0 ? (
            <>
              {state.currentData?.map((itm, index) => (
                <div
                  className="body_recipeList"
                  key={index}
                  onClick={() => handleRecipePreview(itm)}
                >
                  {" "}
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
          ) : (
            <div className="body_loader">
              <CircularProgress style={{ color: "#f38e82" }} />
            </div>
          )}
        </div>
        {state?.searchedRecipe?.length > 0 && (
          <div className="body_left--sectionTwo">
            {/* pagination comes here... */}
            {state?.prevVal != 0 && (
              <div onClick={(e) => prevClick(e)} className={`body_prev`}>
                &nbsp;
                <NavigateBeforeIcon />
                Prev&nbsp;<span>{state?.prevVal}</span>
              </div>
            )}
            {state?.nextVal < count && (
              <div
                onClick={(e) => nextClick(e)}
                className={`${
                  state?.prevVal === 0 ? "body_addNext" : "body_next"
                } `}
              >
                Next&nbsp;<span>{state.nextVal}</span>&nbsp;
                <NavigateNextIcon />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="body_right--section">
        {Object.keys(state?.selectedRecipeData).length === 0 ? (
          <div className="body_message">
            <p>Start by searching for a recipe or an ingredient. Have fun!</p>
          </div>
        ) : (
          <div className="recipe">
            <figure className="recipe__fig">
              <img
                src={state?.selectedRecipeData?.image_url}
                alt=""
                className="recipe__img"
              />
              <h1 className="recipe__title">
                <span>{state?.selectedRecipeData?.title}</span>
              </h1>
            </figure>
            <div className="recipe__details">
              <div className="recipe__info">
                <AccessTimeIcon className="recipe__info-icon" />
                <span className="recipe__info-data recipe__info-data--minutes">
                  {state?.selectedRecipeData?.cooking}
                </span>
                <span className="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <PeopleAltIcon className="recipe__info-icon" />
                <span class="recipe__info-data recipe__info-data--people">
                  {state?.selectedRecipeData?.servings}
                </span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                  <AddCircleOutlineIcon
                    className="recipe__plus-button"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      updateServing(state?.selectedRecipeData?.servings + 1)
                    }
                  />
                  <RemoveCircleOutlineIcon
                    className="recipe__minus-button"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      state?.selectedRecipeData?.servings > 1 &&
                      updateServing(state?.selectedRecipeData?.servings - 1)
                    }
                  />
                </div>
              </div>
              <div class="recipe__user-generated" onClick={() => handleBookmark(state?.selectedRecipeData)}>
                {<BookmarkIcon className={`${state?.bookmarkData.some((f) => f?.id === state?.selectedRecipeData?.id)  ? "addBlackColor": "whiteColor"} recipe__user--bookmark`} />}
              </div>
            </div>
            <div className="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul className="recipe__ingredients-list">
                {state?.selectedRecipeData?.ingredients?.map((item) => (
                  <li className="recipe__ingredient">
                    <DoneIcon className="recipe__icon" />
                    <div className="recipe__quantity">{item?.quantity}</div>
                    <div className="recipe__description">
                      <span className="recipe__unit">{item?.unit}</span>
                      {item?.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">Closet Cooking</span>. Please check out
            directions at their website.
          </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;
