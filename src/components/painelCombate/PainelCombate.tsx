import IMGPainel from "../../resources/images/painel-direito.png";
import IMGBotaoMenu from "../../resources/images/botao-menu.png";
import IMGBotaoInfo from "../../resources/images/botao-info.png";

function PainelCombate() {

    return (
        <div className="h-[42vh] w-[13%] bg-100% fixed top-[30vh] left-0 flex flex-col items-center justify-center pr-5" style={{backgroundImage:`url(${IMGPainel})`}}>
            <button className="z-10 bg-100% w-[72%] h-[34%] brightness-[0.85] hover:brightness-105 mb-2" style={{backgroundImage:`url(${IMGBotaoMenu})`}} />
            <button className="z-10 bg-100% w-[72%] h-[34%] brightness-[0.85] hover:brightness-105" style={{backgroundImage:`url(${IMGBotaoInfo})`}} />
        </div>
    )
}
export default PainelCombate;