import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  Company,
  CompanyInit,
  fetchCompanyList,
  isTotalBudgetInRange,
  updateLocalStorageCards,
} from '../../CompanyManager/Company';

interface BudgetEditModelBoxProps {
  onDataUpdate: any;
  selectedCompany: Company | undefined;
  showBudgetEditModelBox: boolean;
  setShowBudgetEditModelBox: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BudgetEditModelBox(props: BudgetEditModelBoxProps) {
  const {
    onDataUpdate,
    selectedCompany,
    showBudgetEditModelBox,
    setShowBudgetEditModelBox,
  } = props;
  const initialState: Company = CompanyInit;

  const [budget, setBudget] = useState<number>(0);
  const [budgetError, setBudgetError] = useState('');

  useEffect(() => {
    //refresh the budget value if selectedCompany changed
    setBudget(selectedCompany?.budget ?? 0);
  }, [selectedCompany]);
  useEffect(() => {
    //show error if budget is not valid
    const ValidateBudget = isTotalBudgetInRange(
      Number(budget),
      Number(selectedCompany?.budget_spent),
    );
    setBudgetError(
      ValidateBudget
        ? ''
        : 'Company budget should be greater than spent budget',
    );
  }, [budget]);

  const handleClose = () => setShowBudgetEditModelBox(false);

  const handleFormChangeNumbers = (event: {
    target: { value: string; name: string };
  }) => {
    const { value } = event.target;
    if (isNaN(Number(value))) return; //only accept numbers
    setBudget(+value);
  };
  async function handleSubmitAction() {
    try {
      if (selectedCompany) {
        if (!budgetError) {
          const companies: Company[] = await fetchCompanyList();

          const filteredCompany: Company =
            companies.find(
              (company) => company.id === Number(selectedCompany?.id),
            ) ?? initialState;
          const selectedCompanyIndex = companies.indexOf(filteredCompany); //get current company index for edit
          companies[selectedCompanyIndex] = {
            ...selectedCompany,
            budget: budget,
          };
          updateLocalStorageCards(companies);
          onDataUpdate();
          setShowBudgetEditModelBox(false);
        }
      }
    } catch (error: any) {
      alert(error);
      console.log(error);
    } finally {
      //release resources or stop loader
    }
  }

  return (
    <Fragment>
      <Modal show={showBudgetEditModelBox} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedCompany?.company_name}{' '}
            <span className="company-edit-link-box">
              <i className="fa fa-pencil label-support-icon" />
              <Link
                key={selectedCompany?.id}
                to={`company/${selectedCompany?.id}/edit`}
                className="col-md-3 company-edit-link"
              >
                Edit Company
              </Link>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-form__group">
            <label htmlFor="cardMonth" className="card-input__label">
              Total budget
            </label>
            <Form.Control
              type="text"
              className="card-input__input"
              autoComplete="off"
              name="budget"
              onChange={handleFormChangeNumbers}
              value={budget}
              isInvalid={!!budgetError}
            />
            <Form.Control.Feedback type="invalid">
              {budgetError}
            </Form.Control.Feedback>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!budget || !!budgetError}
            onClick={handleSubmitAction}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
