const jwt = require('jsonwebtoken');

function authenticate(req,res,next){

    let {token}=req.headers;

    jwt.verify(token, 'shhhhh', async function (err, decoded) {
        if (decoded) {
            next();
        }
        else {
            res.send({ "msg": "Login Again" })
        }
    });
}

module.exports={authenticate}