import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import PokemonList from './components/PokemonList/PokemonList'
import PokemonDetail from './components/PokemonDetail/PokemonDetail'
import Search from './components/Search/Search'
import axios from 'axios'
import { PokemonModel } from './models/pokemon'
import { pokemonTypes } from './models/PokemonTypes'
import { getPokemonIdFromUrl } from './utils/Utils'
import CustomDropdown from './components/CustomDropdown/CustomDropdown'
import MenuIcon from '@mui/icons-material/Menu';
import { useActiveIndex } from './context/ActiveIndexProvider'

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonModel[]>([]);
  const [allPokemons, setAllPokemons] = useState<PokemonModel[]>([]);
  const typePromises: Promise<void>[] = [];
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { activeIndex } = useActiveIndex();
  const [filter, setFilter] = useState({
    keyword: '',
    type: '',
  })
 
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

  const handleSearch = (searchTerm: string) => {
    setFilter((prev) => ({ ...prev, keyword: searchTerm }));

    const filtered = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    )
    console.log(filtered)
    setPokemons(filtered)
  };

  const handleFilterType = (selectedType: string) => {
    setFilter((prev) => ({ ...prev, type: selectedType }));
    const updatedPokemons = [...allPokemons];
    let filtered: any[] = [];
  
    if (selectedType !== "All Types" && selectedType !== "") {
      filtered = updatedPokemons.filter(pokemon => pokemon.types.includes(selectedType));
    } else {
      filtered = updatedPokemons;
    }
    setPokemons(filtered);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (activeIndex || showSearch) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [activeIndex, showSearch]);

  return (
    
      <AppContainer>
        <Backdrop 
          style={{ display: activeIndex! || showSearch ? 'block' : 'none' }} 
        />
        <NavbarWrapper className={`${isScrolled ? "active" : ""} ${activeIndex ? "visible" : ""}`}>
          <Navbar>
            <LeftBar>
              <PokeballLogoImg src="/images/pokeball-logo.webp" alt="pokeball" />
              <PokemonLogoImg src="/images/pokemon-logo.png" alt="pokemon-logo" loading="lazy"/>
            </LeftBar>
            <RightBar>
              <SearchContainer>
                <Search onSearch={handleSearch} searchValue={filter.keyword}/>
                <CustomDropdown pokemonType={pokemonTypes.results} onChange={handleFilterType} selectedType={filter.type}/>
              </SearchContainer>
              <CustomBurgerMenu onClick={() => showSearchMenu()}/>
            </RightBar>
            <MobileContainer className={showSearch ? "show" : ""}>
                <SearchSmallContainer>
                  <Search onSearch={handleSearch} searchValue={filter.keyword}/>
                  <CustomDropdown pokemonType={pokemonTypes.results} onChange={handleFilterType} selectedType={filter.type}/>
                </SearchSmallContainer>  
                <CloseSearch onClick={() => showSearchMenu()}> Close Search </CloseSearch> 
              </MobileContainer>
          </Navbar>
        </NavbarWrapper>

        <ListWrapper>
          <PokemonList pokemons={pokemons} />
          <PokemonDetail 
            pokemonId={activeIndex!} 
            smallScreen={false}
          />
        </ListWrapper>
      </AppContainer>
  )
}

export default App


const AppContainer = styled.div`
  position: relative;
  z-index: 1;
`

const Backdrop = styled.div`

  @media (max-width: 1000px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: 1;
    overflow: hidden !important;
  }
`;

const ListWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 78% 21%!important;
  grid-auto-rows: auto;
  padding: 0 10vw;
  transition: all .5s ease-in-out;

  @media (min-width: 1355px) and (max-width: 1640px){
    grid-template-columns: 76% 23%!important;
  }

  @media (min-width: 1101px) and (max-width: 1355px){
    grid-template-columns: 72% 27% !important;
  }

  @media (min-width: 1001px) and (max-width: 1100px){
    grid-template-columns: 70% 30% !important;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 100%!important;
  }
  
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`

const NavbarWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: 40px;
  padding-top: 40px;
  padding-left: 10vw;
  padding-right: 10vw;

  &.active {
    background: #1c1e761c;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &.visible {
    z-index: 0;
  }
`

const Navbar = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
`

const LeftBar = styled.div`
  
`

const RightBar = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row-reverse;
  align-items: center;
  transition: all 0.3s ease;
`

const SearchContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row-reverse;
  align-items: center;

  @media(max-width: 1000px) {
    display: none;
  }
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
  top: -15px;
`

const CustomBurgerMenu = styled(MenuIcon)`
  display: none;
  visibility: hidden;
  opacity: 0;

  @media(max-width: 1000.98px) {
    display: block;
    visibility: visible;
    opacity: 1;
    width: 50px;
    height: 50px;
    color: #fff;
    cursor: pointer;
  }
  
`

const MobileContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 200px;
  background: rgb(26 54 82 / 25%);
  backdrop-filter: blur(10px) saturate(150%);
  border: 1px solid #6dffff99;
  border-top: none;
  box-shadow: 0 0 5px 3px rgba(109, 255, 255, 0.2), 
              0 0 10px 3px rgba(109, 255, 255, 0.2), 
              0 0 5px 3px rgba(109, 255, 255, 0.1);
  color: white;
  z-index: 999;
  top: 0px;
  left: 0;
  right: 0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 0 20px;
  animation: slideUp .5s ease-in-out forwards;
  visibility: hidden;
  
  &.show {
    animation: slideDown .5s ease-in-out forwards;
  }

  @media (max-width: 1000px) {
    display: block;
    visibility: visible;
  }


  @keyframes slideDown {
    0% {
      transform: translateY(-210px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-210px);
    }
  }
`

const SearchSmallContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`

const CloseSearch = styled.button`
  display: block;
  margin: 0 auto;
  width: 250px;
  padding: 8px 16px;
  border-radius: 20px;
  outline: none;
  background: transparent;
  backdrop-filter: blur(20px);
  color: #fff;
  font-weight: 600;
  border: 1px solid blue;
  cursor: pointer;

  &:hover {
    animation: lightEffect 1s ease-in-out infinite alternate;
    color: #03e9f4;
  }

  @keyframes lightEffect {
    0% {
      box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #03e9f4, 0 0 40px #03e9f4, 0 0 50px #03e9f4;
    }
    100% {
      box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #03e9f4, 0 0 25px #03e9f4, 0 0 35px #03e9f4;
    }
  }
`