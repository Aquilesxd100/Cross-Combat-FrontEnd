export interface CardType {
    id: string,
    trunfo: boolean,
    universo: string,
    nome: string,
    imagem: string,
    forca: number,
    destreza: number,
    inteligencia: number
}
export interface BotaoGerarCardsPropsType {
    texto: string,
    funcao: Function,
}
export interface SetCardsStateType {
    timeInimigo: Array<CardType>,
    timeJogador: Array<CardType>
};