// USE Vanilla JS to implement checkbox logic

const MINOR_CHECKBOX_CLASS = 'minor-checkbox';
const MAX_CHECKBOXES_LEN = 100;
let app = document.getElementById('app');

const resetApp = (container = app) => {
  container.innerHTML = '';
};

const wrapWithTable = (container, id = 'googleCheckboxes') =>
  `<table id=${id}>${container}</table>`;

const markMinors = (status, className) => {
  [...document.getElementsByClassName(className)].forEach(checbox => {
    checbox.checked = status;
  });
};

const generateMajorCheckbox = (container, minorSelector) => {
  const checkBoxId = 'majorCheckbox';

  let majorCheckbox = `
    <tr>
      <th style="font-weight: bold; padding: 10px;">
        <input id="majorCheckbox" type="checkbox">
      </th>
      <th>
        <label>Topic</label>
      </th>
    <tr>
  `;

  return majorCheckbox + container;
};

const generateCheckboxes = (container, checkboxClass, rows = 15) => {
  let generatedCheckboxStr = [...Array(rows).keys()].reduce(
    (accum, row) =>
      (accum += `<tr style="text-align: center;">
          <td style="font-weight: bold; padding: 10px;">
            <input class="${checkboxClass}" type="checkbox" id="checkbox${row}">
          </td>
          <td>
            <label>Minor checkbox #${row + 1}</label>
          </td>
        </tr>
    `),
    ''
  );

  generatedCheckboxStr = generateMajorCheckbox(generatedCheckboxStr);
  container.innerHTML += wrapWithTable(generatedCheckboxStr);

  return generatedCheckboxStr;
};

const getAllCheckboxes = nRows => [
  ...document.querySelectorAll('input[type="checkbox"]')
];

const initApp = nRows => {
  let input = document.getElementById('rowValue');
  input.value = nRows;

  generateCheckboxes(app, MINOR_CHECKBOX_CLASS, nRows);

  let majorCheckbox = getAllCheckboxes()[0];
  majorCheckbox.addEventListener('click', event => {
    markMinors(event.target.checked, MINOR_CHECKBOX_CLASS);
  });

  // attach event listeners for minor checkboxes
  app.addEventListener('click', event => {
    const allCheckboxes = getAllCheckboxes();
    majorCheckbox = allCheckboxes[0];
    const markedCheckboxes = allCheckboxes
      .slice(1)
      .filter(checkbox => checkbox.checked === true);
    const nAll = allCheckboxes.length - 1;
    const nMarked = markedCheckboxes.length;
    const isMajorTarget = event.target === majorCheckbox;

    if (!isMajorTarget) {
      const areAllMinorsMarked = nAll - nMarked === 0;
      if (areAllMinorsMarked) {
        majorCheckbox.checked = true;
      } else {
        majorCheckbox.checked = false;
      }
    }
  });
};

initApp(10);

let rowInput = document.getElementById('rowValue');

rowInput.addEventListener('input', event => {
  let {
    target: { value: inputValue }
  } = event;
  let numberValue = Number(inputValue);

  console.log({ numberValue, MAX_CHECKBOXES_LEN });
  if (numberValue !== NaN && numberValue >= MAX_CHECKBOXES_LEN) {
    rowInput.value = MAX_CHECKBOXES_LEN;
  }
});

rowInput.addEventListener('input', event => {
  let nRows = Number(event.target.value);

  if (nRows && nRows !== NaN) {
    resetApp(app);
    initApp(nRows);
  }
});
