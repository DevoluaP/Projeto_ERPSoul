const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

exports.encrypt = async (password) => {
    try {
        const saltPass = await bcrypt.genSalt(10);
        const cryptPass = await bcrypt.hash(password, saltPass);

        const apiKey = process.env.API_KEY;
        const saltHash = await bcrypt.genSalt(10);
        const cryptHash = await bcrypt.hash(apiKey, saltHash);

        return { cryptPass, cryptHash };
    } catch (error) {
        console.error("Erro ao criptografar dados:", error);
        throw error;
    }
}