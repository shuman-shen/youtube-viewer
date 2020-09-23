/** @jsx jsx */

import { jsx, Flex, Input, Button, Text } from "theme-ui";

const SearchBar = ({ handleSubmit, handleTextChange, handleReset }) => {
  return (
    <Flex as="form" onSubmit={handleSubmit} sx={containerStyle}>
      <Input
        name="searchField"
        placeholder="Type to search..."
        onChange={(e) => handleTextChange(e.target.value)}
        sx={searchBarStyle}
      />
      <Flex>
        <Button
          sx={searchButtonStyle}
          type="reset"
          onClick={handleReset}
          variant="secondary"
        >
          Reset
        </Button>
        <Button sx={searchButtonStyle} type="submit">
          Search
        </Button>
      </Flex>
      <Text sx={{ px: [3, 2] }}>API quota limit applied.</Text>
    </Flex>
  );
};

const containerStyle = {
  mx: "1.5rem",
  height: "70vh",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const searchBarStyle = {
  width: ["80vw", "80vw", "60vw", "50vw"],
};

const searchButtonStyle = {
  width: ["35vw", "35vw", "25vw", "20vw"],
  my: "1.5rem",
  mx: "1rem",
};

export default SearchBar;
