import React from 'react';
import { MDBFooter, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='text-center animated-background' color='white' bgColor='dark'>
      <section>
        <MDBBtn outline color="light" floating className='m-1' href='https://www.linkedin.com/in/flaviacostaa' target='_blank' rel='noopener noreferrer' role='button'>
          <MDBIcon fab icon='linkedin' />
        </MDBBtn>

        <MDBBtn outline color="light" floating className='m-1' href='https://github.com/FlaviaCosta1037' target='_blank' rel='noopener noreferrer' role='button'>
          <MDBIcon fab icon='github' />
        </MDBBtn>
      </section>

      <div>
        © 2024 Copyright: 
        <a className='text-white' href='https://mdbootstrap.com/' target='_blank' rel='noopener noreferrer'>
          DevF
        </a>
      </div>
    </MDBFooter>
  );
}
