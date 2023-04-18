function createUserSession(req, user, action){
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin,
    req.session.username = user.username,
    req.session.email = user.email,
    req.session.save(action);
}

function getUsername(req){
     return req.session.username;
}

function destroyUserSession(req,res){
    req.session.uid = null;
    req.session.username = null;
}

module.exports = { createUserSession : createUserSession,
destroyUserSession: destroyUserSession,
getUsername: getUsername };