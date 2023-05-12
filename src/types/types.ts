export interface CardType {
    id: string,
    idAPI: number,
    escondido: boolean,
    morto: boolean,
    trunfo: boolean,
    universo: string,
    nome: string,
    imagem: string,
    forca: number,
    destreza: number,
    inteligencia: number
}
export interface CardStatusType {
    forca: number,
    destreza: number,
    inteligencia: number
}
export interface BotaoGerarCardsPropsType {
    texto: string,
}
export interface SetCardsStateType {
    timeInimigo: Array<CardType>,
    timeJogador: Array<CardType>,
};
export interface CardPropsType {
    tipo : string,
    cardInfos : CardType
};
export interface PropInfoCardCombateType {
    idCard: string | undefined,
    valorAtributo: number | undefined
};
export interface InfoCardCombateType {
    idCard: string | undefined,
    atributo: "forca" | "destreza" | "inteligencia" | undefined,
    valorAtributo: number | undefined
};
export interface CombateInfosType {
    infosAtacante: InfoCardCombateType;
}
export interface PlayerCardType {
    playerCardType : 'disney' | 'herois' | 'animes' | 'aleatorio'
};