'use strict';
module.exports = {
  async up (qi) {
    await qi.bulkInsert('Participants', [
      { userId: 1, roomId: 1, role: 'admin',  createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, roomId: 1, role: 'member', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, roomId: 1, role: 'member', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, roomId: 2, role: 'member', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, roomId: 2, role: 'admin',  createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down (qi) { await qi.bulkDelete('Participants', null); }
};
