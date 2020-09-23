/** @jsx jsx */
import { jsx, Heading } from "theme-ui";

const NotFound = () => {
  return (
    <Heading as="h1" sx={textStyle}>
      404 NOT FOUND.
    </Heading>
  );
};

const textStyle = { marginTop: [2, 3, 3, 4], textAlign: "center" };

export default NotFound;
