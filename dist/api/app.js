"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let swaggerDocument = null;
try {
    const swaggerPath = path_1.default.join(__dirname, '..', '..', 'docs', 'swagger.json');
    if (fs_1.default.existsSync(swaggerPath)) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        swaggerDocument = require(swaggerPath);
    }
    else {
        console.warn(`docs/swagger.json no encontrado en: ${swaggerPath}, /api-docs no estará disponible`);
    }
}
catch (err) {
    console.warn('Error cargando docs/swagger.json, /api-docs no estará disponible', err);
}
const error_handler_1 = require("./middlewares/error-handler");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// Small API info endpoint expected by tests
app.get('/api', (_req, res) => {
    res.json({ success: true, data: { name: 'tourist-guides-api', env: process.env.NODE_ENV || 'development', uptime: process.uptime() } });
});
app.use('/api', routes_1.default);
// Health endpoint para comprobar desde fuera (tests esperan `response.data.success`)
app.get('/api/health', (_req, res) => {
    res.json({ success: true, data: { ok: true, uptime: process.uptime(), env: process.env.NODE_ENV || 'development' } });
});
if (swaggerDocument) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
}
app.use(error_handler_1.errorHandler);
exports.default = app;
