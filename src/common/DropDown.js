import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Dropdown = ({ data, setValue, title, value, type, activeField }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    !activeField && setSelectedValue("");
  }, [activeField]);

  const handleOptionClick = (value) => {
    setSelectedValue(value.name || value);
    setValue(value.id || value);
    setIsOpen(false);
  };
  return (
    <DropdownWrapper>
      {type === "Rating" ? (
        <DropdownButton onClick={toggleDropdown}>
          {selectedValue || title}⭐️
        </DropdownButton>
      ) : (
        <DropdownButton onClick={toggleDropdown}>
          {selectedValue || title}
        </DropdownButton>
      )}
      <DropdownContent isOpen={isOpen}>
        {data?.map((item, index) => {
          return type === "Rating" ? (
            <Option
              key={item.id || index}
              onClick={() => handleOptionClick(item)}
            >
              {item.name || item} ⭐️
            </Option>
          ) : (
            <Option
              key={item.id || index}
              onClick={() => handleOptionClick(item)}
            >
              {item.name || item}
            </Option>
          );
        })}
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
  gap: 10px;
  overflow-y: scroll;
  background-color: #f9f9f9;
  min-width: 130px;
  top: 40px;
  left: 0px;
  height: 250px;
  position: absolute;
  overflow: auto;
  border: 1px solid #ccc;
  z-index: 100;
  padding: 10px 0px;
`;

const Option = styled.div`
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
export default Dropdown;
