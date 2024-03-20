
//======== create post
//POST: api/posts

const createPost = async (req,res,next) => {
    res.json ("create post")
}

//======== get all post
//GET: api/posts

const getPosts = async (req,res,next) => {
    res.json ("get all post")
}


//======== get single post
//GET: api/posts/:id

const getPost = async (req,res,next) => {
    res.json ("get post")
}


//======== get posts by category
//GET: api/posts/categories/:category

const getCatPosts = async (req,res,next) => {
    res.json ("get post by category")
}

//======== get posts by author
//GET: api/posts/users/:id

const getUserPosts = async (req,res,next) => {
    res.json ("get user posts")
}

//======== edit
//PATCH: api/posts/:id

const editPost= async (req,res,next) => {
    res.json ("edit post")
}

//======== delete post
//DELETE: api/posts/:id
const deletePost = async (req,res,next) => {
    res.json ("delete post")
}


module.exports = {createPost ,getPost, getPosts , getCatPosts, getUserPosts ,editPost ,deletePost}





