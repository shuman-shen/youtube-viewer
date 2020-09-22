/** @jsx jsx */
import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  jsx,
  Flex,
  NavLink as AppNavLink,
  Heading,
  IconButton,
} from "theme-ui";
import { ReactComponent as ArrowLeftIcon } from "../asset/arrow-circle-left.svg";

const Header = ({ location, history }) => {
  return (
    <Flex sx={{ alignItems: "center", p: "1.5rem", width: "100vw" }}>
      {location.pathname !== "/" ? (
        <ArrowLeftIcon
          sx={{
            fill: "#f0f5fa",
            fontSize: "1rem",
            width: "2rem",
            height: "2rem",
            cursor: "pointer",
          }}
          onClick={() => history.goBack()}
        />
      ) : null}

      <Flex as="nav" sx={{ justifyContent: "flex-end", flex: 1 }}>
        <AppNavLink as={NavLink} to="/" sx={{ mx: "1rem" }}>
          <Heading>Search</Heading>
        </AppNavLink>
        <AppNavLink as={NavLink} to="/fav">
          <Heading>Favourites</Heading>
        </AppNavLink>
      </Flex>
    </Flex>
  );
};

export default withRouter(Header);
