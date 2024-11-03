import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Services/firebase';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/hosting');
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <MDBContainer className="my-5">
            <MDBCard>
                <MDBRow className='g-0'>
                    {/* <MDBCol md='6'>
                        <MDBCardImage src='https://www.carneirostemporada.com/media/5c598b748631470011f5598d/Vista%20a%C3%A9rea.jpg' alt="login form" className='rounded-start w-100' />
                    </MDBCol> */}

                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>
                            <div className='d-flex flex-row mt-2'>
                                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                <img src="DevF.png" alt="" style={{ width: '100px', borderRadius: '40px' }}  />
                                
                            </div>

                            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Acesse o sistema</h5>

                            {/* Campos de entrada de email e senha */}
                            <MDBInput 
                                wrapperClass='mb-4' 
                                label='Email' 
                                id='formControlLg' 
                                type='email' 
                                size="lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MDBInput 
                                wrapperClass='mb-4' 
                                label='Senha' 
                                id='formControlLg' 
                                type='password' 
                                size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* Botão de login */}
                            <MDBBtn 
                                className="mb-4 px-5" 
                                color='dark' 
                                size='lg'
                                onClick={handleLogin}
                            >
                                Acesse
                            </MDBBtn>
                            
                            <a className="small text-muted" href="#!">Esqueceu sua senha?</a>
                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                Não tem uma conta? <a href="#!" style={{ color: '#393f81' }}>Registre aqui</a>
                            </p>

                            <div className='d-flex flex-row justify-content-start'>
                                <a href="#!" className="small text-muted me-1">Termos de uso.</a>
                                <a href="#!" className="small text-muted">Política de privacidade</a>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>
    );
};

export default Login;
