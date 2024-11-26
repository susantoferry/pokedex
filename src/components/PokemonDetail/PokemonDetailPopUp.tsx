import styled from "styled-components"
import { EvolutionData } from "../../models/PokemonEvolution";
import { PokemonDetailModel } from "../../models/PokemonDetailModel";
import { GeneratePokemonInfo } from "./extensions/PokemonInfo";
import { GeneratePokemonImage } from "./extensions/PokemonImage";
import { GeneratePokemonAbilities } from "./extensions/PokemonAbility";
import { GeneratePokemonStats } from "./extensions/PokemonStats";
import { GeneratePokemonBMI } from "./extensions/PokemonBMI";
import { GenerateEvolution } from "./extensions/PokemonEvolution";
import CloseIcon from '@mui/icons-material/Close';
import { useActiveIndex } from "../../context/ActiveIndexProvider";

interface PokemonDetailPopUpProps {
  pokemonId: number | null;
  speciesText: any[];
  evolution: EvolutionData | null;
  pokemonDetail: PokemonDetailModel | null;
  smallScreen: boolean;
}

const PokemonDetailPopUp: React.FC<PokemonDetailPopUpProps> = ({ 
    pokemonId, speciesText, evolution, pokemonDetail
  }) => {
  const { activeIndex, setActiveIndex } = useActiveIndex();

  const pokemonDetailColumn = () => {
    return (
      <>
        <Top>
          <GeneratePokemonImage pokemonId={pokemonId} />

          <GeneratePokemonInfo pokemonData={pokemonDetail} speciesText={speciesText} />

        </Top>
        <Middle>
          <GeneratePokemonBMI pokemonData={pokemonDetail} />
          <GeneratePokemonAbilities pokemonAbilities={pokemonDetail} />
          <GeneratePokemonStats pokemonStats={pokemonDetail} />
        </Middle>
      </>
    )
  }

  const closePopUp = () => {
    setActiveIndex(null);
  }
    
  return (
    <Test className={activeIndex ? "show" : ""}>
      <CloseButton onClick={() => closePopUp()}/>
      <PokemonPopupContainer>
        <PokemonPopupWrapper>
          <Flex>
            {pokemonDetailColumn()}
          </Flex>
          <GenerateEvolution pokemonEvolutionData={evolution} />
        </PokemonPopupWrapper>
      </PokemonPopupContainer>
    </Test>
  )
}

export default PokemonDetailPopUp;


const Test = styled.div`
  position: fixed;
  overflow: visible;
  height: 550px;
  width: 80vw;
  animation: closePopUp 1s ease-in-out forwards;
  visibility: hidden;
  z-index: 10;

  &.show {
    animation: showPopUp 1s ease-in-out forwards;
  }

  @media (max-width: 1000px) {
    visibility: visible;
  }

  @keyframes showPopUp {
    0% {
      transform: translateY(550px);
    }
    70% {
      transform: translateY(-180px);
    }
    90% {
      transform: translateY(-160px);
    }
    100% {
      transform: translateY(-175px);
    }
  }

  @keyframes closePopUp {
    0% {
      transform: translateY(-175px);
    }
    70% {
      transform: translateY(-160px);
    }
    90% {
      transform: translateY(-180px);
    }
    100% {
      transform: translateY(550px);
    }
  }
`

const PokemonPopupContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 170px;
  background: rgb(136 196 255 / 5%);
  backdrop-filter: blur(10px) saturate(150%);
  border: 1px solid #6dffff99;
  box-shadow: 0 0 5px 3px rgba(109, 255, 255, 0.2), 
              0 0 10px 3px rgba(109, 255, 255, 0.2), 
              0 0 5px 3px rgba(109, 255, 255, 0.1);
  max-width: 80vw;
  max-height: 550px;
  border-radius: 20px;
  z-index: 10;
  visibility: hidden;
  overflow-y: auto;
  
  @media (max-width: 1000px) {
    visibility: visible;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const CloseButton = styled(CloseIcon)`
  background-color: #ff5454fa;
  position: absolute;
  z-index: 11;
  color: #fff;
  border-radius: 50%;
  margin: 3px;
  padding: 2px;
  top: -27px;
  right: 7px;
  transform: translateY(168px);
  visibility: hidden;
  cursor: pointer;
  stroke: #fff;
  stroke-width: 1px;

  &:hover {
    background-color: #bb1d1df9;
  }

  @media (max-width: 1000px) {
    visibility: visible;
  }
  
`

const PokemonPopupWrapper = styled.div`
  padding: 10px;
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 650px) {
    flex-direction: row;
    & > div:nth-child(1) {
      width: 40vw;
    }

    & > div:nth-child(2) {
      width: 60vw;
      padding: 0 20px;
      text-align: center;
    }  
  }
  
`

const Middle = styled.div`
  
`