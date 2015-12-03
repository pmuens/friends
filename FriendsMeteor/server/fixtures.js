if (Friends.find().count() === 0) {
  let friends = [
    { firstName: 'Michael', lastName: 'Moore' },
    { firstName: 'Thomas', lastName: 'Sabo' },
    { firstName: 'Micki', lastName: 'Crows' },
    { firstName: 'Angela', lastName: 'Brown' }
  ];

  friends.forEach((friend) => {
    Friends.insert(friend);
  });
}
