import { FaStar, FaLocationDot, FaPhone, FaXRay   } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { BiPlusMedical } from "react-icons/bi";
import { ImLab } from "react-icons/im";
import { TbVaccine } from "react-icons/tb";
import { type Instituicao } from "../types/InsituicaoInterface";
import '../../Styles/Card.css'
import { useCardExpandido } from "../../contexts/main/CardExpandidoContext";
import { useInstituicaoAtual } from "../../contexts/main/InstituicaoAtualContext";

interface CardProps{
    instituicao : Instituicao;
}

function Card( {instituicao} : CardProps){

    const { setShowCardExpandido } = useCardExpandido();
    const { setInstituicaoAtual } = useInstituicaoAtual();

    const calcularNota = () =>{

        if (instituicao.avaliacoes.length < 1){
            return( <p>Sem Avaliações!</p> );
        } else{
            let soma: number = 0;
    
            instituicao.avaliacoes.forEach(
                avaliacao => {soma += avaliacao.nota}
            )
    
            return( <p> {(Math.floor( (soma/ instituicao.avaliacoes.length) * 10) / 10)} <span><FaStar/></span> </p> );
        }

    }

    return(

        <div className="card" onClick={() => {setShowCardExpandido(true); setInstituicaoAtual(instituicao)}}>
            <div className="card-header">
                <h1>{instituicao.nome} ({instituicao.sigla})</h1>
                {calcularNota()}
            </div>
            <div className="card-main">
                <h2>
                    <span><FaLocationDot /></span>
                    {instituicao.endereco.logradouro}
                </h2>

                {instituicao.horarios.funciona24h? <h4>24H</h4>
                    :
                <select>{instituicao.horarios.horarios.map( (horario) => (<option>{`${horario.dia} - ${horario.abertura}:${horario.fechamento}`}</option>) )}</select>}

                <h2>
                    <span><FaPhone /></span>
                    {instituicao.contato.telefone}
                </h2>

                <div>
                    {instituicao.servicosEssenciais.leitos && <FaBed title="Leitos"/>}
                    {instituicao.servicosEssenciais.atendimentoEmergencia && <BiPlusMedical title="Emergência"/>}
                    {instituicao.servicosEssenciais.laboratorio && <ImLab title="Labotarório"/>}
                    {instituicao.servicosEssenciais.raioX && <FaXRay title="Exame por Imagem"/>}
                    {instituicao.servicosEssenciais.vacinacao && <TbVaccine title="Vacinação"/>}

                </div>
            </div>

            <hr />

            <div className="card-footer">
                    <ul>
                        {instituicao.convenios.map( (convenio) => (<li>{convenio}</li>))}
                    </ul>

                    {instituicao.precoSocial && <h4>Preço Social</h4>}
            </div>
        </div>

    )

}

export default Card;