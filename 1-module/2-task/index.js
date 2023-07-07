
function print(text) {
  console.log(text);
}

function isValid(name) {
  return ((name !== null) && (name.length >= 4) && (!name.includes(' ')));
}


function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
