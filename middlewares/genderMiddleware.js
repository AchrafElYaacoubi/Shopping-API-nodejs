


export const genderMiddleware = (req, res, next) => {
    
    
    const gender = req.cookies['gender'] || 'male'
    
    req.session = Object.assign({}, req.session, { gender })

    next()
}


export default genderMiddleware