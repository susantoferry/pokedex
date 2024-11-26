import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { colorTypes } from '../../models/PokemonTypes';
import { capitaliseFirstLetter } from '../../utils/Uppercase';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Option {
  name: string;
  url: string;
}

interface CustomDropdownProps {
  pokemonType: Option[];
  onChange: (optionName: string) => void;
  selectedType: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ pokemonType, onChange, selectedType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); 

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionName: string) => {
    onChange(optionName);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={handleDropdownToggle}>
        {capitaliseFirstLetter(selectedType || "All Types")}
        <span>{isOpen ? <CustomArrowUpIcon/> : <CustomArrowDownIcon/> }</span>
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          <DropdownListItem onClick={() => handleOptionClick("All Types")}>
            All Types
          </DropdownListItem>
          {pokemonType
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .map((option) => {
            const { bgColor, iconType } = colorTypes(option.name)
            return (
              <DropdownListItem
                key={option.name}
                value={selectedType}
                onClick={() => handleOptionClick(option.name)}
              >
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px'}}>
                
              <IconImg 
                src={`/images/pokemon-icon/${iconType}`} 
                alt="" 
                style={{ backgroundColor: bgColor }}
              />
                
                {capitaliseFirstLetter(option.name)}
              </div>
              
            </DropdownListItem>
            )
        })}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default CustomDropdown;

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

const DropdownContainer = styled.div`
  position: relative;
  width: 200px;
  font-family: Arial, sans-serif;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  border: 1px solid #ccc;
  background: linear-gradient(90deg, #02b7ff, #fcfff3, #0281ff);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 5px 1px rgba(2, 183, 255, 0.6), 
                0 0 30px 0px rgba(2, 183, 255, 0.4),
                0 0 45px 1px rgba(2, 183, 255, 0.2);
  animation: ${shine} 3s linear infinite;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background: #2a2a2a;
    border-radius: 8px;
    z-index: -1;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  max-height: 200px;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  list-style: none;
  border: 1px solid #ccc;
  background-color: #88c2fc33;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  border-radius: 8px;
  color: #fff;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #88c2fc33;
    backdrop-filter: blur(10px);
  }
`;
const IconImg = styled.img`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  padding: 5px;
  position: relative;
  box-shadow: 
    0 6px 10px rgba(0, 0, 0, 0.4),         
    inset 0 -8px 10px rgba(0, 0, 0, 0.3),  
    inset 0 6px 10px rgba(255, 255, 255, 0.6);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 50%;
    transform: rotate(45deg);
    animation: ${shine} 2s infinite;
  }
`

const CustomArrowUpIcon = styled(KeyboardArrowUpIcon)`
  
`

const CustomArrowDownIcon = styled(KeyboardArrowDownIcon)`
  
`
