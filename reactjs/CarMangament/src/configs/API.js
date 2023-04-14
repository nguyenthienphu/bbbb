import axios from "axios";



export const endpoints = {
    "CarName":"/CarName/",
    "TripName":"/TripName/",
    "Car" : (TripNameId) => `/TripName/${TripNameId}/Car/`,
    "Car-Detail" : (CarId) => `/Car/${CarId}/`,
    "Login" : "/o/token/",
    "Current-User" : "/User/current-user"
}



export default axios.create({
    baseURL:" http://127.0.0.1:8000/"
})