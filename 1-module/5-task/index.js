function truncate(str, maxlength) {
  return (str.length > maxlength)
    ? str.substring(maxlength - 1, str.at(-1)) + "…"
    : str;
}
