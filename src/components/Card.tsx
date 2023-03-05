import { CardsStyle, CharacterCardStyle, ContainerStyle, CharacterImageStyle, CardBackground} from "../pages/homeStyle";
import { characterProfile } from "../types/types";
import fundoCard from "../images/card_fundo.png";


function Card(character: characterProfile) {
    return(
        <CardsStyle>
            <CharacterCardStyle>
                <h1>{character.name}</h1>
                <h3>Atributos</h3>
                <div>
                    <h5>Força: <span>{character.strength}</span></h5>
                    <h5>Destreza: <span>{character.dexterity}</span></h5>
                    <h5>Inteligência: <span>{character.inteligence}</span></h5>
                    <h5>Vitalidade: <span>{character.vitality}</span></h5> 
                </div>
            </CharacterCardStyle>
            <CharacterImageStyle src={character.image} />
            <CardBackground src={fundoCard} />
        </CardsStyle>
    );
};
export default Card;