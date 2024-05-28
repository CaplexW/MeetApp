import jsonwebtoken from "jsonwebtoken";
import config from "config";
import Token from "../models/Token.js";

class TokenService {
    generate(payload) {
        const accessToken = jsonwebtoken.sign(payload, config.get('accessPrivateKey', { expiresIn: '1h' }));
        const refreshToken = jsonwebtoken.sign(payload, config.get('refreshPrivateKey'));

        return { accessToken, refreshToken, expiresIn: 3600 };
    };
    async save(userId, refreshToken) {
        const data = await Token.findOne({ user: userId });

        if (data) {
            data.refreshToken = refreshToken;
            return data.save();
        }
        return await Token.create({ user: userId, refreshToken });
    };
    async findToken(refreshToken) {
        try{
            return await Token.findOne({ refreshToken });
        } catch (e) {
            return null;
        }
    };
    validateRefresh(refreshToken) {
      try {
        return jsonwebtoken.verify(refreshToken, config.get('refreshPrivateKey'));
      } catch (e) {
          return null;
      }
    };
    validateAccess(accessToken) {
        try {
            return jsonwebtoken.verify(accessToken, config.get('accessPrivateKey'));
        } catch (e) {
            return null;
        }
    };
}

export default new TokenService();