/** @jsx jsx */
import { jsx, Button, Flex, Input, Text } from "theme-ui";

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
  alignItems: "center",
  flexDirection: "column",
  height: "70vh",
  justifyContent: "center",
  mx: "1.5rem",
};

const searchBarStyle = {
  width: ["80vw", "80vw", "60vw", "50vw"],
};

const searchButtonStyle = {
  mx: "1rem",
  my: "1.5rem",
  width: ["35vw", "35vw", "25vw", "18vw"],
};

export default SearchBar;
