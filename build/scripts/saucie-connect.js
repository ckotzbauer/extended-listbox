const saucie = require('saucie');

const opts = {
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    verbose: true,
    logger: console.log,
    pidfile: "saucie.pid",
    tunnelIdentifier: Math.floor(Math.random() * 100)
};

saucie.connect(opts).then(() => {
    process.exit();
});
