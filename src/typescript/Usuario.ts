export default class Usuario{
    public nome:string
    public sobrenome:string
    public idade:number
    public pais:string
    public constructor (nome:string, sobrenome:string, idade:number, pais:string){
        this.nome = nome
        this.sobrenome = sobrenome
        this.idade = idade
        this.pais = pais
    }
}