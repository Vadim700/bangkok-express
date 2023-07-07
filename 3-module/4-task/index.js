function showSalary(users, age) {
  return (
    users
      .filter(item => item.age <= age)
      .map(item => `${item.name}, ${item.balance}`)
      .join('\n')
      .trim()
  );
}
