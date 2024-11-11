import React, { useEffect, useState } from 'react'

import styled, { keyframes } from 'styled-components'
import PokemonList from './components/PokemonList/PokemonList'
import PokemonDetail from './components/PokemonDetail/PokemonDetail'
import Search from './components/Search/Search'
import axios from 'axios'
import { PokemonModel } from './models/pokemon'
import { pokemonTypes } from './models/PokemonTypes'
import { getPokemonIdFromUrl } from './utils/Utils'
import CustomDropdown from './components/CustomDropdown/CustomDropdown'
import MenuIcon from '@mui/icons-material/Menu';

const App: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [pokemons, setPokemons] = useState<PokemonModel[]>([]);
  const [allPokemons, setAllPokemons] = useState<PokemonModel[]>([]);
  const typePromises: Promise<void>[] = [];
  const [size, setSize] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
 
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then(response => {
        const pokemonData = response.data.results.map((pokemon: any) => ({
          ...pokemon,
          types: []
        }));
        setPokemons(pokemonData);
        setAllPokemons(pokemonData);

        fetchPokemonTypes(pokemonData);
      })
      .catch(error => {
        console.error('Error fetching the Pokémon list:', error);
      });
  }, []);
  
  const fetchPokemonTypes = (pokemonList: PokemonModel[]) => {
    const updatedPokemons = [...pokemonList];
    for (let i = 0; i < 18; i++) {
      const typePromise = axios.get(`https://pokeapi.co/api/v2/type/${i + 1}`)
      .then(response => {
        const pokemonResult = response.data;
        
        const pokemonsInType = pokemonResult.pokemon
   
        for (let j=0; j < pokemonsInType.length; j++) {
          const pokemonId = getPokemonIdFromUrl(pokemonsInType[j].pokemon.url)

          if (pokemonId <= updatedPokemons.length && updatedPokemons[pokemonId - 1]) {
            updatedPokemons[pokemonId - 1].types.push(pokemonResult.name)
          }
        }
      })
      .catch(error => {
        console.error('Error fetching the Pokémon list:', error);
      });
      typePromises.push(typePromise);
    }
    Promise.all(typePromises).then(() => {
      setPokemons(updatedPokemons);
    });
  };

  const showSearchMenu = () => {
    setShowSearch(!showSearch);
    console.log(!showSearch)
  }
    
  
  useEffect(() => {
    // Define the function to handle resize
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setSize(true);
      } else {
        setSize(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleShowDetail = (value: boolean = false) => {
    console.log(value)
    setShowDetail(value);
  };

  const handlePokemonClick = (id: number | null) => {
    toggleShowDetail();
    
    setTimeout(() => {
      setPokemonId(id);
      toggleShowDetail(true);
    }, 450);
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    )
    setPokemons(filtered)
  };

  const handleFilterType = (selectedType: string) => {
    const updatedPokemons = [...allPokemons];
    let filtered: any[] = [];
  
    if (selectedType !== "All Types" && selectedType !== "") {
      filtered = updatedPokemons.filter(pokemon => pokemon.types.includes(selectedType));
    } else {
      filtered = updatedPokemons;
    }
    setPokemons(filtered);
  };

  return (
    <AppContainer>
      <ListWrapper>
        <NavbarWrapper>
          <Navbar>
            <LeftBar>
              <PokeballLogoImg src="/images/pokeball-logo.jpeg" alt="" />
              <PokemonLogoImg src="/images/pokemon-logo.png" alt=""/>
            </LeftBar>
            <RightBar>
              {!size ? (
                <>
                  <Search onSearch={handleSearch} />
                  <CustomDropdown pokemonType={pokemonTypes.results} onChange={handleFilterType} />
                </>
                ) : <CustomBurgerMenu onClick={() => showSearchMenu()}/>
              }
                
            </RightBar>
          </Navbar>
        </NavbarWrapper>

        <PokemonList pokemons={pokemons} onPokemonClick={handlePokemonClick} />
      </ListWrapper>
      
      {!showDetail ? (
        <>
        </>
        // <EmptyPokemonDetailContainer>
        //   <PokeballWrapper>
        //     <div>
        //       Select Pokemon to see the abilities.
        //     </div>
        //     <PokeballImageContainer>
        //       <PokeballImage /> {/* Rotating image */}
        //     </PokeballImageContainer>
        //   </PokeballWrapper>
        // </EmptyPokemonDetailContainer>
      ) : 
        <PokemonDetail pokemonId={pokemonId} isvisible={showDetail} onPokemonClick={handlePokemonClick} />
      }
      
    </AppContainer>
  )
}

export default App

const ShineEffect = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`

const Rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const rotateWithPause = keyframes`
  0% {
    transform: rotate(0deg);
  }
  77% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const AppContainer = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
`

const ListWrapper = styled.div`
  display: grid;
  flex-direction: column;
  width: 100%;
  flex: 0 0 80%;

  @media (max-width: 1100px) {
    flex: 0 0 100%;
  }
`

const NavbarWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  transition: all 1s ease-in-out;
  
  @media (max-width: 1720px) {
    padding-right: 20px;
  }

  @media (max-width: 1580px) {
    padding-right: 40px;
  }

  @media (max-width: 1490px) {
    padding-right: 50px;
  }

  @media (max-width: 1271px) {
    padding-right: 60px;
  }

  @media (max-width: 1100px) {
    padding-right: 0px;
  }
`

const Navbar = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LeftBar = styled.div`
  
`

const EmptyPokemonDetailContainer = styled.div`
  width: 100%;
  max-width: 250px;
  display: flex;
  
`

const PokeballWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  margin-top: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PokeballImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PokeballImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/images/pokeball1.png');
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  animation: ${rotateWithPause} 4.6s linear infinite;
  transform-origin: center;
  filter: brightness(0.5) grayscale(1);
`;

// const RightBar = styled.div`
//   display: flex;
//   gap: 20px;
//   flex-direction: row-reverse;
//   align-items: center;

//   @media(max-width: 900px) {
//     flex-direction: column;
//     gap: 0;
//   }
// `

const RightBar = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row-reverse;
  align-items: center;
  transition: all 0.3s ease;

  > * {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  /* @media (max-width: 900px) {
    flex-direction: column;
    gap: 0;

    > * {
      transform: translateY(10px);
      opacity: 1;
    }
  } */
`

const PokemonLogoImg = styled.img`
  width: 215px;
  height: auto;
  border: none;
  z-index: 2;
`

const PokeballLogoImg = styled.img`
  height: 35px;
  width: auto;
  border: none;
  border-radius: 50%;
  position: absolute;
  left: 90px;
  z-index: 1;
  top: 5px;
`

const CustomBurgerMenu = styled(MenuIcon)`
  width: 50px;
  height: 50px;
  color: #fff;
  cursor: pointer;
`