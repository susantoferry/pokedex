import styled from "styled-components"
import { capitaliseFirstLetter } from "../../../utils/Uppercase"
import { PokemonDetailModel } from "../../../models/PokemonDetailModel"
import Skeleton from "../../Skeleton/Skeleton"

interface AbilitiesProps {
  pokemonAbilities: PokemonDetailModel | null
}

export const GeneratePokemonAbilities: React.FC<AbilitiesProps> = ({ pokemonAbilities }) => {
  return (
    <FlexCol>
      {pokemonAbilities ? (
        <PokedexTitle>Abilities</PokedexTitle>
      ) : <Skeleton size={"title"} iterate={1} />}

      {pokemonAbilities ? (
        <FlexRow>
          {pokemonAbilities?.abilities.map((ability, key) => (
            <FlexCol key={key}>
              <PokemonContent>{capitaliseFirstLetter(ability.ability.name)}</PokemonContent>
            </FlexCol>
          ))}
        </FlexRow>
      ) : <Skeleton size={"md-box"} iterate={1} />}
    </FlexCol>
  )
}


const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
  gap: 10px;
  text-align: center;
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
  width: 100%;
  background-color: #112d3e57;
  backdrop-filter: blur(10px) saturate(150%);
  box-shadow: rgb(0 183 255 / 44%) 0px 2px 10px;
  color: #fff;
  border: 1px solid rgb(180 180 180 / 30%);
  margin-bottom: 10px;
`