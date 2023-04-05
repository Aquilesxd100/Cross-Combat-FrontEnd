import comprimirNome from "../../helpers/comprimirNome";
import setAtributos from "../../helpers/setAtributos";
import setTrunfo from "../../helpers/setTrunfo";
import { CardStatusType, CardType } from "../../types/types";

async function gerarCardHeroi(nomesCardsRegistrados : Array<string>, tipoCard : string) {
    let cardsGerados : Array<CardType> = [];
    let qntCardsParaGerar : number = 3 - nomesCardsRegistrados.length;
    while(qntCardsParaGerar !== 0) {
        await fetch(`https://cross-combat-api-nocors.vercel.app/api/request/${qntCardsParaGerar}`)
            .then((res) => res.json())
            .then((data : Array<any>) => {
                data.forEach((cardBruto : any) => {
                    cardBruto.name = cardBruto.name.length > 18
                    ? comprimirNome(cardBruto.name)
                    : cardBruto.name;
                });
                return data;
            })
            .then((data : Array<any>) => {
                data.forEach((cardBruto : any) => {
                    if(!nomesCardsRegistrados.some(nome => nome === cardBruto.name)) {
                        const trunfoStatus : boolean = setTrunfo();
                        const statusGerados : CardStatusType = setAtributos(trunfoStatus); 
                        cardsGerados.push({
                            id: crypto.randomUUID(),
                            escondido: tipoCard === "inimigo" ? true : false,
                            morto: false,
                            trunfo: trunfoStatus,
                            universo: "Heróis",
                            nome: cardBruto.name,
                            imagem: cardBruto.image.url,
                            forca: statusGerados.forca,
                            destreza: statusGerados.destreza,
                            inteligencia: statusGerados.inteligencia
                        });
                        qntCardsParaGerar -= 1;
                    }
                })
            })
            .catch((error) => console.log(error))
    };
    return cardsGerados;
};
export default gerarCardHeroi;