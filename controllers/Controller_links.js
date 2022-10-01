const API = require('../utils/API')
const log = require('../utils/log')
const LinkModel = require('../models/links')
const { Op } = require("sequelize")

class Link{

    async insert(req, res){
        log('Criar Link', 'info')
        let isSucess = false
		let retorno = {}

        await LinkModel.create({
            text: req.body.text,
            linkAdress: req.body.linkAdress,
            typeUser: req.body.typeUser
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
        //console.log(req.query.typeUser)
        let isSucess = false
		let retorno = {}
        const types = req.query.typeUser.split(",")
        console.log(types)

        await LinkModel.findAll({ where: { typeUser:{[Op.or]:types}}})
        .then((res)=>{
            isSucess = true
            retorno.msg = "Clique sobre os nomes para abrir o arquivo."
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
        let LinkChange

        await LinkModel.findByPk(req.body.id)
        .then((res)=>{
            isSucess = true
            LinkChange = res
        })
        .catch((err)=>{
            retorno.msg = "ERRO ao buscar ID do Link"
            retorno.dados = err
            console.error(err);
        })

        if(isSucess){
            LinkChange.text = req.body.text
            LinkChange.linkAdress = req.body.linkAdress
            LinkChange.typeUser = req.body.typeUser

            await LinkChange.save()
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
module.exports = new Link();