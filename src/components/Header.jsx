/** @jsx jsx */
import React from "react";
import { NavLink } from "react-router-dom";
import { jsx, Flex, NavLink as AppNavLink } from "theme-ui";

const Header = () => {
  return (
    <Flex>
      <AppNavLink as={NavLink} to="/">
        Search
      </AppNavLink>
      <AppNavLink as={NavLink} to="/fav">
        Favourites
      </AppNavLink>
    </Flex>
  );
};

export default Header;
