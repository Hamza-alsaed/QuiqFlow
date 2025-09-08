'use strict';
module.exports = {
  async up (qi) {
    await qi.bulkInsert('Rooms', [
      { name: 'general', isPrivate: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'random',  isPrivate: false, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down (qi) { await qi.bulkDelete('Rooms', null); }
};
