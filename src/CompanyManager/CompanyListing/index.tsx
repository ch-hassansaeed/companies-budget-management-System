import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Company, fetchCompanyList } from '../Company';
import CompanyCard from '../../components/Card';
import Row from 'react-bootstrap/Row';
import { Button, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import BudgetEditModelBox from '../../components/BudgetEditModelBox';

export default function CompanyListing() {
  const navigate = useNavigate();
  const [companiesData, setCompaniesData] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company>();
  const [showBudgetEditModelBox, setShowBudgetEditModelBox] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const companies: Company[] = await fetchCompanyList();
    setCompaniesData(companies);
  }
  function handleClickCompanyCard(company: Company) {
    setSelectedCompany(company);
    setShowBudgetEditModelBox(true);
  }

  return (
    <Fragment>
      <Container>
        <Row className="justify-content-center">
          {companiesData.length === 0 && (
            <>
              <Card style={{ width: '50%', margin: '25px' }}>
                <Card.Body>
                  <Card.Title>No company exist</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Go to add company for create a new company.
                  </Card.Subtitle>
                  <Card.Text>
                    You can add,edit and delete company any time..
                  </Card.Text>
                  <Card.Link href="/add-company">Add Company</Card.Link>
                </Card.Body>
              </Card>
            </>
          )}
          {companiesData.map((company: Company, id) => (
            <>
              <Col md={4} key={id} className="mb-3">
                <Link
                  key={id}
                  to="#"
                  className="col-md-3 company-card"
                  onClick={() => handleClickCompanyCard(company)}
                >
                  <CompanyCard company={company} />
                </Link>
              </Col>
            </>
          ))}
        </Row>
        <Row className="justify-content-center">
          <Col md={4} className="mt-3">
            <Button
              className="add-new-company"
              variant="primary"
              size="lg"
              onClick={() => navigate('add-company')}
            >
              Add New Company
            </Button>{' '}
          </Col>
        </Row>
      </Container>
      <div className="footer">
        Copyright © 2022 https://github.com/ch-hassansaeed
      </div>
      <BudgetEditModelBox
        onDataUpdate={fetchData}
        selectedCompany={selectedCompany}
        showBudgetEditModelBox={showBudgetEditModelBox}
        setShowBudgetEditModelBox={setShowBudgetEditModelBox}
      />
    </Fragment>
  );
}
