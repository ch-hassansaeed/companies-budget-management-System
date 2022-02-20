import { isTotalBudgetInRange } from '../Company';
describe('isTotalBudgetInRange: Verify that Total Budget Always bigger than Spent budget', () => {
  test.only('verify for input a valid case', () => {
    const verifyResult = isTotalBudgetInRange(1000, 500);
    expect(verifyResult).toEqual(true);
  });
  test.only('verify for input a valid case', () => {
    const verifyResult = isTotalBudgetInRange(5000, 4500);
    expect(verifyResult).toEqual(true);
  });

  test.only('verify for input a valid case when all budget spent from total amount', () => {
    const verifyResult = isTotalBudgetInRange(5000, 5000);
    expect(verifyResult).toEqual(true);
  });

  test.only('verify for input a invalid case to exceed the spend limit from total budget', () => {
    const verifyResult = isTotalBudgetInRange(5000, 8500);
    expect(verifyResult).toEqual(false);
  });

  test.only('verify for input a invalid case to exceed the spend limit from total budget', () => {
    const verifyResult = isTotalBudgetInRange(9000, 10500);
    expect(verifyResult).toEqual(false);
  });
});
