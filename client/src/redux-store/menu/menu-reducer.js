import {mainMenuGraph, additiveMenuGraph} from "../../mock/menu-mock";

const initialState = {
  mainMenu: mainMenuGraph,
  additiveMenu: additiveMenuGraph,
};

const ActionType = {
  LOAD_MENU: "LOAD_MENU"
};

const ActionCreator = {
  loadMenu(menu) {
    return {
      type: ActionType.LOAD_MENU,
      payload: menu
    }
  }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.LOAD_MENU:
      return Object.assign(state, {
        menu: action.payload
      });
      
    default: 
      return state
  }
}