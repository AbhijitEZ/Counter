import * as actionTypes from '../actions'
const initialState = {
  result : [],
 
}

const reducer = (state = initialState ,action) => {
  
  switch (action.type){

          case actionTypes.STORE_RESULT:
          return {
            ...state,
            result : state.result.concat({id : new Date(),value :action.payload.currentCounter})
          }
          case actionTypes.DELETE_RESULT:
          let updatedArray = state.result.filter((res,inx) => res.id !== action.payload.inputElId)
          return {
            ...state,
            result : updatedArray
          }
          
          default :
         break;
          
    }
    return state;
}

export default reducer;