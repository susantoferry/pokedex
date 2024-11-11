import React from 'react'
import styled, { keyframes } from "styled-components";
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    onSearch(searchTerm)
  }

  return (
    <>
      <SearchWrapper>
        <SearchInput 
          placeholder='Search your pokemon'
          onChange={handleSearch}
        />
        <SearchButtonWrapper>
          <CustomSearchIcon />
        </SearchButtonWrapper>
      </SearchWrapper>
    </>
  )
}

export default Search;

const shine = keyframes`
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`

const SearchWrapper = styled.div`
  position: relative;
  margin: 30px 10px;
  background: linear-gradient(90deg, #02b7ff, #fcfff3, #0281ff);
  background-size: 200% 100%;
  border-radius: 50px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 5px 1px rgba(2, 183, 255, 0.6), 
                0 0 30px 0px rgba(2, 183, 255, 0.4),
                0 0 45px 1px rgba(2, 183, 255, 0.2);
  animation: ${shine} 3s linear infinite;
  gap: 10px;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: #2a2a2a;
    border-radius: 50px;
    z-index: 1;
  }
`

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  width: 100%;
  color: #fff;
  z-index: 9;
`

const SearchButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  z-index: 1;
`

const CustomSearchIcon = styled(SearchIcon)`
  color: #fff;
`