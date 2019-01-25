// The Authentication middleware
// import { connected } from "./session";
import User from "../models/User";
import { getToken } from "../libs/session";

const whiteList = [
    "/users/login",
    "/users/signup"
]

// Create a middlware that filter the routes
function authHeader(req, res, next) {

    // If the route is not protected => next()
    console.log("path: ", req.path);
    if(whiteList.indexOf(req.path) !== -1)
        return next();

    // Get the token from the req.headers and search in the Connected variable with the token to get the user id
    const token = req.headers['token'];
    // if !token => 400 status token not provided
    if(!token) {
        return res.status(400).send("Token not provided")
    }


    // if(!connected.hasOwnProperty(token)) {
    //     return res.status(400).send("Token is not valid");
    // }
    
    //////////////////////-Redis-/////////////////////////////////

    
    // getToken(token).then((userId) => {
    //     let x = User.findById(userId)


    //     x.then( user => {
    //         // Stock the user in req.session variable
    //         console.log("user: ", user); 
    //         req.session = user;
    //         next();
    //     })
    //     // if !user => 404 status user not found
    //     .catch(err => {
    //         res.status(404).send("User Not Found");
    //     })
    // })
    // .catch(err => res.send(err.message, 500))


    getToken(token)
        .then(userId => User.findById(userId))
        .then(user => {
            console.log("user: ", user); 
            req.session = user;
            return next();
        })
        .catch(err => res.send(err.message, 500)) 

    // client.get(token, function(err, reply) {

    //     if(!reply)
    //         return res.status(400).send("Token is not valid");

    //     console.log("userId" ,reply);
        
    //     User.findById(reply)
    //     .then( user => {
    //         // Stock the user in req.session variable
    //         console.log("user: ", user); 
    //         req.session = user;
    //         next();
    //     })
    //     // if !user => 404 status user not found
    //     .catch(err => {
    //         res.status(404).send("User Not Found");
    //     })
    // })
}

// auth cookies
function auth(req, res, next) {

    // If the route is not protected => next()
    console.log("path: ", req.path);
    if(whiteList.indexOf(req.path) !== -1)
        return next();

    // Get the token from the req.headers and search in the Connected variable with the token to get the user id
    const token = req.cookies['authToken'];
    // if !token => 400 status token not provided
    if(!token) {
        return res.status(401).send("Token cookie not provided")
    }


    getToken(token)
        .then(userId => User.findById(userId))
        .then(user => {
            console.log("user: ", user); 
            
            req.session = Object.assign({}, req.session, { currentUser: user });
            
            return next();
        })
        .catch(err => res.send(err.message, 500)) 
}

// export auth middleware
export default auth;

