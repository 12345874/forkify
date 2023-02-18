export const reducer = (state, action) => {
  switch (action.type) {
    case "searchRecipe":
      return { ...state, searchedRecipe: action.payload };
    case "prevVal":
      return {...state, prevVal: action.payload}
    case "nextVal":
      return {...state, nextVal: action.payload}
      case "currentVal":
        return {...state, currentVal: action.payload};
      case "currentData":
        return {...state, currentData: action.payload};
      case "resetPagination":
        return {...state, prevVal: 0, nextVal:2, currentVal:1}
      case "selectedRecipe":
        return {...state, selectedRecipeData:action.payload};
      case "bookmarkRecipe":
        return {...state, bookmarkData: action.payload};
      case "filterBookmarkRecipe" :
        return {...state, bookmarkData: action.payload};
      case "addRecipeObj" :
        return {...state, addRecipeObj: action.payload};
    default:
      return state;
  }
};
