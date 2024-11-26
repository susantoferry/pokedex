import styled from "styled-components";
import { getPokemonIdFromUrl } from "../../../utils/Utils";
import { EvolutionData } from "../../../models/PokemonEvolution";
import Skeleton from "../../Skeleton/Skeleton";
import { useState } from "react";
import { useActiveIndex } from "../../../context/ActiveIndexProvider";

interface EvolutionProps {
  pokemonEvolutionData: EvolutionData | null
}

export const GenerateEvolution: React.FC<EvolutionProps> = ({ pokemonEvolutionData }) => {
  if (!pokemonEvolutionData) return null
  const { setActiveIndex } = useActiveIndex();
  
  const pokemonId = getPokemonIdFromUrl(pokemonEvolutionData.chain.species.url);
  const evolve1 = pokemonEvolutionData.chain.evolves_to[0];
  const evolve2 = pokemonEvolutionData.chain.evolves_to[0].evolves_to[0];
  
  const evolve1Id = evolve1 ? getPokemonIdFromUrl(evolve1.species.url) : null
  const evolve2Id = evolve2 ? getPokemonIdFromUrl(evolve2.species.url) : null

  const initialPokemon = () => {
    return (
      <InitialPokemonContainer>
        <div>
          <EvolveImage
            $pokemonId={pokemonId}
            onClick={() => setActiveIndex(pokemonId)}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt={pokemonEvolutionData.chain.species.name}
          />
          <PokemonCaption>{pokemonEvolutionData.chain.species.name}</PokemonCaption>
        </div>
        <Level>Lv. {evolve1.evolution_details[0].min_level}</Level>
        
      </InitialPokemonContainer>
    )
  }

  const secondEvolve = () => {
    return (
      <SecondPokemonContainer>
        {evolve1Id !== null && (
          <>
            <div>
              <EvolveImage
                $pokemonId={evolve1Id}
                onClick={() => setActiveIndex(evolve1Id)}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolve1Id}.png`}
                alt={evolve1.species.name}
              />
              <PokemonCaption>{evolve1.species.name}</PokemonCaption>
            </div>
            <Level>Lv. {evolve2.evolution_details[0].min_level}</Level>
          </>
        )}
      </SecondPokemonContainer>
    )
  }

  const thirdEvolve = () => {
    return (
      <ThirdPokemonContainer>
        {evolve2Id !== null && (
            <div>
              <EvolveImage
                $pokemonId={evolve2Id}
                onClick={() => setActiveIndex(evolve2Id)}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolve2Id}.png`}
                alt={evolve2.species.name}
              />
              <PokemonCaption>{evolve2.species.name} </PokemonCaption>
            </div>
        )}
      </ThirdPokemonContainer>
    )
  }
  
  return (
    <PokemonEvolutionWrapper>
      {pokemonEvolutionData ? (
        <PokedexTitle>Evolution</PokedexTitle>
      ) : <Skeleton size={"title"} iterate={1}/>}

      {pokemonEvolutionData ? (
        <FlexEvolution>
          
          { initialPokemon() }

          { secondEvolve() }

          { thirdEvolve() }

        </FlexEvolution> 
      ) : <Skeleton size={"md-box"} iterate={1}/>}

    </PokemonEvolutionWrapper>
  ) 
}

const PokemonEvolutionWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding-top: 20px;
`

const PokedexTitle = styled.div`
  font-weight: bold;
  color: #fff;
`

const FlexEvolution = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  @media (max-width: 999.98px) {
    flex-direction: row;
  }

  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

const InitialPokemonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 999.98px) {
    flex-direction: row;
  }

  @media (max-width: 520px) {
    flex-direction: column;
  }
`

const SecondPokemonContainer = styled(InitialPokemonContainer)`
  
`

const ThirdPokemonContainer = styled.div`
    margin-top: 10px;
`

const EvolveImage = styled.img<{ $pokemonId: number}>`
  height: 75px;
  width: 75px;
  cursor: pointer;
  margin: 0 5px;
  padding: 3px;
  border-radius: 50%;
  transition: transform 0.5s ease-in-out;

  &:hover {
    transform: scale(1.15);
  }
`

const PokemonCaption = styled.div`
  position: relative;
  bottom: 8px;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  text-transform: capitalize;
  margin-bottom: 10px;
`

const Level = styled.div`
  width: 70px;
  padding: 4px 0;
  border-radius: 30px;
  margin: 0 5px;
  font-size: 12px;
  font-weight: 600;
  background-color: transparent;
  backdrop-filter: blur(10px) saturate(150%);
  box-shadow: rgb(0, 183, 255, 0.74) 0px 2px 10px;
  color: #fff;
  border: 1px solid rgb(180 180 180 / 59%);
`