import { CardStatusType } from "../types/types";
function setAtributos(trunfoStatus: boolean) : CardStatusType {
    let pontosDisponiveis : number = trunfoStatus ? 27 : 17;
    const atributosCard : Array<number> = [1, 1, 1];
    while(pontosDisponiveis !== 0) {
        const atributoAleatorio : number = Math.floor(Math.random() * 3);
        atributosCard[atributoAleatorio] += 1;
        pontosDisponiveis -= 1;
    }
    return {
        forca: atributosCard[0],
        destreza: atributosCard[1],
        inteligencia: atributosCard[2]
    };
}
export default setAtributos;