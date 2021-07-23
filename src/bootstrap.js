const { constants } = require('fs');
const fs = require('fs/promises');
const config = require('./config');

const bootstrap = async () => {
    // Create upload directory first if doesn't exist
    try {
        
        await fs.access(config.uploadPath, constants.F_OK | constants.R_OK | constants.W_OK);
    } catch {
        try {
            await fs.mkdir(config.uploadPath, { recursive: true });
        } catch (e) {
            if (e.code !== 'EEXIST') {
                console.error('Failed to create uploads directory!');
                process.exit(1);
            }    
        }
    }
};

module.exports = bootstrap;
