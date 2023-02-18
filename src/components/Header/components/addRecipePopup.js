import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, DialogActions } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RecipeState } from "../../../context/context";

const StyledPaper = styled(Paper)`
  & {
    max-width: revert;
    width: 1200px;
  }

  & .MuiButton-root {
    background-image: linear-gradient(to right bottom, #fbdb89, #f48982);
    border-radius: 10rem;
    border: none;
    text-transform: uppercase;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.2s;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  & .MuiDialogActions-root {
    grid-column: 1/-1;
    justify-self: center;
  }
  & .MuiDialogTitle {
    justify-content: flex-end;
    display: flex;
    cursor: pointer;
  }
`;
export default function AddRecipePopup({
  open,
  handleClose,
  handleTextChange,
  handleUpload,
  inputObj
}) {

  const {state, dispatch} = RecipeState()
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        PaperComponent={StyledPaper}
      >
        <DialogTitle style={{display:"flex", justifyContent:"flex-end"}}>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleClose()}
          />
        </DialogTitle>
        <DialogContent>
          <div className="popup">
            <div className="popup__sectionOne">
              <h3>RECIPE DATA</h3>
              <label>Title <span style={{color:"red"}}>*</span></label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="title"
                name="title"
                placeholder="title"
                type="text"
                required
                value={inputObj?.["title"]}
              />
              <label >URL <span style={{color:"red"}}>*</span></label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="URL"
                name="URL"
                placeholder="url"
                type="text"
                required
                value={inputObj?.["URL"]}
              />
              <label>Image URL <span style={{color:"red"}}>*</span></label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="ImageURL"
                name="ImageURL"
                placeholder="image url"
                type="text"
                required
                value={inputObj?.["ImageURL"]}
              />
              <label>Publisher <span style={{color:"red"}}>*</span></label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="Publisher"
                name="Publisher"
                placeholder="Publisher"
                type="text"
                required
                value={inputObj?.["Publisher"]}
              />
              <label>Prep Time <span style={{color:"red"}}>*</span></label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="PrepTime"
                name="PrepTime"
                placeholder="Prep Time"
                type="number"
                required
                value={inputObj?.["PrepTime"]}
              />
              <label>Servings <span style={{color:"red"}}>*</span></label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="Servings"
                name="Servings"
                placeholder="Servings"
                type="number"
                required
                value={inputObj?.["Servings"]}
              />
            </div>
            <div className="popup__sectionTwo">
              <h3>INGREDIENTS</h3>
              <label>Ingredient 1 <span style={{color:"red"}}>*</span></label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="Ingredient 1"
                name="Ingredient1"
                placeholder="Format: 'Quantity, Unit, description'"
                type="text"
                required
                value={inputObj?.["Ingredient1"]}
              />
              <label>Ingredient 2 <span style={{color:"red"}}>*</span></label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="Ingredient 2"
                name="Ingredient2"
                placeholder="Format: 'Quantity, Unit, description'"
                type="text"
                required
                value={inputObj?.["Ingredient2"]}
              />
              <label>Ingredient 3 <span style={{color:"red"}}>*</span></label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="Ingredient 3"
                name="Ingredient3"
                placeholder="Format: 'Quantity, Unit, description'"
                type="text"
                required
                value={inputObj?.["Ingredient3"]}
              />
              <label>Ingredient 4</label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="Ingredient 4"
                name="Ingredient4"
                placeholder="Format: 'Quantity, Unit, description'"
                type="text"
          
                value={inputObj?.["Ingredient4"]}
              />
              <label>Ingredient 5</label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="Ingredient 5"
                name="Ingredient5"
                placeholder="Format: 'Quantity, Unit, description'"
                type="text"
                
                value={inputObj?.["Ingredient5"]}
              />
              <label>Ingredient 6</label>
              <input
                onChange={(e) => handleTextChange(e)}
                id="Ingredient6"
                name="Ingredient 6"
                placeholder="Format: 'Quantity, Unit, description'"
                type="text"
           
                value={inputObj?.["Ingredient6"]}
              />
            </div>
            <DialogActions>
              <Button onClick={() => handleUpload()}>Upload</Button>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
