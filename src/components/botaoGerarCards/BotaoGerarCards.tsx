import IMGtituloMenu from "../../resources/images/titulo-fundo-maior.png";

function BotaoGerarCards() {
     
    return (
        <div className="w-full h-full flex items-center justify-center">
            <button className="min-w-[35vw] py-[1.8vw] bg-100% flex justify-center " style={{ backgroundImage : `url(${IMGtituloMenu})`}}>
                <h3 className="font-light text-[calc(2vw+22px)] text-[#FFA64D] px-[20px]">Carregando...</h3>
            </button>
        </div>
    )
}
export default BotaoGerarCards;