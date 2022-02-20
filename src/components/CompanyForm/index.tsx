import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  Company,
  CompanyErrorsValidation,
  isTotalBudgetInRange,
} from '../../CompanyManager/Company';

interface CompanyFormProps {
  selectedCompany: Company;
  onUpdateState: (keyName: any, value: any) => void;
  handleSubmitAction: () => void;
  children: JSX.Element;
}
export default function CompanyForm(props: CompanyFormProps) {
  const { selectedCompany, onUpdateState, handleSubmitAction, children } =
    props;
  const companyErrorsInit: CompanyErrorsValidation = {
    id: '',
    company_name: '',
    budget: '',
    budget_spent: '',
    date_of_contract_sign: '',
  };
  const [errors, setErrors] =
    useState<CompanyErrorsValidation>(companyErrorsInit);

  const handleFormChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;

    onUpdateState(name, value);
  };

  const handleFormChangeNumbers = (event: {
    target: { value: string; name: string };
  }) => {
    const { name, value } = event.target;
    if (isNaN(Number(value))) return; //only accept numbers
    onUpdateState(name, Number(value));
  };

  const handleConfirmAction = () => {
    if (!selectedCompany.company_name) onUpdateState('company_name', ''); //hack:update parent state for rerender this component to show invalid feedback errors
    // validate errors
    if (!isFormHasErrors()) {
      handleSubmitAction();
    }
  };
  const isFormHasErrors = () => {
    const newErrors: CompanyErrorsValidation = {
      id: '',
      company_name: '',
      budget: '',
      budget_spent: '',
      date_of_contract_sign: '',
    };
    //first validate blank fields
    let isErrorFlag = false;
    Object.keys(newErrors).forEach(function (key: any) {
      const keyPair = key as keyof Company;
      const displayableKeyName = key.toLowerCase().replaceAll('_', ' ');
      if (!selectedCompany[keyPair]) {
        newErrors[keyPair] = `${displayableKeyName} value required.`;
        isErrorFlag = true;
      } else {
        newErrors[keyPair] = '';
        isErrorFlag = false;
      }
    });
    if (isErrorFlag) {
      setErrors(newErrors);
      return isErrorFlag;
    }
    //if no blank field then check other validation
    if (
      !isTotalBudgetInRange(
        selectedCompany.budget,
        selectedCompany.budget_spent,
      )
    ) {
      newErrors.budget = 'Company budget should be greater than spent budget';
      isErrorFlag = true;
    }
    setErrors(newErrors);
    return isErrorFlag;
  };

  return (
    <div className="card-form">
      <div className="card-list">{children}</div>
      <div className="card-form__inner">
        <div className="card-input">
          <label htmlFor="company_name" className="card-input__label">
            Company Name
          </label>
          <Form.Control
            type="text"
            className="card-input__input"
            autoComplete="off"
            name="company_name"
            onChange={handleFormChange}
            value={selectedCompany.company_name}
            isInvalid={!!errors.company_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.company_name}
          </Form.Control.Feedback>
        </div>
        <div className="card-input">
          <label htmlFor="date_of_contract_sign" className="card-input__label">
            Date Of Contract Sign
          </label>
          <Form.Control
            type="date"
            className="card-input__input"
            autoComplete="off"
            name="date_of_contract_sign"
            onChange={handleFormChange}
            value={selectedCompany.date_of_contract_sign}
            isInvalid={!!errors.date_of_contract_sign}
          />
          <Form.Control.Feedback type="invalid">
            {errors.date_of_contract_sign}
          </Form.Control.Feedback>
        </div>

        <div className="card-form__row">
          <div className="card-form__col -cvv">
            <div className="card-input">
              <label htmlFor="budget_spent" className="card-input__label">
                budget spent
              </label>
              <Form.Control
                type="text"
                className="card-input__input"
                autoComplete="off"
                name="budget_spent"
                onChange={handleFormChangeNumbers}
                value={selectedCompany.budget_spent}
                isInvalid={!!errors.budget_spent}
              />
              <Form.Control.Feedback type="invalid">
                {errors.budget_spent}
              </Form.Control.Feedback>
            </div>
          </div>
          <div className="card-form__col">
            <div className="card-form__group">
              <label htmlFor="budget" className="card-input__label">
                Total budget
              </label>
              <Form.Control
                type="text"
                className="card-input__input"
                autoComplete="off"
                name="budget"
                onChange={handleFormChangeNumbers}
                value={selectedCompany.budget}
                isInvalid={!!errors.budget}
              />
              <Form.Control.Feedback type="invalid">
                {errors.budget}
              </Form.Control.Feedback>
            </div>
          </div>
        </div>
        <div className="card-form__row">
          <div className="card-form__col">
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" onClick={handleConfirmAction}>
                Confirm
              </Button>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
