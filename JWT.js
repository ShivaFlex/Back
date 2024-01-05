const{ sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign({

        username:user.username,
        id:user._id,
        admin:user.admin
    
    },
    //ne pas mettre "SECRET" pour le vrai projet mdr 
    "CoursYogaDelphine"
    
    );
    return accessToken;
};

const validateToken = (req, res, next) => {

    const accessToken = req.cookies["access-token"];
    console.log(accessToken);
    if(!accessToken)

    return res.status(400).json({ error: "User pas reconnu"});
    try{
        const validToken = verify(accessToken, "CoursYogaDelphine");
        if(validToken){
            req.authenticated = true;
            return next();
        }
    }
    catch(err) {
        return res.status(400).json({error: error});
    }

};
module.exports = {createTokens, validateToken};
//on a i "cookie-parser"