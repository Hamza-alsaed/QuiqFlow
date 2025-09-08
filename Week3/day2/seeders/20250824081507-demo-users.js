'use strict';
module.exports = {
  async up (qi) {
    await qi.bulkInsert('Users', [
      { username: 'alice', email: 'alice@example.com', createdAt: new Date(), updatedAt: new Date() },
      { username: 'bob',   email: 'bob@example.com',   createdAt: new Date(), updatedAt: new Date() },
      { username: 'carol', email: 'carol@example.com', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down (qi) { await qi.bulkDelete('Users', null); }
};
