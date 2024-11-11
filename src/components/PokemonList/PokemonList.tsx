import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Pokemon from './Pokemon'
import { PokemonModel } from '../../models/pokemon';
import { getPokemonIdFromUrl } from '../../utils/Utils';

interface PokemonListProps {
  pokemons: PokemonModel[];
  onPokemonClick: (id: number) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onPokemonClick }) => {

  return (
    <PokemonListContainer>
      <PokemonListWrapper>
        
        { pokemons.map((pokemon, i) => (
          <React.Fragment key={i}>
            <Pokemon
              pokemon={pokemon}
              onClick={() => {
                const pokemonId = getPokemonIdFromUrl(pokemon.url)
                onPokemonClick(pokemonId);
              }}
            />
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

  transition: all 1s ease-in-out;
  
  @media (max-width: 1720px) {
    margin-right: 20px;
  }

  @media (max-width: 1580px) {
    margin-right: 40px;
  }

  @media (max-width: 1490px) {
    margin-right: 50px;
  }

  @media (max-width: 1271px) {
    margin-right: 60px;
  }

  @media (max-width: 1100px) {
    margin-right: 0px;
  }
`

const PokemonListWrapper = styled.section`
  position: relative;
  display: grid;
  flex-direction: column;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  width: 100%;
  flex: 0 0 75%;
  margin-bottom: 20px;
  gap: 10px;

  @media (min-width: 1201px) and (max-width: 1440px) {
    grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
  }
`