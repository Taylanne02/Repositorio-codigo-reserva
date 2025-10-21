import dados from '../../assets/dados.json'
import Card from './Card';
import { useFilters } from '../../contexts/filters/FilterContext';

import '../../Styles/CardList.css'

function CardList() {


    const { filtroNome, filtroFunciona24h, filtroPrecoSocial, filtroServicosEssenciais, filtroConvenios } = useFilters();

    
    const instituicoesFiltradas = dados.filter((instituicao) => {
        
        let ehCompativel = true;

            if (filtroNome && !instituicao.nome.toLocaleLowerCase().includes(filtroNome.toLocaleLowerCase()) || filtroNome && !instituicao.sigla.toLocaleLowerCase().includes(filtroNome.toLocaleLowerCase())){
                ehCompativel = false;
            }

            if (filtroFunciona24h && !instituicao.horarios.funciona24h){
                ehCompativel = false;
            }

            if (filtroPrecoSocial && !instituicao.precoSocial){
                ehCompativel = false;
            }

            if (filtroServicosEssenciais){

                if (filtroServicosEssenciais.atendimentoEmergencia && !instituicao.servicosEssenciais.atendimentoEmergencia){
                    ehCompativel = false;
                }

                if (filtroServicosEssenciais.laboratorio && !instituicao.servicosEssenciais.laboratorio){
                    ehCompativel = false;
                }

                if (filtroServicosEssenciais.leitos && !instituicao.servicosEssenciais.leitos){
                    ehCompativel = false;
                }

                if (filtroServicosEssenciais.raioX && !instituicao.servicosEssenciais.raioX){
                    ehCompativel = false;
                }

                if (filtroServicosEssenciais.vacinacao && !instituicao.servicosEssenciais.vacinacao){
                    ehCompativel = false;
                }
            }

            if (filtroConvenios.length > 0){

                ehCompativel = false;

                filtroConvenios.forEach(
                    (convenio) => {if (instituicao.convenios.includes(convenio)){ehCompativel = true; return}}
                )

            }

            return ehCompativel;
        }
    )

    return (
        <div>
            <h2>{instituicoesFiltradas.length} Instituições Encontradas</h2>
            <ul>
                {instituicoesFiltradas.map((instituicao) => (
                    <li key={instituicao.id}> <Card instituicao={instituicao} /> </li>
                ))}
            </ul>
        </div>
    );
}

export default CardList;