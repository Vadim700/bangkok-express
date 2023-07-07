function sumSalary(salaries) {
  let result = 0;

  for (const [key, value] of Object.entries(salaries)) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      result += value;
    }
  }

  return result;
}
