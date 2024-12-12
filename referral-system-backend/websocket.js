const { WebSocketServer } = require('ws');

const userConnections = new Map();
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws, request) => {
  const userId = request.url.split('?userId=')[1];
  if (!userId) return ws.close();

  userConnections.set(userId, ws);
  console.log(`User connected: ${userId}`);

  ws.on('close', () => {
    userConnections.delete(userId);
    console.log(`User disconnected: ${userId}`);
  });
});

module.exports = { wss, userConnections };
