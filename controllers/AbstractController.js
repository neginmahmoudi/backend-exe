class AbstractController {
    static async handleRequest(req, res, callback) {
      try {
        const result = await callback(req);
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
  
  module.exports = AbstractController;
  