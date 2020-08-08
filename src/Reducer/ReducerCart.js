import BrandMenu from "../Component/Product/Menubrand";

const  ReducerCart =(state =[],action)=>{
       
  // console.log(action.type);
       switch(action.type)
       {
          case 'ADD_CART':
              return state.concat([action.data]);
         break;
         case 'DELETE_CART':
               return state.filter((item)=>item.PRD_id !== action.data)
            break;
            case 'INCREMENT_AMOUNT':

              return state.map((item)=>{
                     if(item.PRD_id ===action.data.PRD_id)
                     { 
                         return {
                            ...state,
                            PRD_id     : action.data.PRD_id,
                            PRD_name   : action.data.PRD_name,
                            PRD_price  : action.data.PRD_price,
                            PRD_img    : action.data.PRD_img,
                            PRD_Amount : (action.data.PRD_Amount+1)  
                         }
                     }else
                     {
                        return item;
                     }
   
                 });
            break;
            case 'SUBTRACT_AMOUNT' :
                  return state.map((item)=>{
                     if(item.PRD_id ===action.data.PRD_id)
                     { 
                         return {
                            ...state,
                            PRD_id     : action.data.PRD_id,
                            PRD_name   : action.data.PRD_name,
                            PRD_price  : action.data.PRD_price,
                            PRD_img    : action.data.PRD_img,
                            PRD_Amount : (action.data.PRD_Amount-1)===0 ?1 : (action.data.PRD_Amount-1)
                         }
                     }else
                     {
                        return item;
                     }
   
                 });
            break;
         default:
          return state;              
        
       }

}
export default ReducerCart;