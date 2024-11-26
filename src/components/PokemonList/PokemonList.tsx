import React from 'react'
import styled from 'styled-components'
import Pokemon from './Pokemon'
import { PokemonModel } from '../../models/pokemon';

interface PokemonListProps {
  pokemons: PokemonModel[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <PokemonListContainer>
      <PokemonListWrapper>
        { pokemons.map((pokemon, i) => (
          <React.Fragment key={i}>
            <Pokemon pokemon={pokemon} />
          </React.Fragment>
        ))}
      </PokemonListWrapper>
    </PokemonListContainer>
  )
}

export default PokemonList; 

const PokemonListContainer = styled.div`
  overflow-y: auto;
  flex: 1;
`

const PokemonListWrapper = styled.section`
  position: relative;
  display: grid !important;
  flex-direction: column;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
  width: 100%;
  flex: 0 0 75%;
  margin-bottom: 20px;
  gap: 10px;
  padding-right: 10px;

  @media (min-width: 1201px) and (max-width: 1550px) {
    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
    padding-right: 10px;
  }

  @media (min-width: 1001px) and (max-width: 1100px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
  }

  @media (min-width: 768px) and (max-width: 1000px){
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;
  }

  @media (max-width: 768px) {
    display: flex!important;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 0;
  }
`