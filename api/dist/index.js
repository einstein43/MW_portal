"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware for parsing JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Express TypeScript API' });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map