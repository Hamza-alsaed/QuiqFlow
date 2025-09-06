const models = require('../models'); // sequelize-cli index.js
(async () => {
  const { User, Room, Message, sequelize } = models;
  try {
    await sequelize.authenticate();
    console.log('DB connection OK');

    const users = await User.findAll({ attributes: ['id', 'username', 'email'] });
    console.log('Users:', users.map(u => u.toJSON()));

    const general = await Room.findOne({ where: { name: 'general' } });
    const members = await general.getUsers({ joinTableAttributes: ['role'] });
    console.log('#general members:', members.map(m => ({ id: m.id, username: m.username, role: m.Participant.role })));

    const history = await Message.findAll({
      where: { roomId: general.id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'ASC']]
    });
    console.log('#general history:', history.map(m => ({ by: m.User.username, text: m.content })));

    await sequelize.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
