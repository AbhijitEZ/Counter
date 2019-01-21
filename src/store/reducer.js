import * as actionTypes from './actions'
const initialState = {
  counter : 1,
  result : [],
 
}

const reducer = (state = initialState ,action) => {
  
  switch (action.type){
      case actionTypes.INCREMENT:
        return {
          ...state,
          counter: state.counter + 1
        }
  
      case actionTypes.DECREMENT:
        return {
          ...state,
          counter: state.counter - 1
        }
      case actionTypes.ADD:
        return {
          ...state,
          counter: state.counter + action.payload.value
        }
      
        case actionTypes.RESET:
          return {
            ...state,
            counter: initialState.counter
          }
          case actionTypes.STORE_RESULT:
          return {
            ...state,
            result : state.result.concat({id : new Date(),value :state.counter})
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