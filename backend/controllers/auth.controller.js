const axios = require('axios');
const GithubIntegration = require('../models/github-integration.model');
const { verifyGithubTokenCode, getGithubUserInfo } = require('../helpers/github.helper');
const { generateToken } = require('../helpers/jwt.helper');

const getGithubAuthUrl = (req, res) => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=repo,user`;
    res.json({ url: authUrl });
};

const handleGithubAuthCallback = async (req, res) => {
    const { code } = req.query;
    console.log(code);
  
    try {
      const tokenResponse = await  verifyGithubTokenCode({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_REDIRECT_URI
      });
      const { access_token } = tokenResponse;


      const userResponse = await getGithubUserInfo(access_token);
      const { id, login, email } = userResponse;
  
      let user = await GithubIntegration.findOne({ githubId: id });
      if (!user) {
        user = new GithubIntegration({ githubId: id, username: login, email, accessToken: access_token });
      } else {
        user.accessToken = access_token;
      }
      await user.save();
  
      const token = generateToken(user._id);
  
      res.json({ success: true, user, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Authentication failed' });
    }
  };

const getGithubUserStatus = async (req, res) => {
    try {
        console.log(req.userId);
        const user = await GithubIntegration.findById(req.userId);
        if (user) {
          res.json({ connected: true, user });
        } else {
          res.json({ connected: false });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching user status' });
      }
};

const removeGithubIntegration = async (req, res) => {
    try {
        const user = await GithubIntegration.findById(req.userId);
        if (user) {
          user.accessToken = null;
          await user.save();
          res.json({ success: true });
        } else {
          res.status(404).json({ success: false, message: 'User not found' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error removing integration' });
      }
};


module.exports = {
    getGithubAuthUrl,
    handleGithubAuthCallback,
    getGithubUserStatus,
    removeGithubIntegration
}