/** @jsx jsx */
import React from "react";
import { NavLink } from "react-router-dom";
import { jsx, Flex, NavLink as AppNavLink } from "theme-ui";

const Header = () => {
  return (
    <Flex>
      <AppNavLink as={NavLink} to="/" href="#!">
        Search
      </AppNavLink>
      <AppNavLink href="#!">Favourites</AppNavLink>
    </Flex>
  );
};

export default Header;
