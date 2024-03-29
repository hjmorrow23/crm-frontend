import React from 'react'
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 10%;
  padding: 20px;
  height: 100%;
`;

const NavContainer = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 10px;
    }
  }
`;

export function Sidebar() {
  return (
    <SidebarContainer>
        <h3>Menu</h3>
        <NavContainer>
            <ul>
                <li><a href="/">Dashboard</a></li>
                <li><a href="/leads">Leads</a></li>
            </ul>
        </NavContainer>
    </SidebarContainer>
  )
}
