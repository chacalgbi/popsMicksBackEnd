const API = require('../utils/API')
const log = require('../utils/log')
const UserModel = require('../models/users')

class User{

    async insert(req, res){
        log('Criar User', 'info')
        let isSucess = false
		let retorno = {}

        await UserModel.create({
            name: req.body.name,
            serialPhone: req.body.serialPhone,
            active: "no",
            obs: req.body.obs,
            typeUser: "temp"
        })
        .then((res)=>{
            isSucess = true
            retorno.msg = "Solicitação de acesso feita com sucesso! Aguarde a aprovação."
            retorno.dados = res
        })
        .catch((err)=>{
            retorno.msg = "ERRO ao solicitar permissão de acesso"
            retorno.dados = err
            console.error(err);
        })

        API(retorno, res, 200, isSucess);
    }

    async login(req, res){
        log(`Logando usuário`, 'info')
        let isSucess = false
		let retorno = {}

        await UserModel.findAll({ where: { serialPhone: req.body.serialPhone } })
        .then((res)=>{
            if(res.length === 0){
                isSucess = false
                retorno.msg = "Permissão não solicitada."
            }else{
                if(res[0].active === 'no'){
                    isSucess = false
                    retorno.msg = `${res[0].name}, sua aprovação está pendente.`
                }else{
                    isSucess = true
                    retorno.msg = "Acesso liberado!"
                }
            }
            retorno.dados = res
        })
        .catch((err)=>{
            retorno.msg = "ERRO ao fazer o login, verifique o serialPhone e tente novamente"
            retorno.dados = err
            console.error(err);
        })

        API(retorno, res, 200, isSucess);
    }

    async index(req, res){
        log('Listar Users', 'info')
        let isSucess = false
		let retorno = {}

        await UserModel.findAll()
        .then((res)=>{
            isSucess = true
            retorno.msg = "Sucesso ao listar os Users"
            retorno.dados = res
        })
        .catch((err)=>{
            retorno.msg = "ERRO ao listar os Users"
            retorno.dados = err
            console.error(err);
        })

        API(retorno, res, 200, isSucess);
    }

    async update(req, res){
        log('Editar User', 'info')
        let isSucess = false
		let retorno = {}
        let UserChange

        await UserModel.findByPk(req.body.id)
        .then((res)=>{
            isSucess = true
            UserChange = res
        })
        .catch((err)=>{
            retorno.msg = "ERRO ao buscar ID do User"
            retorno.dados = err
            console.error(err);
        })

        if(isSucess){
            UserChange.name = req.body.name
            UserChange.serialPhone = req.body.serialPhone
            UserChange.obs = req.body.obs
            UserChange.typeUser = req.body.typeUser

            await UserChange.save()
            .then((res)=>{
                isSucess = true
                retorno.dados = res
                retorno.msg = "Sucesso ao atualizar o User"
            })
            .catch((err)=>{
                isSucess = false
                retorno.msg = "ERRO ao atualizar o User"
                retorno.dados = err
                console.error(err);
            })
        }

        API(retorno, res, 200, isSucess);
    }

    async delete(req, res){
        log('Deletar User', 'info')
        let isSucess = false
		let retorno = {}

        await UserModel.destroy({ where: {id: req.params.id} })
        .then((res)=>{
            retorno.msg = "Sucesso ao deletar o User"
            retorno.dados = res
            isSucess = true
        })
        .catch((err)=>{
            retorno.msg = "ERRO ao deletar o User"
            retorno.dados = err
            console.error(err);
        })

        API(retorno, res, 200, isSucess);
    }

    async approveUser(req, res){
        log('Aprovar Usuário', 'info')
        let isSucess = false
		let retorno = {}
        let UserChange

        await UserModel.findByPk(req.body.id)
        .then((res)=>{
            isSucess = true
            UserChange = res
        })
        .catch((err)=>{
            retorno.msg = "ERRO ao buscar ID do User"
            retorno.dados = err
            console.error(err);
        })

        if(isSucess){
            UserChange.active = req.body.active

            await UserChange.save()
            .then((res)=>{
                isSucess = true
                retorno.dados = res
                retorno.msg = "Sucesso ao aprovar o User"
            })
            .catch((err)=>{
                isSucess = false
                retorno.msg = "ERRO ao aprovar o User"
                retorno.dados = err
                console.error(err);
            })
        }

        API(retorno, res, 200, isSucess);
    }

}
module.exports = new User();