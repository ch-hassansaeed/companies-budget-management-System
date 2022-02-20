export interface Company {
  id: number;
  company_name: string;
  budget: number;
  budget_spent: number;
  date_of_contract_sign: string;
}
export const CompanyInit: Company = {
  id: 0,
  company_name: '',
  budget: 0,
  budget_spent: 0,
  date_of_contract_sign: '',
};
export interface CompanyErrorsValidation {
  id: string;
  company_name: string;
  budget: string;
  budget_spent: string;
  date_of_contract_sign: string;
}
//Data Layer
export class CompanyAPI {
  async fetchCompanyList(): Promise<Company[]> {
    const apiData: Company[] = [
      {
        id: 1245,
        company_name: 'Tesla',
        budget: 125000.0,
        budget_spent: 62000.0,
        date_of_contract_sign: '2021-01-04',
      },
      {
        id: 1246,
        company_name: 'Apple',
        budget: 110000.0,
        budget_spent: 32000.0,
        date_of_contract_sign: '2021-03-05',
      },
    ];
    let CompaniesList: Company[] = [];
    //first check local storage if local storage is empty then add api mock data as seed
    if (localStorage.getItem('companies')) {
      const localStorageData: Company[] = JSON.parse(
        localStorage.getItem('companies') ?? '',
      );
      CompaniesList = [...localStorageData];
    } else {
      CompaniesList = [...apiData];
      updateLocalStorageCards(CompaniesList);
    }

    return CompaniesList;
    //TODO:integrate API module when got API from backend team :)
    /*
    private readonly api = new Api();//it will have all Restful verbs functions
    return axios.get(`ENDPOINT_GOES_HERE`)
    .then((res: { data: any; }) => {
      return res.data;
    });
    */
  }
} //CompanyAPI Class End

//Business Layer
export async function fetchCompanyList(): Promise<Company[]> {
  const api = new CompanyAPI();
  return api.fetchCompanyList();
}
export function updateLocalStorageCards(companies: Company[]) {
  localStorage.setItem('companies', JSON.stringify(companies));
}
export function isTotalBudgetInRange(
  budget: number,
  budget_spent: number,
): boolean {
  return Number(+budget) >= Number(+budget_spent);
}
