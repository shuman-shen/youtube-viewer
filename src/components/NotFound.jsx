/** @jsx jsx */
import { jsx, Heading } from "theme-ui";

const NotFound = () => {
  return (
    <Heading as="h1" sx={{ marginTop: [5, 5, 8], textAlign: "center" }}>
      404 NOT FOUND.
    </Heading>
  );
};

export default NotFound;
