const User = require('../models/users');

exports.getUserById = async (req, res, next, id) => {
   try{
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({message: 'User not found'});
   }
   req.user = user;
   next();
} catch (err) {
    return res.status(400).json({error: err?.message || 'No User Found'});
}
};
 exports.getUser= (req, res) => {
    req.user.has_password = undefined;
    return res.json(req.user);
 }