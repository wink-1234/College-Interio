const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.session.authtoken;
    if(!token) return res.redirect('/user/login');
    
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        if(req.user.admin !== true){
            res.status(401).send("Unauthorized");
            return;
        }
        next();
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
}