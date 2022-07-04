const API = require('../utils/API')
const log = require('../utils/log')
const LinkModel = require('../models/links')

class User{

    async insert(req, res){
        log('Criar Link', 'info')
        let isSucess = false
		let retorno = {}

        await LinkModel.create({
            text: req.body.text,
            linkAdress: req.body.linkAdress
        })
        .then((res)=>{
            isSucess = true
            retorno.msg = "Link cadastrado com sucesso!"
            retorno.dados = res
        })
        .catch((err)=>{
            retorno.msg = "ERRO ao cadastrar link"
            retorno.dados = err
            console.error(err);
        })

        API(retorno, res, 200, isSucess);
    }

    async index(req, res){
        log('Listar Links', 'info')
        let isSucess = false
		let retorno = {}

        await LinkModel.findAll()
        .then((res)=>{
            isSucess = true
            retorno.msg = "Sucesso ao listar os Links"
            retorno.dados = res
        })
        .catch((err)=>{
            retorno.msg = "ERRO ao listar os Links"
            retorno.dados = err
            console.error(err);
        })

        API(retorno, res, 200, isSucess);
    }

    async update(req, res){
        log('Editar Link', 'info')
        let isSucess = false
		let retorno = {}
        let UserChange

        await LinkModel.findByPk(req.body.id)
        .then((res)=>{
            isSucess = true
            UserChange = res
        })
        .catch((err)=>{
            retorno.msg = "ERRO ao buscar ID do Link"
            retorno.dados = err
            console.error(err);
        })

        if(isSucess){
            UserChange.text = req.body.text
            UserChange.linkAdress = req.body.linkAdress

            await UserChange.save()
            .then((res)=>{
                isSucess = true
                retorno.dados = res
                retorno.msg = "Sucesso ao atualizar o Link"
            })
            .catch((err)=>{
                isSucess = false
                retorno.msg = "ERRO ao atualizar o Link"
                retorno.dados = err
                console.error(err);
            })
        }

        API(retorno, res, 200, isSucess);
    }

    async delete(req, res){
        log('Deletar Link', 'info')
        let isSucess = false
		let retorno = {}

        await LinkModel.destroy({ where: {id: req.params.id} })
        .then((res)=>{
            retorno.msg = "Sucesso ao deletar o Link"
            retorno.dados = res
            isSucess = true
        })
        .catch((err)=>{
            retorno.msg = "ERRO ao deletar o Link"
            retorno.dados = err
            console.error(err);
        })

        API(retorno, res, 200, isSucess);
    }

}
module.exports = new User();