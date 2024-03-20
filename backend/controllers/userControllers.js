
//===========Register User
//POST :api/users/register
//UNPORTECTED


const registerUser = async(req, res, next) => {
    res.json("Register User");
}








//===========Login a registerd user
//POST :api/users/login
//UNPORTECTED

const loginUser = async(req, res, next) => {
    res.json("login User");
}








//===========user profile
//POST :api/users/:id
//PORTECTED

const getUser = async(req, res, next) => {
    res.json("User Profile");
}











//===========change user avatar
//POST :api/users/change-avatar
//PORTECTED

const changeAvatar = async(req, res, next) => {
    res.json("change user avatar");
}










//===========edit user details
//POST :api/users/edit-user
//PORTECTED

const editUser = async(req, res, next) => {
    res.json("edit user details");
}









//===========GET AUTHoRS
//POST :api/users/authors
//UNPORTECTED

const getAuthors =async (req, res, next) => {
    res.json("Get all users/authors");
}




module.exports={registerUser, loginUser, getUser ,changeAvatar,editUser, getAuthors}













