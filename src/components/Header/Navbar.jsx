import React from 'react';
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
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

export default function Navbar() {
  return (
    <MDBNavbar className='animated-background' expand='lg' light bgColor='light'>
      <MDBContainer>
        <MDBNavbarBrand href='#'>
          <img
            src='/SH.png'
            height='30'
            alt=''
            loading='lazy'
            style={{ width: '90px', height: '90px', borderRadius: '5px' }}
          />
        </MDBNavbarBrand>
        {/* O botão do menu hamburguer pode ser mantido se você desejar */}
        <MDBIcon icon='bars' fas style={{ display: 'none' }} /> {/* Ocultei o ícone hamburguer */}

        <MDBNavbarNav right className='mb-2 mb-lg-0'>
          <MDBNavbarItem>
            <MDBDropdown>
              <MDBDropdownToggle tag='a' className='nav-link'>
                Hospedagens
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link href='/hosting'>Registro de hospedagens</MDBDropdownItem>
                <MDBDropdownItem link href='/AddHosting'>Adicionar hospedagem</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBDropdown>
              <MDBDropdownToggle tag='a' className='nav-link'>
                Clientes
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link href='/listCustomer'>Clientes cadastrados</MDBDropdownItem>
                <MDBDropdownItem link href='/addCustomer'>Adicionar cliente</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBDropdown>
              <MDBDropdownToggle tag='a' className='nav-link'>
                Contabilidade
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link href='/expenses'>Entrada e saída</MDBDropdownItem>
                <MDBDropdownItem link href='/addExpense'>Adicionar despesa</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink active aria-current='page' link href='/login'>
              Sair
            </MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}
