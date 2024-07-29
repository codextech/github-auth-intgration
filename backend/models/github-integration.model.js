const mongoose = require('mongoose');

const GithubIntegrationSchema = new mongoose.Schema({
  githubId: String,
  username: String,
  email: String,
  accessToken: String,
  connectedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

GithubIntegrationSchema.index({username:1});

module.exports = mongoose.model('GithubIntegration', GithubIntegrationSchema);