
const browserReducer = (state, {type, payload}) => {
    switch (type){
        case "NAME":
            return {
                ...state, 
                name: payload
            }
            case "TIME":
                return{
                    ...state,
                    time:payload
                }
            case "MESSAGE":
                return{
                    ...state,
                    Message:payload>=0 && payload<=12?"good morning" : payload>12 && payload<=17?"good afternoon":"good evening"

                }
            case "TASK":
                return{
                    ...state,
                    task:payload
                }
            case "CLEAR":
                return{
                    ...state,
                    task:null
                }
            default:
                return state
        }
            }
export default browserReducer;