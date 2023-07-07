function factorial(a) {
  let result = 1;

  if (a === 0) return result;
  if (a < 0) return `Аргументом функции факториал может быть только натуральное число или ноль`;

  for (let i = 1; i <= a; i++) {
    result *= i;
  }

  return result;
}

