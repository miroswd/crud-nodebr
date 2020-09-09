const {deepEqual, ok} = require('assert');
const database = require('./database');



// No package, passar a flag -w === para ficar assistindo o mocha

const defaultHero = {
  id:1,
  name:'Flash',
  power:'Speed'
}

const defaultHeroUpdate = {
  id:2,
  name:'Lanterna Verde',
  power:'Energia do anel'
}

describe('Switch de manipulação de heróis', () => {
  before(async () => {
    await database.register(defaultHero)
    await database.register(defaultHeroUpdate)
  }) // Antes de tudo, cadastre um herói
  it('deve pesquisar um herói, usando arquivos', async () => {
    const expected = defaultHero;
    const [result] = await database.list(expected.id);
        // Destructor [algumArray], pega a primeira posição
    // const position = result[0] 

    deepEqual(result,expected)
  })

  it('deve cadastrar um herói, usando arquivos', async () =>{
    const expected = defaultHero
    const result = await database.register(expected);

    // Pegando a primeira posição
    // para ter ctz q foi executado da forma certa
    const [actual] = await database.list(defaultHero.id); 

    deepEqual(actual,expected)
  })
  it('deve remover o herói, pelo id', async () => {
    const expected = true;
    const result = await database.remove(defaultHero.id);
    
    console.log('result',result)
    deepEqual(result,expected);
  })
  it.only('deve atualizar o herói, pelo id', async () => {
    const expected = {
      ...defaultHeroUpdate,
    }

    const newData = {
      name:'Batman',
      power:'Rich'
    }

    await database.update(defaultHeroUpdate.id, newData)
console.log(`expected`, expected)
    const [result] = await database.list(defaultHeroUpdate.id) 

    deepEqual(result,expected)
  })
})