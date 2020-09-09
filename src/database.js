const {readFile, writeFile} = require('fs'); // File system
const {promisify} = require("util") // Chega de sofrer com callback, bó trabalhar com promise


const readFileAsync = promisify(readFile); // Agora é uma promise :)
const writeFileAsync = promisify(writeFile)

class Database {
  constructor(){
    this.FILE_NAME = 'heroes.json'
  }

  async getDataFile(){
    const file = await readFileAsync(this.FILE_NAME, 'utf-8');
    return JSON.parse(file.toString())
  }

  async writeFile(data){
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data)) // Precisa ser um texto
    return true
  }

  async list(id){
    const data = await this.getDataFile()
    const filterData = data.filter((item) => (
      id ? item.id === id : true
    )) // Se não passar id nenhum, retorna a lista completa
    return filterData;
  }

  async register(hero){
    const data = await this.getDataFile();
    const id = hero.id <= 3 ? hero.id: Date.now(); // Fingindo que o Date.now() é um id
    
    const concatDataId = {
      id,
      ...hero
    }

    const finalData = [...data, concatDataId]
    const result = await this.writeFile(finalData)
    return result
  }

  async remove(id){
    if(!id){
      return await this.writeFile([]) // Removendo tudo do array
    }
    
    const data =  await this.getDataFile()
    const index = data.findIndex((item)=>item.id === parseInt(id))
    
    if(index === -1){
      throw new Error('O usuário não existe')
    }
    data.splice(index,1) // Removendo apenas 1 item, a partir da posição index    
  
    return await this.writeFile(data) 
  }

  async update(id, modifications){
    const data = await this.getDataFile()

    const index = data.findIndex(item => item.id === parseInt(id));

    if (index === -1){
      throw new Error('O herói informado não existe')
    }

    const actual = data[index];
    const updateObj = {
      ...actual, ...modifications
    }
    data.splice(index,1)

    return await this.writeFile([
      ...data,
      updateObj
    ]) 

  }

}

module.exports = new Database();