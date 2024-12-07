const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                messages: 'The authemtication',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                messages: 'The authemtication',
                status: 'ERROR'
            })
        }
    })
}
const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userID=req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                messages: 'The authemtication',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin || user?.id===userID) {
            next()
        } else {
            return res.status(404).json({
                messages: 'The authemtication',
                status: 'ERROR'
            })
        }
    })
}

module.exports = { authMiddleWare, authUserMiddleWare }