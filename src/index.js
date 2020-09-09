// yarn add commander -> Biblioteca para utilizar ferramentas de linha de comando
const Commander = require('commander');
const database = require('./database');
const Hero = require('./models/hero');


async function main(params){
  Commander
  .version('version 1')
  .option('-n, --nome [value]', "Nome do herói")
  .option('-p, --poder [value]', "Poder do herói")
  .option('-i, --id [value]', "Id do herói")
  
  .option('-c, --cadastrar', "Cadastrar herói")
  .option('-l, --listar', "Listar um herói")
  .option('-r, --remove', "Remover um herói pelo id")
  .option('-u, --update [value]', "Atualizar um herói pelo id")
  .parse(process.argv)

  const heroi = new Hero(Commander)
  try {
    if(Commander.cadastrar){
      delete heroi.id;
      const result = await database.register(heroi)
      if (!result){
        console.error('O herói não foi cadastrado')
        return;
      }
      console.log('Herói cadastrado com sucesso')
    }

    if(Commander.listar){
      const result = await database.list();
      console.log(result)
    }

    if(Commander.remove){
      const result = await database.remove(heroi.id)
      if (!result){
        console.error('O herói não existe')
        return;
      }
      console.log('Herói removido')
    }

    if(Commander.update){
      
      const idUpdate = parseInt(Commander.update);
  
      // Removendo chaves desnecessárias, tipo undefined, null
      const data = JSON.stringify(heroi);
      const heroUpdate = JSON.parse(data); 
      const result = await database.update(idUpdate, heroUpdate)
      if (!result){
        console.error('O herói não existe')
        return;
      }
      console.log('Herói atualizado')
    }
    
  } catch (error) {
    console.log('Deu ruim', error)
  }
}
main()