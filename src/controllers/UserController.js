const UserService = require("../services/UserService");

exports.login = async (req, res) => {
  try {
    const result = await UserService.login(req.body);
    [400].includes(result.status) ? 
      res.status(result.status).send(result.res) : 
      res.status(result.status).json(result.res)
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.register = async (req, res) => {
  try {
    const result = await UserService.register(req.body);
    [400,409].includes(result.status) ? 
      res.status(result.status).send(result.res) : 
      res.status(result.status).json(result.res)
  } catch (error) {
    res.status(500).json({ error: error });
  }
};