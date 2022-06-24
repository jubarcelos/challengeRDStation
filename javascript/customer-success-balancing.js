/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */

 function checkActiveEmployees(customerSuccess, customerSuccessAway) {
  if (customerSuccessAway && customerSuccessAway !== []) {
    const activeEmployees = customerSuccess.filter((employee) => {
      return customerSuccessAway.every((awayEmployee) => awayEmployee !== employee.id);
    })
    return activeEmployees;
  };
  return customerSuccess;
}

function customerSuccessAbstation(customerSuccess) {
  const customerSuccessQuantityEmployees = customerSuccess.length;
  const TWO = 2;
  return Math.floor(customerSuccessQuantityEmployees / TWO);
}

function sortCrescentScore(data) {
  return data.sort((a, b) => a.score - b.score);
}

function findCustomerRepeatedScore(customerSuccess,
  customers,
  customerSuccessAway) {
  const activeEmployees = checkActiveEmployees(customerSuccess, customerSuccessAway);

  const sortedActiveCustomerSuccess = sortCrescentScore(activeEmployees);
  const sortedCustomers = sortCrescentScore(customers);

  const sameScoreCounted = {};
  // model of { score: counted}

  for (let index = 0; index < sortedCustomers.length; index++) {
    const customerCurrent = sortedCustomers[index];
    if (sameScoreCounted[customerCurrent.score]) {
      sameScoreCounted[customerCurrent.score] += 1;
    } else {
      sameScoreCounted[customerCurrent.score] = 1;
    }
  }
  const scoreAndRepetitionsArray = Object.entries(sameScoreCounted);
  // model of [score, counted]
  return scoreAndRepetitionsArray;
}

function createCounterClients(customerSuccess,
  customers,
  customerSuccessAway) {
  const activeEmployees = checkActiveEmployees(customerSuccess, customerSuccessAway);
  const sortedActiveCustomerSuccess = sortCrescentScore(activeEmployees);
  const sameScoresCounted = findCustomerRepeatedScore(customerSuccess, customers, customerSuccessAway);

  const result = sortedActiveCustomerSuccess.map((employee, index) => {
    const selectEmployee = sameScoresCounted.map((scoreCounted) => {
      const beforeEmployee = sortedActiveCustomerSuccess[index - 1];

      const score = scoreCounted[0];
      const repetition = scoreCounted[1];

      if (beforeEmployee) {
        if (score <= employee.score && score > beforeEmployee.score)
          return repetition;
      } else if (score <= employee.score) {
        return repetition;
      }
      return 0;

    });
    const sumOfEmployeeClients = selectEmployee.reduce((previous, current) => previous + current, 0);
    return { id: employee.id, numberClients: sumOfEmployeeClients }
  });

  return result;
}

function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  if (customerSuccessAway && customerSuccessAway.length > 0) {
    const customerSuccessQuantityAway = customerSuccessAway.length;
    if (customerSuccessAbstation(customerSuccess) < customerSuccessQuantityAway) {
      throw new Error('The number of employees away is too big');
    }
  }
  const ZERO = 0;
  const countedCustomerSuccessClients = createCounterClients(customerSuccess, customers, customerSuccessAway);
  const sortNumberOfClients = countedCustomerSuccessClients.sort((a, b) => a.numberClients - b.numberClients)

  const last = sortNumberOfClients.length - 1;
  const lastButOne = sortNumberOfClients.length - 2;
  if (sortNumberOfClients[last].numberClients === sortNumberOfClients[lastButOne].numberClients) {
    return ZERO;
  }
  return sortNumberOfClients[last].id;
}

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt) {
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${ testTimeoutInMs }ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

