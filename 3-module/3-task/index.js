function camelize(str) {
  const result = str.split('-');

  return (
    result.map((value, key) => key === 0
      ? value
      : value[0].toUpperCase() + value.slice(1))
      .join('')
  );
}
