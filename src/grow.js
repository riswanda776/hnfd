const axios = require('axios');
const moment = require('moment');
require('colors');
require('dotenv').config();
const token = process.env.TOKEN;


async function grow(count) {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const url = 'https://hanafuda-backend-app-520478841386.us-central1.run.app/graphql';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    for (let i = 0; i < count; i++) {
        try {
            // First request - issueGrowAction
            console.log(`[ ${moment().format("HH:mm:ss")} ] Attempt ${i + 1}/${count} - Issuing Grow Action`.cyan);
            const issueResponse = await axios.post(url, {
                query: "mutation issueGrowAction { issueGrowAction }",
                operationName: "issueGrowAction"
            }, { headers });

            console.log(`[ ${moment().format("HH:mm:ss")} ] Issue Response:`.green, 
                issueResponse.data);

            // Add delay between requests
            await delay(5000);

            // Second request - commitGrowAction
            console.log(`[ ${moment().format("HH:mm:ss")} ] Attempting Commit Grow Action`.cyan);
            const commitResponse = await axios.post(url, {
                query: "mutation commitGrowAction { commitGrowAction }",
                operationName: "commitGrowAction"
            }, { headers });

            console.log(`[ ${moment().format("HH:mm:ss")} ] Commit Response:`.green, 
                commitResponse.data);

            // Delay before next iteration
            await delay(3000);

        } catch (error) {
            console.log(
                `[ ${moment().format("HH:mm:ss")} ] Error:`.red,
                error.response?.data || error.message
            );
        }
    }
}

module.exports = {
  grow
}