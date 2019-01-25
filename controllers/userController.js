// UserController : Create a Router that contain all the route with url and method (using express router)
import User from "../models/User";
import uniqid from "uniqid";
// import { connected } from "../authenticate/session";
import { setToken } from "../libs/session";


const male = ['achraf', 'mehdi', 'bahaa'] 

const getGender = name => male.includes(name) ? 'male' : 'girl'

// Create a funtion that verifiy username and password 
export function autenticate(req, res) {

    // We get the username and password from the req
    const {username, password} = req.body;
    
    if(!(username && password))
        return res.status(400).send('Please provide a valid username and password');

    User.findOne({username, password})
        // If the user exist
        .then( user => {
            // Generate a Token
            const token = uniqid();
            // Stock the token and the user id in Connected variable from session file
            
            setToken(token, user._id.toString())
            // connected[token] = user._id;
            // Return res status(200) with the token

            res.cookie('authToken', token, {maxAge : 30*60*1000})
            res.cookie('gender', getGender(username))

            res.status(200).send({
                success: true
            });
        })
        // Else return status 400
        .catch(err => {
            console.error('autenticate catch', err)
            res.status(400).send(err.message)
        })
}

// Function that create a user in db
export function signup(req, res) {
    // Get username and password from req.body
    const { username, password } = req.body;
    // Verify !(user && password) 
    if(!(username && password)) {
        return res.status(400).send("Username or password cannot be empty")
    }
    // Create User un db
    User.create({ username, password })
        .then(user => {
            res.status(200).send(user)
        })
        .catch(err => {
            res.status(400).send("User cannot be created")
        })
}




 


