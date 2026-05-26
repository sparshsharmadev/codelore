export default async function handler(req, res) {
  try {
    const { default: app } = await import('../server/src/index.js');
    return app(req, res);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to load backend server',
      message: error.message,
      stack: error.stack
    });
  }
}
