import express from "express";
import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = jsonServer.router(path.join(__dirname, "data.json"));
const middlewares = jsonServer.defaults();

// Middleware mặc định (logger, static, cors)
app.use(middlewares);
app.use(jsonServer.bodyParser);

// Cho phép CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

// Serve static React build (sau khi npm run build)
app.use(express.static(path.join(__dirname, "dist")));

// Đường dẫn API
app.use("/api", router);

// Fallback cho React Router (SPA)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 App running on http://localhost:${PORT}`);
});
