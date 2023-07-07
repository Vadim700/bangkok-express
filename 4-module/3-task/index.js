function highlight(table) {
  const tbody = table.children[1];
  const tr = tbody.rows;

  for (let i = 1; i <= tr.length; i++) {
    let tableRow = table.rows[i];

    if (tableRow.cells[3].dataset.available === 'true') {
      tableRow.classList.add('available');
    } else if (tableRow.cells[3].dataset.available === 'false') {
      tableRow.classList.add('unavailable');
    };

    if (!tableRow.cells[3].hasAttribute('data-available')) tableRow.hidden = 'true';

    if (tableRow.cells[2].textContent === 'm') {
      tableRow.classList.add('male');
    } else if (tableRow.cells[2].textContent === 'f') {
      tableRow.classList.add('female');
    };

    if (Number(tableRow.cells[1].textContent) < 18) {
      tableRow.style = "text-decoration: line-through";
    }
  }
}
