const { Router } = require("express")
const Link = require('./controllers/Controller_links')
const User = require('./controllers/Controller_users')
const routes = new Router()

function testBody(req, res, next){
    if(Object.keys(req.body).length === 0){
        return res.status(422).json({
            error: true,
            code: 422,
            msg: "Falta um ou mais parâmetros"
        })
    }else{
        return next()
    }
}

function testParams(req, res, next){
    if(Object.keys(req.params).length === 0){
        return res.status(422).json({
            error: true,
            code: 422,
            msg: "Falta um ou mais parâmetros"
        })
    }else{
        return next()
    }
}


routes.post('/link_insert', Link.insert)
routes.get('/link_list', Link.index)
routes.put('/link_update', Link.update)
routes.delete('/link_delete/:id', Link.delete)

routes.post('/user_insert', testBody, User.insert)
routes.post('/user_login', testBody, User.login)
routes.get('/user_list', User.index)
routes.put('/user_update', testBody, User.update)
routes.put('/approve_user', testBody, User.approveUser)
routes.delete('/user_delete/:id', testParams, User.delete)


module.exports = routes