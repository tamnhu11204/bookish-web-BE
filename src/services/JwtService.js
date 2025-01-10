const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccessToken = (payload) => {
    const access_token = jwt.sign(
        {
            ...payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "30s" }
    );

    return access_token;
};

const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign(
        {
            ...payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "365d" }
    );

    return refresh_token;
};

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    return reject({
                        status: 'ERROR',
                        message: 'Authentication failed! Invalid refresh token.'
                    });
                }

                const access_token = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                });

                //console.log('Access token:', access_token);

                resolve({
                    status: 'OK',
                    message: 'Success',
                    access_token
                });
            });

        } catch (e) {
            reject({
                status: 'ERROR',
                message: 'An error occurred while generating the new access token.',
                error: e.message
            });
        }
    });
}

module.exports = {
    generalAccessToken, generalRefreshToken, refreshTokenJwtService
}