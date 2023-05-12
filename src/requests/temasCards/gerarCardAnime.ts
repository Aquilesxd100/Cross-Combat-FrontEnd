import comprimirNome from "../../helpers/comprimirNome";
import setAtributos from "../../helpers/setAtributos";
import setTrunfo from "../../helpers/setTrunfo";
import { CardStatusType, CardType } from "../../types/types";

async function gerarCardAnime(nomesCardsRegistrados : Array<string>, tipoCard : string) {
    let cardGerado : CardType | undefined = undefined;
    while(!cardGerado) {
        const idAleatorio : number = Math.trunc(Math.random() * 99153);
        await fetch(`https://kitsu.io/api/edge/characters/${idAleatorio}`)
            .then((res) => res.json())
            .then((data) => data.data.attributes)
            .then(async function(data) {
                data.canonicalName = data.canonicalName.length > 18 ? comprimirNome(data.canonicalName) : data.canonicalName;
                return data;
            })
            .then((data) => {
                if((data.image !== null && data.image.original !== undefined && data.image.original !== null) && !nomesCardsRegistrados.some(nome => nome === data.canonicalName)) {
                    const trunfoStatus : boolean = setTrunfo();
                    const statusGerados : CardStatusType = setAtributos(trunfoStatus); 
                    cardGerado = {
                        id: crypto.randomUUID(),
                        idAPI: idAleatorio,
                        escondido: tipoCard === "inimigo" ? true : false,
                        morto: false,
                        trunfo: trunfoStatus,
                        universo: "Anime",
                        nome: data.canonicalName,
                        imagem: data.image.original,
                        forca: statusGerados.forca,
                        destreza: statusGerados.destreza,
                        inteligencia: statusGerados.inteligencia
                    }
                    console.log(data);
                }
            })
            .catch((error) => console.log(error))
    };
    return cardGerado;
};
export default gerarCardAnime;