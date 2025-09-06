'use strict';
module.exports = {
  async up (qi) {
    await qi.bulkInsert('Messages', [
      { content: 'Welcome to #general!', userId: 1, roomId: 1, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Hello everyone 👋',    userId: 2, roomId: 1, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Random thoughts…',     userId: 2, roomId: 2, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Coffee break?',        userId: 3, roomId: 1, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down (qi) { await qi.bulkDelete('Messages', null); }
};
