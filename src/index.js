require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const fs = require("fs");
const Parser = require("rss-parser");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

let items = []; // Declare items outside the main function

(async function main() {
    // Make a new RSS Parser
    const parser = new Parser();

    // Get all the items in the RSS feed
    const feed = await parser.parseURL("https://www.couponseagle.com/feed/");

    // Clean up the string and replace reserved characters
    const fileName = `${feed.title.replace(/\s+/g, "-").replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`;

    if (fs.existsSync(fileName)) {
        items = require(`./${fileName}`);
    }

    // Add the items to the items array
    await Promise.all(feed.items.map(async (currentItem) => {
        if (items.filter((item) => isEquivalent(item, currentItem)).length <= 0) {
            items.push(currentItem);
        }
    }));

    // Save the file
    fs.writeFileSync(fileName, JSON.stringify(items));

    client.login(process.env.TOKEN);
})();

function isEquivalent(a, b) {
    // Create arrays of property names
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    // if the number of properties is different, objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        // if values of the same property are not equal, objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects are considered equivalent
    return true;
}

client.on('ready', async () => {
    const channel = client.channels.cache.get('1169670948685893795'); // Replace with your channel ID
    if (channel) {
        channel.send(`🤡 ${client.user.tag} is ready, nerds!`) &&
            console.log(`🤡 ${client.user.tag} is ready, nerds!`);;
    }

    // Function to fetch and post RSS updates
    async function fetchAndPostRSSUpdates() {
        const channel = client.channels.cache.get('1169670948685893795'); // Replace with your channel ID
        if (!channel) {
            console.error('Channel not found.');
            return;
        }

        const parser = new Parser();
        const rssFeedURL = 'https://www.couponseagle.com/feed'; // Replace with your RSS feed URL

        try {
            const feed = await parser.parseURL(rssFeedURL);

            for (const item of feed.items) {
                // Check if the item already exists in your items array to avoid duplicates
                if (!items.some((existingItem) => isEquivalent(existingItem, item))) {
                    // Post the RSS update to the channel
                    channel.send(item.title + ' ' + item.link);
                    // Add the item to your items array to track it
                    items.push(item);
                }
            }
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }
    }

    // Start the periodic RSS update process (every hour)
    const updateIntervalInMilliseconds = 60 * 60 * 1000; // 1 hour in milliseconds
    setInterval(fetchAndPostRSSUpdates, updateIntervalInMilliseconds);
});
