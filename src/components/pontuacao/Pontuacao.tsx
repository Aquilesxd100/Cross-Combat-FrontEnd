import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/configureStore";
import IMGPontuacao from "../../resources/images/display-pontos.png";

function Pontuacao() {
    const { pontosJogador } = useSelector((state : RootState) => state.pontuacao);
    return (
        <div className="fixed flex justify-center items-center right-0 w-[12.5%] h-[calc(18vh+7px)] bg-100% top-[40%] z-10" style={{backgroundImage: `url(${IMGPontuacao})`}}>
            <h2 className="relative text-[#60FF2B]  right-[-0.4vw] font-[hobostd] text-[calc(5vw+7px)] font-bold" style={{filter: 'drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.55)) drop-shadow(0px -3px 3px rgba(0, 0, 0, 0.55)) drop-shadow(-3px 0px 3px rgba(0, 0, 0, 0.55))'}}>{pontosJogador}</h2>
        </div>
    );
};

export default Pontuacao;