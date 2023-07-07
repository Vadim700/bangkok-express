function makeFriendsList(friends) {
  const ul = document.createElement('ul');

  const li = friends.map(item => `<li>${item.firstName} ${item.lastName}</li>`).join('');

  ul.innerHTML = li;

  return ul;
}
