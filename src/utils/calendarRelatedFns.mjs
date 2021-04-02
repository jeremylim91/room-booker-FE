import moment from 'moment'
// initialise a date to today's date 
let today = new Date();

// get lower bound date for calendar (today -1 mth)
export const getLowerBoundDate= ()=>{
 return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)
}
// get upper bound date for calendar (today +5 mths)
export const getUpperBoundDate= ()=>{
 return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19)

}
