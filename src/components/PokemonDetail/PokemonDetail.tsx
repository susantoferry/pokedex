import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { PokemonDetailModel } from '../../models/PokemonDetailModel';
import axios from 'axios';
import PokemonDetailPopUp from './PokemonDetailPopUp';
import { GeneratePokemonInfo } from './extensions/PokemonInfo';
import { GenerateEvolution } from './extensions/PokemonEvolution';
import { EvolutionData } from '../../models/PokemonEvolution';
import { GeneratePokemonAbilities } from './extensions/PokemonAbility';
import { GeneratePokemonStats } from './extensions/PokemonStats';
import { PokemonSpecies } from '../../models/PokemonSpecies';
import { GeneratePokemonNameType } from './extensions/PokemonNameType';
import { GeneratePokemonImage } from './extensions/PokemonImage';
import { GeneratePokemonBMI } from './extensions/PokemonBMI';
import { useActiveIndex } from '../../context/ActiveIndexProvider';

interface PokemonDetailProps {
  pokemonId: number | null;
  smallScreen: boolean;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ 
    pokemonId, smallScreen  
  }) => {
  const [ pokemonDetail, setPokemonDetail ] = useState<PokemonDetailModel | null>(null);
  const [ speciesText, setSpeciesText ] = useState<any[]>([]);
  const [ pokemonEvolutionData, setPokemonEvolutionData ] = useState<EvolutionData | null>(null);
  const [ pokemonSpecies, setPokemonSpecies ] = useState<PokemonSpecies>();
  const { activeIndex } = useActiveIndex();

  async function fetchPokemonInfo(id: number): Promise<{ evolutionData: EvolutionData; pokemonSpecies: PokemonSpecies }> {
    try {
      const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

      const responseSpecies = await axios.get<PokemonSpecies>(urlSpecies);

      const evolutionUrl = responseSpecies.data.evolution_chain.url

      const responseEvolutions = await axios.get<EvolutionData>(evolutionUrl);

      return {
        evolutionData: responseEvolutions.data,
        pokemonSpecies: responseSpecies.data
      }
    } catch (error) {
        console.error("Error fetching Pokémon info:", error);
        throw error;
    }
  }

  useEffect(() => {
    const loadPokemonData = async () => {
      if (pokemonId !== null) {
        try {
          const { evolutionData, pokemonSpecies } = await fetchPokemonInfo(pokemonId);
          setPokemonEvolutionData(evolutionData);
          setPokemonSpecies(pokemonSpecies)
        } catch (err) {
          console.error("Failed to load Pokémon data.", err);
        }
      }
    };
    
    loadPokemonData();
  }, [pokemonId]);

  useEffect(() => {
    if (pokemonId) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(response => {
        setPokemonDetail(response.data);
      })
      .catch(error => {
        console.error('Error fetching the Pokémon list:', error);
      });
    }
    
  }, [pokemonId]);

  useEffect(() => {
    if (pokemonId) {
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
      .then(response => {
        setSpeciesText(response.data.flavor_text_entries)
      })
      .catch(error => {
        console.error("Error fetching pokemon species", error)
      });
    }
  }, [pokemonId])
  
  return (
    <React.Fragment>
      {activeIndex &&
        <>
          <PokemonDetailContainer 
            className={activeIndex ? "show no-scroll" : ""}
          >
            <GeneratePokemonImage pokemonId={pokemonId} />
                
            <OuterLayout>
              <PokemonInfoWrapper>
                {/* generate pokemon name and type */}
                <GeneratePokemonNameType pokemonData={pokemonDetail} pokemonSpecies={pokemonSpecies} />
                
                {/* generate pokemon info */}
                <GeneratePokemonInfo pokemonData={pokemonDetail} speciesText={speciesText}/>

                <PokemonCharacteristics>
                  <PokemonBMIContainer>
                    {/* generate pokemon bmi */}
                    <GeneratePokemonBMI pokemonData={pokemonDetail} />
                  </PokemonBMIContainer>

                  <PokemonAbilitiesContainer>
                    
                    {/* generate pokemon abilities */}
                    <GeneratePokemonAbilities pokemonAbilities={pokemonDetail} />
                    
                  </PokemonAbilitiesContainer>
                  
                </PokemonCharacteristics>


                {/* generate pokemon status */}
                <GeneratePokemonStats pokemonStats={pokemonDetail} />
                
                {/* generate pokemon evolution */}
                <GenerateEvolution pokemonEvolutionData={pokemonEvolutionData} />
              </PokemonInfoWrapper>
            </OuterLayout>
          </PokemonDetailContainer>

          <PokemonDetailPopUp
            pokemonId={pokemonId}
            speciesText={speciesText}
            evolution={pokemonEvolutionData}
            pokemonDetail={pokemonDetail}
            smallScreen={smallScreen}
          />
        </>
      }
    </React.Fragment>
  )
}

export default PokemonDetail;

const slideIn = keyframes`
  0% {
    right: -400px;
  }

  100% {
    right: calc(10vw + 15px);
  }
`

const slideOut = keyframes`
  0% {
    right: calc(10vw + 15px);
  }

  100% {
    right: -400px;
  }
`

const PokemonDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(136 196 255 / 5%);
  backdrop-filter: blur(10px) saturate(150%);
  border-radius: 20px;
  width: 100%;
  max-width: 280px;
  top: 175px;
  position: fixed;
  right: calc(10vw + 15px);
  text-align: center;
  bottom: 0;
  margin-bottom: 20px;
  animation-fill-mode: forwards;
  border: 1px solid #6dffff99;
  box-shadow: 0 0 5px 3px rgba(109, 255, 255, 0.2), 
              0 0 10px 3px rgba(109, 255, 255, 0.2), 
              0 0 5px 3px rgba(109, 255, 255, 0.1);
  overflow: hidden;

  &.show {
    animation: display ease-in-out 0.65s, ${slideIn} ease-in-out 0.65s;
  }

  &.no-scroll {
    overflow: hidden;
  }

  @media (min-width: 1510px) and (max-width: 1640px){
    max-width: 280px;
  }

  @media (min-width: 1261px) and (max-width: 1509px) {
    max-width: 260px;
  }

  @media (min-width: 1000.98px) and (max-width: 1260px) {
    max-width: 250px;
  }

  @media (max-width: 1000px) {
    animation: ${slideOut} ease-in-out 0.65s;
    animation-fill-mode: forwards;
    visibility: hidden;

    &.show {
      animation: display ease-in-out 0.65s, ${slideIn} ease-in-out 0.65s;
    }
  }
`;

const OuterLayout = styled.div`
  width: 100%;
  position: relative;
  overflow: inherit;
  z-index: -1;
`

const PokemonInfoWrapper = styled.div`
  padding-top: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
`

const PokemonCharacteristics = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  margin-bottom: 15px;
  padding: 0px 10px;
`

const PokemonBMIContainer = styled.div`
  
`

const PokemonAbilitiesContainer = styled.div`
  display: grid;
  position: relative;
`

