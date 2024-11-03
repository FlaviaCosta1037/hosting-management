import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBContainer, MDBTypography, MDBCard, MDBCardBody, MDBRow } from 'mdb-react-ui-kit';
import { db } from '../Services/firebase';
import Navbar from '../Header/Navbar';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import Footer from '../Footer/Footer';

export default function ListHosting() {
    const navigate = useNavigate();
    const [hosting, setHosting] = useState([]);
    const [filteredHosting, setFilteredHosting] = useState([]);
    const [searchCPF, setSearchCPF] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHosting = async () => {
            try {
                const hostingCollection = collection(db, 'hosting');
                const guestSnapshot = await getDocs(hostingCollection);
                const hostingList = guestSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setHosting(hostingList);
                setFilteredHosting(hostingList);
            } catch (err) {
                console.error("Erro ao buscar hospedagens:", err);
                setError("Erro ao buscar hospedagens. Tente novamente mais tarde.");
            }
        };
        fetchHosting();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'hosting', id));
            setHosting((prevHosting) => prevHosting.filter((item) => item.id !== id));
            setFilteredHosting((prevFiltered) => prevFiltered.filter((item) => item.id !== id));
            alert('Registro deletado com sucesso!');
        } catch (err) {
            console.error("Erro ao deletar registro:", err);
            alert('Erro ao deletar o registro. Tente novamente.');
        }
    };

    const formatDate = (timestamp) => {
        if (timestamp && timestamp.toDate) {
            return timestamp.toDate().toLocaleDateString('pt-BR');
        }
        return '';
    };

    return (
        <>
            <Navbar />
            <div className="page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <MDBContainer className="text-center py-5">
                    <MDBTypography tag="h1" className="display-4 text-primary">
                        Gerenciamento de Hospedagem
                    </MDBTypography>
                    <MDBTypography tag="p" className="lead">
                        Relatório de reservas
                    </MDBTypography>
                </MDBContainer>

                {error && <p className="text-danger">{error}</p>}
                <MDBContainer>
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                            <MDBRow className="mt-3 justify-content-start">
                                {/* Campo de busca removido temporariamente */}
                            </MDBRow>
                            <MDBTable>
                                <MDBTableHead light>
                                    <tr>
                                        <th scope="col">Check-in</th>
                                        <th scope="col">Check-out</th>
                                        <th scope="col">Diárias</th>
                                        <th scope="col">Valor Unitário</th>
                                        <th scope="col">Valor Total</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {filteredHosting.map((item) => (
                                        <tr key={item.id}>
                                            <td>{formatDate(item.dateCheckin)}</td>
                                            <td>{formatDate(item.dateCheckout)}</td>
                                            <td>{item.numberOfDays}</td>
                                            <td>{item.dailyRate}</td>
                                            <td>{item.total}</td>
                                            <td>
                                                <MDBBtn color="primary" onClick={() => navigate(`/editHosting/${item.id}`, { state: { customerCPF: item.customerCPF, customerName: item.customerName } })}>
                                                    Editar
                                                </MDBBtn>
                                                <MDBBtn color="danger" className="ms-2" onClick={() => handleDelete(item.id)}>
                                                    Deletar
                                                </MDBBtn>
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
            <Footer />
        </>
    );
}
