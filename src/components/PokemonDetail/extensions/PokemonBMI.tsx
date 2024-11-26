import styled from "styled-components";
import { PokemonDetailModel } from "../../../models/PokemonDetailModel";
import Skeleton from "../../Skeleton/Skeleton";

interface PokemonBMIProps {
  pokemonData: PokemonDetailModel | null
}

export const GeneratePokemonBMI: React.FC<PokemonBMIProps> = ({pokemonData}) => {
  return (
    <PokemonBMIWrapper>
      <FlexCol>
        { pokemonData ? 
          <PokedexTitle>Height</PokedexTitle>
          : <Skeleton size={"title"} iterate={1}/>
        }  
        
        { pokemonData ? 
          <PokemonContent>
          { 
            `${pokemonData.height / 10}m`
          }
        </PokemonContent>
          : <Skeleton size={"sm-box"} iterate={1}/>
        }
            
      
      </FlexCol>
      <FlexCol>
        { pokemonData ? 
          <PokedexTitle>Weight</PokedexTitle>
          : <Skeleton size={"title"} iterate={1}/>
        }  
        { pokemonData ? 
          <PokemonContent>
            { 
              `${pokemonData.weight / 10}kg`
            }
          </PokemonContent>
          : <Skeleton size={"sm-box"} iterate={1}/>
        }
      </FlexCol>
    </PokemonBMIWrapper>
  )
}

const PokemonBMIWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  width: 100%;
`

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
  gap: 10px;
`

const FlexCol = styled(FlexRow)`
  flex-direction: column;
  padding: 5px 0;
  align-items: center;
  justify-content: center;
  gap: 10px;

  h4 {
    margin-bottom: 0;
  }
`

const PokedexTitle = styled.div`
  font-weight: bold;
  color: #fff;
`

const PokemonContent = styled.div`
  padding: 5px;
  border-radius: 20px;
  font-weight: 500;
  width: 75%;
  background-color: #112d3e57;
  backdrop-filter: blur(10px) saturate(150%);
  box-shadow: rgb(0 183 255 / 44%) 0px 2px 10px;
  color: #fff;
  border: 1px solid rgb(180 180 180 / 30%);
  margin-bottom: 10px;
`