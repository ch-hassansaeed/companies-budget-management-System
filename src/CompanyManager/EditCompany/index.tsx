import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import CardForm from '../../components/CompanyForm';
import {
  Company,
  CompanyInit,
  fetchCompanyList,
  updateLocalStorageCards,
} from '../Company';

const initialState: Company = CompanyInit;

export default function EditCompany() {
  const { id: parmId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<Company>(initialState);
  const [companiesData, setCompaniesData] = useState<Company[]>([]);

  useEffect(() => {
    fetchData();
  }, [parmId]);

  async function fetchData() {
    const companies: Company[] = await fetchCompanyList();
    setCompaniesData(companies);
    if (companies && companies.length > 0) {
      const selectedCompany = companies.find(
        (company) => company.id === Number(parmId),
      );
      setState(selectedCompany ?? initialState);
    }
  }

  const updateStateValues = useCallback(
    (keyName, value) => {
      setState({
        ...state,
        [keyName]: value || '',
      });
    },
    [state],
  );

  function handleSubmitAction() {
    try {
      const companies: Company[] = companiesData;
      const selectedCompany: Company =
        companies.find((company) => company.id === Number(parmId)) ??
        initialState;
      const selectedCompanyIndex = companies.indexOf(selectedCompany);
      companies[selectedCompanyIndex] = state;
      updateLocalStorageCards(companies);
      navigate('/');
    } catch (error: any) {
      alert(error);
      console.log(error);
    } finally {
      //release resources or stop loader
    }
  }

  function handleDeleteAction() {
    try {
      if (confirm('Are you sure you want to delete this company?') === false) {
        return;
      }

      const companies: Company[] = companiesData;
      const selectedCompany: Company =
        companies.find((company) => company.id === Number(parmId)) ??
        initialState;
      const selectedCompanyIndex = companies.indexOf(selectedCompany);
      companies.splice(selectedCompanyIndex, 1);
      updateLocalStorageCards(companies);
      navigate('/');
    } catch (error: any) {
      alert(error);
      console.log(error);
    } finally {
      //release resources or stop loader
    }
  }

  return (
    <Fragment>
      <div className="add-company-content">
        <div className="wrapper">
          <CardForm
            selectedCompany={state}
            onUpdateState={updateStateValues}
            handleSubmitAction={handleSubmitAction}
          >
            <Card company={state}></Card>
          </CardForm>
        </div>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col md={3} className="">
            <div className="d-grid gap-1 delete-company">
              <Button variant="link" size="lg" onClick={handleDeleteAction}>
                Delete Company
              </Button>{' '}
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
