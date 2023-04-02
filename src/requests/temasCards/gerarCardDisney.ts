import checkValidImg from "../../helpers/checkValidImg";
import setAtributos from "../../helpers/setAtributos";
import setTrunfo from "../../helpers/setTrunfo";
import { CardStatusType, CardType } from "../../types/types";

async function gerarCardDisney(idsCardsRegistrados : Array<Number>, tipoCard : string) {
    let cardGerado : CardType | undefined = undefined;
    while(!cardGerado) {
        const idAleatorio : number = Math.trunc(Math.random() * 7438);
        await fetch(`https://api.disneyapi.dev/characters/${idAleatorio}`)
            .then((res) => res.json())
            .then((data) => {
/*                 const check = checkValidImg(`https://api.disneyapi.dev/characters/${idAleatorio}`);
                console.log(data) */

                const trunfoStatus : boolean = setTrunfo();
                const statusGerados : CardStatusType = setAtributos(trunfoStatus); 
                cardGerado = {
                    id: crypto.randomUUID(),
                    escondido: tipoCard === "inimigo" ? true : false,
                    morto: false,
                    trunfo: trunfoStatus,
                    universo: "Disney",
                    nome: data.name,
                    imagem: data.imageUrl,
                    forca: statusGerados.forca,
                    destreza: statusGerados.destreza,
                    inteligencia: statusGerados.inteligencia
                }
            })
            .catch((error) => console.log(error))
    };
    return cardGerado;
};
export default gerarCardDisney;