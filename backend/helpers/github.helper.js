
const axios = require('axios');

const verifyGithubTokenCode = async (payload) => {
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', payload, {
        headers: { 'Accept': 'application/json' }
    });
    console.log(' >>tokenResponse ', tokenResponse.data);
    return tokenResponse.data;
}


const getGithubUserInfo = async (access_token) => {
    const userResponse = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `token ${access_token}` }
      });
      console.log(userResponse.data);
    return userResponse.data;
}


module.exports = {
    verifyGithubTokenCode,
    getGithubUserInfo
}