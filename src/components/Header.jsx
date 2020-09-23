/** @jsx jsx */
import { NavLink, withRouter } from "react-router-dom";
import { jsx, Flex, Heading, NavLink as AppNavLink } from "theme-ui";
import { ReactComponent as YouTubeIcon } from "../asset/youtube-square.svg";

const Header = () => {
  return (
    <Flex as="nav" sx={containerStyle}>
      <YouTubeIcon sx={iconStyle} />
      <AppNavLink as={NavLink} to="/" exact sx={navStyle}>
        <Heading>Search</Heading>
      </AppNavLink>
      <AppNavLink as={NavLink} to="/fav">
        <Heading>Favourite</Heading>
      </AppNavLink>
    </Flex>
  );
};

const containerStyle = {
  alignItems: "center",
  px: ["1.5rem", "2rem", "2rem", "3rem"],
  py: ["1.5rem", "1.5rem", "2rem", "2rem"],
  width: "100vw",
};
const iconStyle = {
  fill: "primary",
  fontSize: "1rem",
  height: ["2rem", "3em", "4em", "4em"],
  mr: "auto",
  width: ["2rem", "3em", "4em", "4em"],
};
const navStyle = { mx: ["1rem", "1rem", "2rem", "2rem"] };

export default withRouter(Header);
