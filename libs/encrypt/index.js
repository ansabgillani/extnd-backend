import bcrypt from 'bcryptjs';

const saltRounds = 10;

function encrypt(data = 'dummy') {
    return new Promise((resolve, reject) => {
        bcrypt.hash(data, saltRounds, (err, hash) => {
            if (!err) {
                resolve(hash);
            }
            reject(err);
        });
    });
}

function compare(data, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(data, hash, (err, res) => {
            if (!err) {
                resolve(res);
            }
            reject(err);
        });
    });
}

export default { encrypt, compare };
