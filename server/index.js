require("dotenv").config();
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const express = require("express");
const connectDB = require("./config/db.js");
const rateLimit = require("express-rate-limit");
const apiRoutes = require("./routes/apiRoutes.js");
const checkDBConnection = require("./middlewares/checkDBConnection.js");

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(xss());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: "Muitas requisições deste IP, tente novamente mais tarde"
});

app.use(limiter);

(async () => {
    try {
        const db = await connectDB();

        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        app.get("/", (req, res) => {
            res.send("Backend do ERP Soul está funcionando!");
        });

        app.use("/api", checkDBConnection, apiRoutes);

        app.use((req, res, next) => {
            res.status(404).json({ mensagem: "Recurso não encontrado!" });
        });

        app.use((err, req, res, next) => {
            console.error("Erro no servidor:", err);
            res.status(500).json({ mensagem: "Erro interno do servidor" });
        });

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${ PORT }`);
        });

    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    }
})();