import FilterList from "../components/filters/FilterList";
import CardExpandido from "../components/cardExpandido/CardExpandido";
import CardList from "../components/card/CardList";
import { useCardExpandido } from "../contexts/main/CardExpandidoContext";

function HomePage(){

    const { showCardExpandido } = useCardExpandido();

    return(
        <main>
            <FilterList />
                {showCardExpandido && <CardExpandido />}
            <CardList />
        </main>
    )

}

export default HomePage;