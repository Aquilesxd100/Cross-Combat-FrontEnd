import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/configureStore";
import IMGCristaisDeposito from "../../resources/images/deposito_cristais.png";
import IMGCristal from "../../resources/images/cristal.png";

function Cristais() {
    const { pontosJogador } = useSelector((state : RootState) => state.pontuacao);
    const cristais = 33;
    return (
        <div className="fixed flex justify-center items-center right-[-1.3%] w-[12.5%] h-[calc(24vh+7px)] bg-100% top-[78.5%] z-10" style={{backgroundImage: `url(${IMGCristaisDeposito})`}}>
            <h2 className="relative valor-cristais top-[13%] font-[hobostd] text-[calc(4.8vw+7px)] off-user-selection" style={{filter: 'drop-shadow(0px 3.2px 3.2px rgba(0, 0, 0, 0.7)) drop-shadow(0px -3.2px 3.2px rgba(0, 0, 0, 0.7)) drop-shadow(-3.2px 0px 3.2px rgba(0, 0, 0, 0.7))'}}>{cristais}</h2>
        </div>
    );
};

export default Cristais;