/** @jsx jsx */
import { NavLink, withRouter } from "react-router-dom";
import { jsx, Flex, NavLink as AppNavLink, Heading } from "theme-ui";
import { ReactComponent as YouTubeIcon } from "../asset/youtube-square.svg";

const Header = () => {
  return (
    <Flex as="nav" sx={containerStyle}>
      <YouTubeIcon sx={iconStyle} />
      <AppNavLink as={NavLink} to="/" exact sx={{ mx: "1rem" }}>
        <Heading>Search</Heading>
      </AppNavLink>
      <AppNavLink as={NavLink} to="/fav">
        <Heading>Favourite</Heading>
      </AppNavLink>
    </Flex>
  );
};

const containerStyle = { alignItems: "center", p: "1.5rem", width: "100vw" };

const iconStyle = {
  mr: "auto",
  fill: "primary",
  fontSize: "1rem",
  width: ["2rem", "3em", "4em", "4em"],
  height: ["2rem", "3em", "4em", "4em"],
};
export default withRouter(Header);
