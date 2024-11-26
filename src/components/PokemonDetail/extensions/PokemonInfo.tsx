import React from "react";
import styled from "styled-components";
import { PokemonDetailModel } from "../../../models/PokemonDetailModel";
import Skeleton from "../../Skeleton/Skeleton";

interface PokemonTitleProps {
  pokemonData: PokemonDetailModel | null;
  speciesText: any[];
}

export const GeneratePokemonInfo: React.FC<PokemonTitleProps> = ({ pokemonData, speciesText}) => {
  return (
    <PokedexDescWrapper>
      {pokemonData ? (
        <React.Fragment>
          <PokedexTitle>Pokedex Entry</PokedexTitle>
          <PokedexDesc>
            <React.Fragment>
              {speciesText.slice(1, 7).map((entry, index) => (
                entry.language.name == "en" ? (
                  <span key={index}>
                    <span>{entry.flavor_text + ' '}</span>   
                  </span>
                ) : null
              ))}
            </React.Fragment>
          </PokedexDesc>
        </React.Fragment>
      ): <Skeleton size={"md-box"} iterate={1}/>}
      
    </PokedexDescWrapper>
  )
};

const PokedexDescWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
  padding: 0px 10px;
  text-align: center;
`

const PokedexTitle = styled.div`
  font-weight: bold;
  color: #fff;
`;

const PokedexDesc = styled.span`
  font-size: 13.5px;
  color: #98ACBC;
  font-weight: bold;
  padding-top: 10px;
  height: 100%;
  display: block;
`