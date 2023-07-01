const path = require('path');

module.exports = {
    mode: 'development',
    entry: 
    {
        main: './src/index.js',
        createCampaigns: './src/createCampaign.js',
        campaign: './src/campaign.js',
        post: './src/post.js',
        createPost: './src/createPost.js',
        utilities: './src/utilities.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};