import { FaPhone, FaStar, FaEnvelope, FaGlobe, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { IoMdArrowDropleft, IoMdArrowDropright  } from "react-icons/io";

import '../../Styles/CardExpandido.css'

import { useInstituicaoAtual } from "../../contexts/main/InstituicaoAtualContext";

import { type Instituicao } from "../types/InsituicaoInterface"; 
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";


function CardExpandido(){
    
    const { instituicaoAtual } = useInstituicaoAtual();
    
    
    if (!instituicaoAtual) {
        return null;
    }
    
    const calcularNota = ( instituicaoAtual : Instituicao) =>{
    
            if (instituicaoAtual.avaliacoes.length < 1){
                return( <p>Sem Avaliações!</p> );
            } else{
                let soma: number = 0;
        
                instituicaoAtual.avaliacoes.forEach(
                    avaliacao => {soma += avaliacao.nota}
                )
        
                return( <p> {(Math.floor( (soma/ instituicaoAtual.avaliacoes.length) * 10) / 10)} <span><FaStar/></span> </p> );
            }
    
    }
    const nota = calcularNota(instituicaoAtual);
    const imagens = instituicaoAtual.imagens as string[];
    const [index, setIndex] = useState(0);

    return(
        <div className="card-expandido">
            <div className="card-expandido__carrossel">
                <button 
                    className="carrossel__button carrossel__button--prev" 
                    disabled={index === 0} 
                    onClick={() => {setIndex(index - 1)}}
                >
                    <IoMdArrowDropleft />
                </button>
                
                <img 
                    className="carrossel__imagem" 
                    src={imagens[index]} 
                    alt={`Imagem ${index + 1} de ${imagens.length} da instituição ${instituicaoAtual.nome}`} 
                />
                
                <button 
                    className="carrossel__button carrossel__button--next" 
                    disabled={index === imagens.length - 1} 
                    onClick={() => {setIndex(index + 1)}}
                >
                    <IoMdArrowDropright />
                </button>
            </div>

            <div className="card-expandido__conteudo">
                
                <div className="conteudo__cabecalho">
                    <h1>{instituicaoAtual.nome}</h1>
                    <div className="conteudo__nota">{nota}</div>
                </div>
                
                <div className="conteudo__endereco">
                    <FaMapMarkerAlt className="endereco__icone" />
                    <h2>{instituicaoAtual.endereco.logradouro}</h2>
                </div>
                
                <article className="conteudo__descricao">
                    {instituicaoAtual.descricao}
                </article>

                <aside className="conteudo__contatos">
                    <h3>Contatos</h3>
                    <ul>
                        {instituicaoAtual.contato.telefone && (
                            <li><a href={`tel:${instituicaoAtual.contato.telefone}`}><FaPhone /><span>{instituicaoAtual.contato.telefone}</span></a></li>
                        )}
                        {instituicaoAtual.contato.email && (
                            <li><a href={`mailto:${instituicaoAtual.contato.email}`}><FaEnvelope /><span>{instituicaoAtual.contato.email}</span></a></li>
                        )}
                        {instituicaoAtual.contato.site && (
                            <li><a href={instituicaoAtual.contato.site} target="_blank" rel="noopener noreferrer"><FaGlobe /><span>Site Oficial</span></a></li>
                        )}
                        {instituicaoAtual.contato.instagram && (
                            <li><a href={instituicaoAtual.contato.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /><span>Instagram</span></a></li>
                        )}
                        {instituicaoAtual.contato.facebook && (
                            <li><a href={instituicaoAtual.contato.facebook} target="_blank" rel="noopener noreferrer"><FaFacebookF /><span>Facebook</span></a></li>
                        )}
                    </ul>
                </aside>

                <hr className="conteudo__divisor" />

                {instituicaoAtual.servicosEssenciais && Object.keys(instituicaoAtual.servicosEssenciais).length > 0 && (
                    <div className="conteudo__secao">
                        <h2>Serviços Essenciais:</h2>
                        <ul className="secao__lista">
                            {Object.entries(instituicaoAtual.servicosEssenciais).map(([servico, disponivel]) => disponivel && (
                                <li key={servico} className="secao__item--tag secao__item--disponivel">{servico}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <hr className="conteudo__divisor" />

                
                {instituicaoAtual.servicosExtras && instituicaoAtual.servicosExtras.length > 0 && (
                    <div className="conteudo__secao">
                        <h2>Serviços Adicionais:</h2>
                        <ul className="secao__lista">
                            {instituicaoAtual.servicosExtras.map((servico, i) => (
                                <li key={i} className="secao__item--tag">{servico}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <hr className="conteudo__divisor" />

                {instituicaoAtual.convenios && instituicaoAtual.convenios.length > 0 && (
                    <div className="conteudo__secao">
                        <h2>Convênios Aceitos:</h2>
                        <ul className="secao__lista">
                            {instituicaoAtual.convenios.map((convenio, i) => (
                                <li key={i} className="secao__item--tag">{convenio}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <hr className="conteudo__divisor" />

                {instituicaoAtual.avaliacoes && instituicaoAtual.avaliacoes.length > 0 && (
                    <div className="conteudo__secao">
                        <h2>Comentários:</h2>
                        <ul className="secao__lista secao__lista--comentarios">
                        </ul>
                    </div>
                )}
            </div>
        </div>

    )

}

export default CardExpandido;