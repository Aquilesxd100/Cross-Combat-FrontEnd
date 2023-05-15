import { CardType } from "../types/types";
import gerarCardAnime from "./temasCards/gerarCardAnime";
import gerarCardDisney from "./temasCards/gerarCardDisney";
import gerarCardsHerois from "./temasCards/gerarCardsHerois";

async function gerarCardsAPI(temaGerado : string, tipoCard : string, cardsAtuais? : Array<CardType>, nomesAtuaisOposicao? : Array<CardType>) {
    const qntCardsAGerar : number = cardsAtuais ? 3 - cardsAtuais.length : 3;
    console.log(temaGerado)
    console.log(tipoCard)
    console.log(cardsAtuais)
    console.log(nomesAtuaisOposicao)
    let cardsGerados : Array<CardType> | [] = !cardsAtuais ? [] : cardsAtuais;
    let nomesCards : Array<string> = !cardsAtuais ? [] : cardsAtuais.map((card) => card.nome);
    if(nomesAtuaisOposicao) {
        nomesCards = nomesCards.concat(nomesAtuaisOposicao.map(card => card.nome));
    };
    while(cardsGerados.length !== 3) {
        switch(temaGerado) {
            case "disney":
                let cardGeradoDisney : CardType | undefined = await gerarCardDisney(nomesCards, tipoCard);
                if (cardGeradoDisney) {
                    cardGeradoDisney = cardGeradoDisney as CardType;
                    cardsGerados.push(cardGeradoDisney);
                    nomesCards.push(cardGeradoDisney.nome);
                } else {
                    return;
                };
            break;
            case "herois":
                const cardsGeradosHerois : Array<CardType> | undefined = await gerarCardsHerois(qntCardsAGerar, tipoCard, nomesCards);
                if (cardsGeradosHerois) {
                    cardsGerados = cardsGerados.concat(cardsGeradosHerois);
                } else {
                    return;
                };
            break;
            case "animes":
                let cardGeradoAnime : CardType | undefined = await gerarCardAnime(nomesCards, tipoCard);
                if (cardGeradoAnime) {
                    cardGeradoAnime = cardGeradoAnime as CardType;
                    cardsGerados.push(cardGeradoAnime);
                    nomesCards.push(cardGeradoAnime.nome);
                } else {
                    return;
                };              
            break;
            case "aleatorio":
                let qntCardsHerois : number = 0;
                const tipoCardAleatorio : any = [
                    function(){ return gerarCardDisney(nomesCards, tipoCard) },
                    function(){ return gerarCardAnime(nomesCards, tipoCard) },
                    (() => { return 1 })
                ];
                for(let c = 1; c <= qntCardsAGerar; c++) {
                    const indexCardAleatorio : number = Math.floor(Math.random() * 3);
                    const cardAleatorio : number | CardType = await tipoCardAleatorio[indexCardAleatorio]();
                    if (!cardAleatorio) {
                        return;
                    } else if (typeof cardAleatorio !== "number") {
                        cardsGerados.push(cardAleatorio);
                        nomesCards.push(cardAleatorio.nome);
                    } else {
                        qntCardsHerois += 1;
                    }
                };
                if(qntCardsHerois !== 0) {
                    const cardsHerois : CardType[] | undefined = await gerarCardsHerois(qntCardsHerois, tipoCard, nomesCards);
                    if(cardsHerois) {
                        cardsGerados = cardsGerados.concat(cardsHerois);
                    } else {
                        return;
                    };
                };
            break;
        };
    };
    return cardsGerados;
};
export default gerarCardsAPI;