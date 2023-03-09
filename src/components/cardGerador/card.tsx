import fundoCard from "../../resources/images/card_fundo.png";

function Card(character: any) {
    return(
        <div className="relative w-[24%] h-[98%] m-1.5">
            <div className="absolute w-full h-full z-[1] text-center">
                <h1 className="font-[hobostd] font-bold absolute w-full top-[5%] text-[1.6vw] text-[#2D2431]">{character.nome}</h1>
                <h3 className="sombra-padrao reset-filter font-[hobostd] absolute top-[55.9%] w-full text-[1.4vw] text-[#DBB866]">ATRIBUTOS</h3>
                <div className="relative top-[64%] font-[hobostd] text-[#DBB866] drop-shadow text-[1.5vw] flex flex-col items-center font-normal">
                    <h5 className="sombra-padrao w-[75%] brightness-[0.8] hover:brightness-110 cursor-pointer">FORÇA: <span>{character.forca}</span></h5>
                    <h5 className="sombra-padrao relative w-[75%] -top-[3px] brightness-[0.8] hover:brightness-110 cursor-pointer">DESTREZA: <span>{character.destreza}</span></h5>
                    <h5 className="sombra-padrao relative w-[75%] -top-[6px] brightness-[0.8] hover:brightness-110 cursor-pointer">INTELIGÊNCIA: <span>{character.inteligencia}</span></h5>
                </div>
                <h6 className="bottom-[0.8%] text-center w-full sombra-padrao absolute italic font-[hobostd] text-[1.3vw] text-[#7A657C]">Disney</h6>
            </div>
            {/* <CharacterImageStyle src={character.image} /> */}
            <img className="absolute w-full h-full" src={fundoCard} />
        </div>
    );
};
export default Card;