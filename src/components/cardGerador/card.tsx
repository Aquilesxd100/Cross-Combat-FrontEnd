import fundoCard from "../../resources/images/card_fundo.png";

function Card(character: any) {
    return(
        <div className="relative w-[25%] h-[98%] m-[1%]">
            <div className="absolute w-full h-full z-[1] text-center">
                <h1 className="absolute w-full top-[6%] text-[2.1vw] text-[#2D2431]">{character.nome}</h1>
                <h3 className="absolute top-[56%] w-full text-[2.15vw] text-[#DBB866] drop-shadow">Atributos</h3>
                <div className="relative text-[#DBB866] drop-shadow text-[2.3vw]">
                    <h5 className="relative">Força: <span>{character.forca}</span></h5>
                    <h5 className="relative">Destreza: <span>{character.destreza}</span></h5>
                    <h5 className="relative">Inteligência: <span>{character.inteligencia}</span></h5>
                </div>
            </div>
            {/* <CharacterImageStyle src={character.image} /> */}
            <img className="absolute w-full h-full" src={fundoCard} />
        </div>
    );
};
export default Card;