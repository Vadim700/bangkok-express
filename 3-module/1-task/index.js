function namify(users) {
  return users
    .filter(user => Boolean(user))
    .map(user => user.name);
}
