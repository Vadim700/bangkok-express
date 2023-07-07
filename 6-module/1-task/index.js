/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
  }

  render() {
    const element = document.createElement('tbody');
    element.innerHTML = this.template();

    element.addEventListener("click", this.onCloseClick);
    return element;
  }

  template() {
    return (
      this.rows.map(item => {
        return (
          `<tr>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.salary}</td>
            <td>${item.city}</td>
            <td><button>X</button></td>
          </tr>`);
      }).join('\n')
    );
  }

  onCloseClick = (event) => event.target.closest('tr').remove();
}
