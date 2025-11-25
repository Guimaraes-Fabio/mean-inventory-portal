const fs = require('fs');
const path = require('path')
const privateKEY = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');
const publicKEY = fs.readFileSync(path.join(__dirname, 'public.key'), 'utf8');

module.exports = {
    privateKEY,
    publicKEY
}