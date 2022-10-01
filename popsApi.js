require('dotenv').config()
const app = require('./app');
const log   = require('./utils/log');
const database = require('./dataBase')

async function testBD(){
	let isConected = false

    await database.authenticate()
	.then((res)=>{
		isConected = true
    	log('Conexão com o Banco de dados estabelecida com sucesso!', 'info');
    })
    .catch((erro)=>{
    	console.error('Erro ao conectar no Banco de dados:', error);
    })

	if(isConected){
		const Users = require('./models/users')
		const Links = require('./models/links')

		await database.sync()
		.then((res)=>{
			log('Tabelas sincronizadas!', 'info');
		})
		.catch((erro)=>{
			console.error('Erro ao sincronizar tabelas!', error);
		})

	}
}

app.listen(process.env.API_PORT, () => {
    log(`API - Pops Micks - Porta: ${process.env.API_PORT}`, 'alerta');
    testBD();
});