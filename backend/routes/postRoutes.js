const {Router} = require('express')


const router = Router()

router.get('/',(req, res, next)=>{
    res.json("this is user posts")
})

module.exports =router