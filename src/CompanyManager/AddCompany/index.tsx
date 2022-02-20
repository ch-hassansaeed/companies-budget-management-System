import React, { Fragment, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import CompanyForm from '../../components/CompanyForm';
import { Company, CompanyInit, updateLocalStorageCards } from '../Company';

const initialState: Company = CompanyInit;

export default function AddCompany() {
  const navigate = useNavigate();
  const [state, setState] = useState<Company>(initialState);

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
      let newCompaniesList: Company[] = [];
      if (localStorage.getItem('companies')) {
        const storageCards = JSON.parse(
          localStorage.getItem('companies') ?? '',
        );
        newCompaniesList = storageCards ? [...storageCards] : [];
      }

      const uuidString =
        Date.now() + (Math.random() * 100000).toFixed().toString();
      const uuidInt = Number(uuidString);

      newCompaniesList.push({
        ...state,
        id: uuidInt,
      });
      updateLocalStorageCards(newCompaniesList);
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
          <CompanyForm
            selectedCompany={state}
            onUpdateState={updateStateValues}
            handleSubmitAction={handleSubmitAction}
          >
            <Card company={state}></Card>
          </CompanyForm>
        </div>
      </div>
    </Fragment>
  );
}
