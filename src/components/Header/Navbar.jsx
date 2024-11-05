import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBNavbarBrand,
  MDBCollapse,
  MDBNavbarToggler
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'; // Importar o Link para redirecionamentos

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);

  const handleToggle = () => {
    console.log('Menu hamburger clicado'); // Verifique se essa linha aparece no console
    setShowNav(!showNav);
  };

  return (
    <MDBNavbar className='animated-background' expand='lg' light bgColor='light'>
      <MDBContainer className="navbar-left">
        <MDBNavbarBrand href='#'>
          <img
            src='/SH.png'
            height='30'
            alt='Brand Logo'
            loading='lazy'
            style={{ width: '90px', height: '90px', borderRadius: '5px' }}
          />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          type='button'
          aria-label='Toggle navigation'
          onClick={handleToggle}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse show={showNav} navbar>
          <MDBNavbarNav right className='mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  Hospedagens
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <Link to='/hosting'>Registro de hospedagens</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link to='/AddHosting'>Adicionar hospedagem</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  Clientes
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <Link to='/listCustomer'>Clientes cadastrados</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link to='/addCustomer'>Adicionar cliente</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                  Contabilidade
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <Link to='/expenses'>Entrada e saída</Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <Link to='/addExpense'>Adicionar despesa</Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' link href='/login'>
                Sair
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
