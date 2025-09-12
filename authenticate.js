const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.cookies.jwt;  // Get the JWT from the cookies

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // console.log("Token Got", token);

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded.user_id;  // Attach user info to the request object
        next();  // Continue to the next middleware or route handler
    });
}

module.exports = authenticate;
