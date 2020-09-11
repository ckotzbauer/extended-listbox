const saucie = require('saucie');

const opts = {
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    verbose: true,
    logger: console.log
};

saucie.connect(opts).then(() => {
    process.exit();
});
