import React, { useState } from "react";
import { styled } from "styled-components";
const Dropdown = ({ data, setYear, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setYear(value);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper>
      <DropdownButton onClick={toggleDropdown}>
        {selectedValue || title}
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>
        {data?.map((item) => (
          <Option key={item} onClick={() => handleOptionClick(item)}>
            {item}
          </Option>
        ))}
      </DropdownContent>
    </DropdownWrapper>
  );
};
const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 130px;
`;

const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  background-color: #f9f9f9;
  min-width: 130px;
  top: 40px;
  left: 0px;
  height: 400px;
  position: absolute;
  overflow: auto;
  border: 1px solid #ccc;
  z-index: 1;
`;

const Option = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const FilterTVShow = () => {
  const [year, setYear] = useState(null);

  const years = Array.from(
    { length: 2024 - 1950 + 1 },
    (_, index) => 1950 + index
  );
  return (
    <Container>
      <Dropdown title="Select Year" data={years} setYear={setYear} />
      <Dropdown title="Select Genre" data={years} setYear={setYear} />
      <Dropdown title="Select Rating" data={years} setYear={setYear} />
    </Container>
  );
};

export default FilterTVShow;
const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: left;
`;
