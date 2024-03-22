const Post = require('../models/postModel')
const User = require('../models/userModels')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require("uuid")
const HttpError = require('../models/errorModel')


//======== create post
//POST: api/posts

const createPost = async (req, res, next) => {
    try {
        const { title, category, description } = req.body;
        const { thumbnail } = req.files;

        if (!title || !category || !description || !thumbnail) {
            return next(new HttpError("Please fill in all fields and choose a thumbnail", 422));
        }

        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail size is too big", 422));
        }

        const fileName = thumbnail.name;
        const newFilename = `${uuid()}.${fileName.split('.').pop()}`;
        const uploadPath = path.join(__dirname, '..', 'uploads', newFilename);

        thumbnail.mv(uploadPath, async (err) => {
            if (err) {
                return next(new HttpError(err.message, 500));
            } else {
                try {
                    const newPost = await Post.create({
                        title,
                        category,
                        description,
                        thumbnail: newFilename,
                        creator: req.user.id
                    });

                    if (!newPost) {
                        return next(new HttpError("Post couldn't be created.", 422));
                    }

                    // Atomically increment user's post count by 1
                    await User.findByIdAndUpdate(req.user.id, { $inc: { posts: 1 } });

                    res.status(201).json(newPost);
                } catch (error) {
                    return next(new HttpError(error.message, 500));
                }
            }
        });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};













//======== get all post
//GET: api/posts

const getPosts = async (req,res,next) => {
    try {
        const posts = await Post.find().sort({updateAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
        
    }
}













//======== get single post
//GET: api/posts/:id

const getPost = async (req,res,next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError("post not found",404))
            
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError(error))
        
    }
}









//======== get posts by category
//GET: api/posts/categories/:category

const getCatPosts = async (req,res,next) => {
   try {
    const {category} = req.params;
    const catPosts = await Post.find({category}).sort({createdAt:-1})
    res.status(200).json(catPosts)
    
   } catch (error) {
    return next(new HttpError(error))
   }
}






//======== get posts by author
//GET: api/posts/users/:id

const getUserPosts = async (req,res,next) => {
    try {
        const {id} = req.params;
        const posts = await Post.find({creator:id}).sort({createdAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
        
    }
}







//======== edit
//PATCH: api/posts/:id

const editPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { title, category, description } = req.body;

        // Validate input data
        if (!title || !category || description.length < 12) {
            return next(new HttpError("Please provide valid title, category, and description", 422));
        }

        let updatedPost;

        // If no files are uploaded, update post without changing thumbnail
        if (!req.files) {
            updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true });
        } else {
            // Handle file upload
            const oldPost = await Post.findById(postId);

            // Delete old thumbnail
            fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
                if (err) {
                    return next(new HttpError(err.message, 500));
                }

                const { thumbnail } = req.files;

                // Validate file size
                if (thumbnail.size > 2000000) {
                    return next(new HttpError("Thumbnail size exceeds limit", 422));
                }

                // Generate new filename and move uploaded file
                const fileName = thumbnail.name;
                const newFilename = `${uuid()}.${fileName.split('.').pop()}`;
                thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
                    if (err) {
                        return next(new HttpError(err.message, 500));
                    }

                    // Update post with new thumbnail filename
                    updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: newFilename }, { new: true });
                    res.status(200).json(updatedPost);
                });
            });
        }

    } catch (error) {
        // Handle any other errors
        return next(new HttpError(error.message, 500));
    }
};











//======== delete post
//DELETE: api/posts/:id
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return next(new HttpError("Post unavailable", 400));
        }

        const post = await Post.findById(postId);
        const fileName = post?.thumbnail;

        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if (err) {
                return next(new HttpError(err));
            } else {
                await Post.findByIdAndDelete(postId);
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser?.posts - 1;
                await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
                res.json(`Post ${postId} deleted`);
            }
        });
    } catch (error) {
        return next(new HttpError(error));
    }
};











module.exports = {createPost ,getPost, getPosts , getCatPosts, getUserPosts ,editPost ,deletePost}





