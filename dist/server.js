"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// console.log('hainppffefe')
const user_routes_1 = require("./routes/user.routes");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const mongoose_1 = __importDefault(require("./config/mongoose"));
(0, mongoose_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
}));
const express_session_1 = __importDefault(require("express-session"));
app.use((0, express_session_1.default)({
    name: "fildmate",
    resave: true,
    saveUninitialized: true,
    secret: 'djfksfiddfi'
}));
app.use((req, res, next) => {
    res.set("Cahe-Control", "no-store");
    next();
});
const path_1 = __importDefault(require("path"));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, './uploads')));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const admin_routes_1 = require("./routes/admin.routes");
const turf_routes_1 = require("./routes/turf.routes");
const error_handler_1 = __importDefault(require("./error/error.handler"));
// import { user } from './routes/user.routes'
app.use((0, cookie_parser_1.default)());
// app.use('/',userRouter)
app.use('/', user_routes_1.user);
app.use('/admin', admin_routes_1.admin);
app.use('/turf', turf_routes_1.turf);
app.use(error_handler_1.default);
// app.get('/helo',(req, res)=>{
//     console.log('helow')
// })
app.listen(9000, () => { console.log('server started'); });
