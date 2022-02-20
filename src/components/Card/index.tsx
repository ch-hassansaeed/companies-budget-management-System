import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Company } from '../../CompanyManager/Company';
import './styles.scss';
interface CardProp {
  company: Company;
}
function Card(props: CardProp) {
  const { company } = props;

  function transformSignDate(date: string): string {
    return date; //ISO 8601
    //return date.split('-').reverse().join('-');//Official EU documents format
  }
  function transformAmountThousandsFormat(amount: number): string {
    return amount.toLocaleString();
  }

  return (
    <div className="d-flex justify-content-center container mt-5">
      <div className="card p-3 bg-white">
        <i className="fa fa-bank"></i>
        <div className="card-item text-center mt-2">
          <img
            src="https://s3-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/619/500/original/aklamio_small_1000x1000.png?1612437958"
            width="200"
          />
          <div>
            <h4>
              <TransitionGroup component="div" className="slide-fade-up">
                {company.company_name
                  .split('')
                  .map((val: string, index: React.Key) => (
                    <CSSTransition
                      timeout={250}
                      classNames="slide-fade-right"
                      key={index}
                    >
                      <span className="card-item__nameItem">{val}</span>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </h4>
            <h6 className="mt-0 text-black-50 mr-5">
              <i className="fa fa-calendar-check-o label-support-icon" />
              <TransitionGroup className="date_of_contract_sign_value" in-out>
                {transformSignDate(company.date_of_contract_sign)
                  .split('')
                  .map((val: string, index: React.Key) => (
                    <CSSTransition
                      timeout={750}
                      classNames="slide-fade-up"
                      key={index}
                    >
                      <span className="card-item__nameItem">{val}</span>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            </h6>
          </div>
        </div>
        <div className="stats mt-2">
          <div className="d-flex justify-content-between p-price">
            <span>
              {' '}
              <i className="fa fa-eur label-support-icon" />
              Total Budget
            </span>
            <TransitionGroup>
              {('€' + transformAmountThousandsFormat(company.budget))
                .toString()
                .split('')
                .map((val: string, index: React.Key) => (
                  <CSSTransition
                    classNames="zoom-in-out"
                    key={index}
                    timeout={250}
                  >
                    <span>{val}</span>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </div>
          <div className="d-flex justify-content-between p-price">
            <span>
              {' '}
              <i className="fa fa-money label-support-icon" />
              Budget Spent
            </span>
            <TransitionGroup>
              {('€' + transformAmountThousandsFormat(company.budget_spent))
                .toString()
                .split('')
                .map((val: string, index: React.Key) => (
                  <CSSTransition
                    classNames="zoom-in-out"
                    key={index}
                    timeout={250}
                  >
                    <span>{val}</span>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </div>
        </div>
        <div className="d-flex justify-content-between total font-weight-bold mt-4">
          <span>
            {' '}
            <i className="fa fa-balance-scale label-support-icon" />
            Budget Left
          </span>
          <TransitionGroup>
            {(
              '€' +
              transformAmountThousandsFormat(
                company.budget - company.budget_spent,
              )
            )
              .toString()
              .split('')
              .map((val: string, index: React.Key) => (
                <CSSTransition
                  classNames="zoom-in-out"
                  key={index}
                  timeout={250}
                >
                  <span>{val}</span>
                </CSSTransition>
              ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}

export default Card;
