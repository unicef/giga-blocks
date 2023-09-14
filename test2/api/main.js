/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@fastify/helmet");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(1);
const bull_1 = __webpack_require__(6);
const config_1 = __webpack_require__(7);
const auth_module_1 = __webpack_require__(8);
const prisma_module_1 = __webpack_require__(43);
const mailer_module_1 = __webpack_require__(38);
const schools_module_1 = __webpack_require__(44);
const users_module_1 = __webpack_require__(51);
const contribute_module_1 = __webpack_require__(56);
const seasons_module_1 = __webpack_require__(62);
const points_module_1 = __webpack_require__(66);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            bull_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    redis: {
                        host: configService.get('REDIS_HOST'),
                        port: +configService.get('REDIS_PORT'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            mailer_module_1.MailModule,
            schools_module_1.SchoolModule,
            users_module_1.UsersModule,
            contribute_module_1.ContributeDataModule,
            seasons_module_1.SeasonModule,
            points_module_1.PointsModule,
        ],
        providers: [],
    })
], AppModule);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/bull");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(9);
const auth_controller_1 = __webpack_require__(10);
const auth_service_1 = __webpack_require__(12);
const users_service_1 = __webpack_require__(18);
const strategies_1 = __webpack_require__(32);
const mailer_module_1 = __webpack_require__(38);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_module_1.MailModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: { expiresIn: +process.env.JWT_EXPIRATION_TIME },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, users_service_1.UsersService, strategies_1.LocalStrategy, strategies_1.JWTStrategy, strategies_1.RefreshJWTStrategy],
    })
], AuthModule);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(1);
const otplib_1 = __webpack_require__(11);
const auth_service_1 = __webpack_require__(12);
const dto_1 = __webpack_require__(22);
const swagger_1 = __webpack_require__(24);
const user_dto_1 = __webpack_require__(26);
const local_auth_guard_1 = __webpack_require__(28);
const public_decorator_1 = __webpack_require__(30);
const refresh_auth_guard_1 = __webpack_require__(31);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        otplib_1.totp.options = {
            step: +process.env.OTP_DURATION_IN_SECS,
        };
    }
    async login(req) {
        return await this.authService.login(req.user);
    }
    register(createUserDto) {
        return this.authService.register(createUserDto);
    }
    async sendOtp(AuthDto) {
        return this.authService.sendOtp(AuthDto);
    }
    async refresh(req, RefreshToken) {
        return this.authService.refreshToken(req.user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('send-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof dto_1.AuthSendOtp !== "undefined" && dto_1.AuthSendOtp) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "sendOtp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(refresh_auth_guard_1.RefreshJWTGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_g = typeof dto_1.RefreshToken !== "undefined" && dto_1.RefreshToken) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("otplib");

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(9);
const otplib_1 = __webpack_require__(11);
const mailer_service_1 = __webpack_require__(13);
const users_service_1 = __webpack_require__(18);
let AuthService = class AuthService {
    constructor(jwtService, userService, mailService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.mailService = mailService;
        this._logger = new common_1.Logger('Auth Service');
    }
    async validateUser(email, otp) {
        const user = await this.userService.findOneByEmail(email);
        if (user && user?.isActive && otplib_1.totp.verify({ token: otp, secret: process.env.OTP_SECRET })) {
            return user;
        }
        throw new common_1.NotFoundException('User not found');
    }
    async register(createUserDto) {
        const user = await this.userService.register(createUserDto);
        if (user) {
            this.mailService.welcome({ email: user?.email, name: user?.name });
            return { success: true, msg: 'User created successfully' };
        }
        throw new common_1.BadRequestException('Bad Request');
    }
    async sendOtp(AuthDto) {
        this._logger.log(`Sending Login OTP to ${AuthDto?.email}`);
        const { email } = AuthDto;
        const user = await this.userService.findOneByEmail(email);
        if (user && user?.isActive) {
            this._logger.log(`Generating Login OTP to ${AuthDto?.email}`);
            const token = otplib_1.totp.generate(process.env.OTP_SECRET);
            if (token) {
                this.mailService.sendOTP({ email: user?.email, otp: token });
                return { success: true, msg: 'OTP sent successfully' };
            }
        }
        throw new common_1.NotFoundException('User not found');
    }
    async login(user) {
        this._logger.log(`Sending tokens to ${user?.email}`);
        const payload = {
            id: user.id,
            sub: {
                email: user.email,
                name: user.name,
                walletAddress: user.walletAddress,
                roles: user.roles,
            },
        };
        return {
            ...user,
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, {
                expiresIn: +process.env.JWT_EXPIRATION_LONG_TIME,
            }),
        };
    }
    async refreshToken(user) {
        this._logger.log(`Generating access token to ${user?.email}`);
        const payload = {
            id: user.id,
            sub: {
                email: user.email,
                name: user.name,
                walletAddress: user.walletAddress,
                roles: user.roles,
            },
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof mailer_service_1.MailService !== "undefined" && mailer_service_1.MailService) === "function" ? _c : Object])
], AuthService);


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MailService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailService = void 0;
const common_1 = __webpack_require__(1);
const constants_1 = __webpack_require__(14);
const bull_1 = __webpack_require__(16);
const bull_2 = __webpack_require__(6);
const bullOptions_1 = __webpack_require__(17);
let MailService = MailService_1 = class MailService {
    constructor(_mailQueue) {
        this._mailQueue = _mailQueue;
        this._logger = new common_1.Logger(MailService_1.name);
    }
    async sendOTP({ email, otp }) {
        try {
            await this._mailQueue.add(constants_1.SENT_OTP, {
                email,
                otp,
            }, bullOptions_1.jobOptions);
        }
        catch (error) {
            this._logger.error(`Error queueing registration email to user ${email}`);
            throw error;
        }
    }
    async welcome({ name, email }) {
        try {
            await this._mailQueue.add(constants_1.WELCOME_MSG, {
                name,
                email,
            }, bullOptions_1.jobOptions);
        }
        catch (error) {
            this._logger.error(`Error queueing registration email to user ${email}`);
            throw error;
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_2.InjectQueue)(constants_1.MAIL_QUEUE)),
    __metadata("design:paramtypes", [typeof (_a = typeof bull_1.Queue !== "undefined" && bull_1.Queue) === "function" ? _a : Object])
], MailService);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(15), exports);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WELCOME_MSG = exports.SENT_OTP = exports.MAIL_QUEUE = void 0;
exports.MAIL_QUEUE = 'MAIL_QUEUE';
exports.SENT_OTP = 'SENT_OTP';
exports.WELCOME_MSG = 'WELCOME_MSG';


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("bull");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jobOptions = void 0;
exports.jobOptions = {
    attempts: 3,
    removeOnComplete: 20,
    backoff: {
        type: 'exponential',
        delay: 1000,
    },
};


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(1);
const prisma_service_1 = __webpack_require__(19);
const string_format_1 = __webpack_require__(21);
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
        this._logger = new common_1.Logger('User Services');
    }
    async register(createUserDto) {
        this._logger.log(`Registering new user: ${createUserDto?.email}`);
        const walletAddress = (0, string_format_1.hexStringToBuffer)(createUserDto?.walletAddress);
        return this.prisma.user.create({
            data: {
                ...createUserDto,
                walletAddress,
            },
        });
    }
    async addValidator(createUserDto) {
        this._logger.log(`Creating new user: ${createUserDto?.email}`);
        const walletAddress = (0, string_format_1.hexStringToBuffer)(createUserDto?.walletAddress);
        return this.prisma.user.create({
            data: {
                ...createUserDto,
                walletAddress,
                roles: ['VALIDATOR'],
            },
        });
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        this._logger.log(`Updating user: ${id}`);
        return `This action updates a #${id} user with payload ${updateUserDto}`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async findOneByEmail(email) {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }
    async requestValidator(createUserDto) {
        return await this.prisma.user.create({
            data: {
                email: createUserDto?.email,
                roles: ['PENDING'],
                name: createUserDto?.name,
            },
        });
    }
    async approveValidator(id) {
        return await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                roles: ['VALIDATOR'],
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], UsersService);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(1);
const client_1 = __webpack_require__(20);
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.APP_DATABASE_URL,
                },
            },
        });
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async cleanDatabase() {
        if (process.env.NODE_ENV === 'production')
            return;
        return Promise.all([this.user.deleteMany()]);
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringifyWithBigInt = exports.bufferToHexString = exports.hexStringToBuffer = exports.replaceWith = void 0;
function replaceWith(str, replaceWith) {
    return str
        .trim()
        .toUpperCase()
        .replace(/[-\s]+/g, replaceWith);
}
exports.replaceWith = replaceWith;
function hexStringToBuffer(str) {
    if (!str)
        return;
    return Buffer.from(str.substring(2), 'hex');
}
exports.hexStringToBuffer = hexStringToBuffer;
function bufferToHexString(buffer) {
    if (!buffer)
        return;
    return `0x${buffer.toString('hex')}`;
}
exports.bufferToHexString = bufferToHexString;
const stringifyWithBigInt = (obj) => {
    const jsonString = JSON.stringify(obj, (_, value) => {
        if (typeof value === 'bigint') {
            return value.toString();
        }
        return value;
    });
    return JSON.parse(jsonString);
};
exports.stringifyWithBigInt = stringifyWithBigInt;


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshToken = exports.AuthSendOtp = exports.AuthDto = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
class AuthDto {
}
exports.AuthDto = AuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'email@email.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthDto.prototype, "otp", void 0);
class AuthSendOtp {
}
exports.AuthSendOtp = AuthSendOtp;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'email@email.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthSendOtp.prototype, "email", void 0);
class RefreshToken {
}
exports.RefreshToken = RefreshToken;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'dnsfb6829uhfjhbeiwy89ufgo',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshToken.prototype, "refresh_token", void 0);


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = exports.CreateUserDto = void 0;
const mapped_types_1 = __webpack_require__(27);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'Email of the user',
        example: 'john@doe.com',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Full Name of the user',
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEthereumAddress)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Ethereum wallet address of the user',
        example: '0xC67c60cD6d82Fcb2fC6a9a58eA62F80443E32683',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "walletAddress", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Array of roles associated with the user',
        example: '["USER"]',
    }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "roles", void 0);
class UpdateUserDto extends (0, mapped_types_1.PartialType)(CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(29);
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
exports.LocalAuthGuard = LocalAuthGuard;
exports.LocalAuthGuard = LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = void 0;
const common_1 = __webpack_require__(1);
const Public = () => (0, common_1.SetMetadata)('isPublic', true);
exports.Public = Public;


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshJWTGuard = void 0;
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(29);
let RefreshJWTGuard = class RefreshJWTGuard extends (0, passport_1.AuthGuard)('jwt-refresh') {
};
exports.RefreshJWTGuard = RefreshJWTGuard;
exports.RefreshJWTGuard = RefreshJWTGuard = __decorate([
    (0, common_1.Injectable)()
], RefreshJWTGuard);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(33), exports);
__exportStar(__webpack_require__(35), exports);
__exportStar(__webpack_require__(37), exports);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JWTStrategy = void 0;
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(29);
const passport_jwt_1 = __webpack_require__(34);
let JWTStrategy = class JWTStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }
    async validate(payload) {
        const { id, sub } = payload;
        return { id, ...sub };
    }
};
exports.JWTStrategy = JWTStrategy;
exports.JWTStrategy = JWTStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JWTStrategy);


/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const passport_1 = __webpack_require__(29);
const passport_local_1 = __webpack_require__(36);
const auth_service_1 = __webpack_require__(12);
const common_1 = __webpack_require__(1);
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({ usernameField: 'email', passwordField: 'otp' });
        this.authService = authService;
    }
    async validate(email, otp) {
        const user = await this.authService.validateUser(email, otp);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshJWTStrategy = void 0;
const passport_1 = __webpack_require__(29);
const passport_jwt_1 = __webpack_require__(34);
class RefreshJWTStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromBodyField('refresh'),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }
    async validate(payload) {
        const { id, sub } = payload;
        return { id, ...sub };
    }
}
exports.RefreshJWTStrategy = RefreshJWTStrategy;


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailModule = void 0;
const config_1 = __webpack_require__(7);
const bull_1 = __webpack_require__(6);
const mailer_1 = __webpack_require__(39);
const common_1 = __webpack_require__(1);
const processors_1 = __webpack_require__(40);
const mailer_service_1 = __webpack_require__(13);
const constants_1 = __webpack_require__(14);
const handlebars_adapter_1 = __webpack_require__(42);
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    transport: {
                        host: configService.get('EMAIL_HOST'),
                        port: +configService.get('SMTP_PORT'),
                        secure: true,
                        auth: {
                            user: configService.get('EMAIL_ADDRESS'),
                            pass: configService.get('EMAIL_PASSWORD'),
                        },
                    },
                    defaults: { from: '"No Reply" <no-reply@rumsan.com>' },
                    template: {
                        dir: __dirname + '/templates',
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: { strict: true },
                    },
                }),
            }),
            bull_1.BullModule.registerQueue({
                name: constants_1.MAIL_QUEUE,
            }),
        ],
        providers: [processors_1.MailProcessor, mailer_service_1.MailService],
        exports: [mailer_service_1.MailService],
    })
], MailModule);


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer");

/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(41), exports);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailProcessor_1;
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailProcessor = void 0;
const common_1 = __webpack_require__(1);
const bull_1 = __webpack_require__(16);
const bull_2 = __webpack_require__(6);
const constants_1 = __webpack_require__(14);
const mailer_1 = __webpack_require__(39);
const config_1 = __webpack_require__(7);
let MailProcessor = MailProcessor_1 = class MailProcessor {
    constructor(_mailerService, _configService) {
        this._mailerService = _mailerService;
        this._configService = _configService;
        this._logger = new common_1.Logger(MailProcessor_1.name);
    }
    onActive(job) {
        this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
    }
    onComplete(job) {
        this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
    }
    onError(job, error) {
        this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
        try {
            return this._mailerService.sendMail({
                to: this._configService.get('EMAIL_ADDRESS'),
                from: this._configService.get('EMAIL_ADDRESS'),
                subject: 'Something went wrong with server!!',
                template: './error',
                context: {},
            });
        }
        catch {
            this._logger.error('Failed to send confirmation email to admin');
        }
    }
    async sendOTP(job) {
        this._logger.log(`Sending otp email to '${job.data.email}'`);
        try {
            return this._mailerService.sendMail({
                to: job.data.email,
                from: this._configService.get('EMAIL_ADDRESS'),
                subject: 'Sign In OTP',
                template: './otp',
                context: { name: job.data.email, otp: job.data.otp },
            });
        }
        catch {
            this._logger.error(`Failed to send confirmation email to '${job.data.email}'`);
        }
    }
    async welcome(job) {
        this._logger.log(`Sending welcome email to '${job.data.email}'`);
        try {
            return this._mailerService.sendMail({
                to: job.data.email,
                from: this._configService.get('EMAIL_ADDRESS'),
                subject: 'Greetings from GIGA NFT2.0',
                template: './welcome',
                context: { name: job.data.name },
            });
        }
        catch {
            this._logger.error(`Failed to send confirmation email to '${job.data.email}'`);
        }
    }
};
exports.MailProcessor = MailProcessor;
__decorate([
    (0, bull_2.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onActive", null);
__decorate([
    (0, bull_2.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onComplete", null);
__decorate([
    (0, bull_2.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onError", null);
__decorate([
    (0, bull_2.Process)(constants_1.SENT_OTP),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "sendOTP", null);
__decorate([
    (0, bull_2.Process)(constants_1.WELCOME_MSG),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "welcome", null);
exports.MailProcessor = MailProcessor = MailProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_2.Processor)(constants_1.MAIL_QUEUE),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], MailProcessor);


/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");

/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(1);
const prisma_service_1 = __webpack_require__(19);
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchoolModule = void 0;
const common_1 = __webpack_require__(1);
const schools_service_1 = __webpack_require__(45);
const schools_controller_1 = __webpack_require__(47);
const prisma_module_1 = __webpack_require__(43);
let SchoolModule = class SchoolModule {
};
exports.SchoolModule = SchoolModule;
exports.SchoolModule = SchoolModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [schools_controller_1.SchoolController],
        providers: [schools_service_1.SchoolService],
    })
], SchoolModule);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchoolService = void 0;
const common_1 = __webpack_require__(1);
const prisma_service_1 = __webpack_require__(19);
const paginate_1 = __webpack_require__(46);
let SchoolService = class SchoolService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { page, perPage } = query;
        const where = {
            deletedAt: null,
        };
        return (0, paginate_1.paginate)(this.prisma.school, { where }, {
            page,
            perPage,
        });
    }
    async findOne(id) {
        return await this.prisma.school.findUnique({
            where: {
                giga_id_school: id,
            },
        });
    }
    async byCountry(country) {
        const firstLetter = country.charAt(0);
        if (firstLetter === firstLetter.toUpperCase()) {
            return await this.prisma.school.findMany({
                where: {
                    location: country,
                },
            });
        }
        else {
            const capitalizedLetter = firstLetter.toUpperCase();
            const restOfTheString = country.slice(1);
            return await this.prisma.school.findMany({
                where: {
                    location: `${capitalizedLetter}${restOfTheString}`,
                },
            });
        }
    }
    update(id, updateSchoolDto) {
        return `This action updates a #${id} school`;
    }
    async removeAll() {
        return await this.prisma.school.deleteMany();
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], SchoolService);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.paginate = void 0;
const paginator = (defaultOptions) => {
    return async (model, args = { where: undefined }, options) => {
        const page = Number(options?.page || defaultOptions?.page) || 1;
        const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;
        const skip = page > 0 ? perPage * (page - 1) : 0;
        const [total, rows] = await Promise.all([
            model.count({ where: args.where }),
            model.findMany({
                ...args,
                take: perPage,
                skip,
            }),
        ]);
        const lastPage = Math.ceil(total / perPage);
        const meta = {
            total,
            lastPage,
            currentPage: page,
            perPage,
        };
        if (options?.transformRows) {
            return {
                rows: options.transformRows(rows),
                meta,
            };
        }
        return {
            rows,
            meta,
        };
    };
};
exports.paginate = paginator({ perPage: 20 });


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SchoolController = void 0;
const common_1 = __webpack_require__(1);
const schools_service_1 = __webpack_require__(45);
const update_schools_dto_1 = __webpack_require__(48);
const swagger_1 = __webpack_require__(24);
const list_schools_dto_1 = __webpack_require__(50);
let SchoolController = class SchoolController {
    constructor(schoolService) {
        this.schoolService = schoolService;
    }
    findAll(query) {
        return this.schoolService.findAll(query);
    }
    findOne(id) {
        return this.schoolService.findOne(`${id}`);
    }
    findByCountry(country) {
        return this.schoolService.byCountry(`${country}`);
    }
    update(id, updateSchoolDto) {
        return this.schoolService.update(+id, updateSchoolDto);
    }
    removeAll() {
        return this.schoolService.removeAll();
    }
};
exports.SchoolController = SchoolController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof list_schools_dto_1.ListSchoolDto !== "undefined" && list_schools_dto_1.ListSchoolDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('byCountry/:country'),
    __param(0, (0, common_1.Param)('country')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "findByCountry", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_schools_dto_1.UpdateSchoolDto !== "undefined" && update_schools_dto_1.UpdateSchoolDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "removeAll", null);
exports.SchoolController = SchoolController = __decorate([
    (0, common_1.Controller)('schools'),
    (0, swagger_1.ApiTags)('School'),
    __metadata("design:paramtypes", [typeof (_a = typeof schools_service_1.SchoolService !== "undefined" && schools_service_1.SchoolService) === "function" ? _a : Object])
], SchoolController);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSchoolDto = void 0;
const swagger_1 = __webpack_require__(24);
const create_schools_dto_1 = __webpack_require__(49);
class UpdateSchoolDto extends (0, swagger_1.PartialType)(create_schools_dto_1.CreateSchoolDto) {
}
exports.UpdateSchoolDto = UpdateSchoolDto;


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSchoolDto = void 0;
class CreateSchoolDto {
}
exports.CreateSchoolDto = CreateSchoolDto;


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListSchoolDto = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
class ListSchoolDto {
}
exports.ListSchoolDto = ListSchoolDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page to load',
        example: '1',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListSchoolDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListSchoolDto.prototype, "perPage", void 0);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(1);
const users_service_1 = __webpack_require__(18);
const users_controller_1 = __webpack_require__(52);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(1);
const users_service_1 = __webpack_require__(18);
const user_dto_1 = __webpack_require__(26);
const jwt_auth_guard_1 = __webpack_require__(53);
const swagger_1 = __webpack_require__(24);
const role_guard_1 = __webpack_require__(54);
const roles_decorator_1 = __webpack_require__(55);
const public_decorator_1 = __webpack_require__(30);
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    addValidator(createUserDto) {
        return this.usersService.addValidator(createUserDto);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(id) {
        return this.usersService.findOne(+id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(+id);
    }
    requestValidator(createUserDto) {
        return this.usersService.requestValidator(createUserDto);
    }
    approveValidator(id) {
        return this.usersService.approveValidator(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Post)('addValidator'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The found record',
        type: [user_dto_1.CreateUserDto],
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addValidator", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The found record',
        type: [user_dto_1.CreateUserDto],
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The found record',
        type: [user_dto_1.CreateUserDto],
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The found record',
        type: [user_dto_1.CreateUserDto],
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof user_dto_1.UpdateUserDto !== "undefined" && user_dto_1.UpdateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The found record',
        type: [user_dto_1.CreateUserDto],
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('requestValidator'),
    (0, swagger_1.ApiOperation)({ summary: 'Request for an admin for validator' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The found record',
        type: [user_dto_1.CreateUserDto],
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "requestValidator", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)('approveValidator/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a user for validator' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The found record',
        type: [user_dto_1.CreateUserDto],
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "approveValidator", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('Users'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(29);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleGuard = void 0;
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
let RoleGuard = class RoleGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    matchRoles(roles, userRole) {
        return roles.some(role => role.toString() === userRole.toString());
    }
    canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return this.matchRoles(roles, user.roles);
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RoleGuard);


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const common_1 = __webpack_require__(1);
const Roles = (...args) => (0, common_1.SetMetadata)('roles', args);
exports.Roles = Roles;


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContributeDataModule = void 0;
const common_1 = __webpack_require__(1);
const contribute_service_1 = __webpack_require__(57);
const contribute_controller_1 = __webpack_require__(59);
const points_service_1 = __webpack_require__(58);
let ContributeDataModule = class ContributeDataModule {
};
exports.ContributeDataModule = ContributeDataModule;
exports.ContributeDataModule = ContributeDataModule = __decorate([
    (0, common_1.Module)({
        controllers: [contribute_controller_1.ContributeDataController],
        providers: [contribute_service_1.ContributeDataService, points_service_1.PointsService],
    })
], ContributeDataModule);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ContributeDataService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContributeDataService = void 0;
const common_1 = __webpack_require__(1);
const prisma_service_1 = __webpack_require__(19);
const points_service_1 = __webpack_require__(58);
const client_1 = __webpack_require__(20);
const client_2 = __webpack_require__(20);
let ContributeDataService = ContributeDataService_1 = class ContributeDataService {
    constructor(prisma, pointsService) {
        this.prisma = prisma;
        this.pointsService = pointsService;
        this._logger = new common_1.Logger(ContributeDataService_1.name);
    }
    async create(createContributeDatumDto) {
        const createdData = await this.prisma.contributedData.create({
            data: { ...createContributeDatumDto },
        });
        return createdData;
    }
    async findAll() {
        const data = await this.prisma.contributedData.findMany();
        return data;
    }
    async findOne(id) {
        const data = await this.prisma.contributedData.findUnique({
            where: { contributed_UUID: id },
        });
        if (!data) {
            throw new common_1.NotFoundException('Contributed data with such ID not found');
        }
        return data;
    }
    async update(id, updateContributeDatumDto) {
        const updatedData = await this.prisma.contributedData.update({
            where: { contributed_UUID: id },
            data: updateContributeDatumDto,
        });
        return updatedData;
    }
    async remove(id) {
        const deletedData = await this.prisma.contributedData.delete({
            where: { contributed_UUID: id },
        });
        if (deletedData) {
            return 'Contributed data deleted successfully.';
        }
    }
    async upvote(id, user) {
        try {
            const contributedData = await this.findOne(id);
            const check_vote = await this.prisma.vote.findUnique({
                where: {
                    giga_vote_contributed_Id: {
                        contributed_Id: id,
                        user_id: user.id,
                    },
                },
            });
            if (check_vote || !contributedData) {
                throw new common_1.InternalServerErrorException('User already voted');
            }
            if (contributedData.contributedUserId === user.id) {
                throw new common_1.InternalServerErrorException('User cannot vote for their own contribution');
            }
            const voteData = {
                vote_type: client_1.VOTE_TYPE.UPVOTE,
                user_id: user.id,
                contributed_Id: id,
                createdBy: user.id,
            };
            const points1 = {
                leaderBoardType: client_1.LeaderBoardType.GENERAL,
                contributionType: client_1.ContributionType.VOTE,
                isConfirmed: false,
                isValid: false,
                points: 1,
                user_id: user.id,
                createdBy: user.id,
                season_id: null,
                contributedDataId: id,
            };
            const points2 = {
                leaderBoardType: client_1.LeaderBoardType.GENERAL,
                contributionType: client_1.ContributionType.CONTRIBUTE,
                isConfirmed: false,
                isValid: false,
                points: 2,
                user_id: contributedData.contributedUserId,
                createdBy: user.id,
                season_id: null,
                contributedDataId: id,
            };
            if (contributedData.season_ID) {
                points1.leaderBoardType = client_1.LeaderBoardType.SEASONAL;
                points1.season_id = contributedData.season_ID;
                points2.leaderBoardType = client_1.LeaderBoardType.SEASONAL;
                points2.season_id = contributedData.season_ID;
            }
            const transaction = await this.prisma.$transaction([
                this.prisma.vote.create({ data: voteData }),
                this.prisma.points.create({ data: points1 }),
                this.prisma.points.create({ data: points2 }),
            ]);
            this._logger.log(`User ${user.id} upvoted ${id} and successfully created points`);
            return transaction;
        }
        catch (error) {
            this._logger.error(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async downvote(id, user) {
        try {
            const contributedData = await this.findOne(id);
            const check_vote = await this.prisma.vote.findUnique({
                where: {
                    giga_vote_contributed_Id: {
                        contributed_Id: id,
                        user_id: user.id,
                    },
                },
            });
            if (check_vote) {
                throw new common_1.InternalServerErrorException('User already voted');
            }
            if (contributedData.contributedUserId === user.id) {
                throw new common_1.InternalServerErrorException('User cannot vote for their own contribution');
            }
            const vote = await this.prisma.vote.create({
                data: {
                    vote_type: client_1.VOTE_TYPE.DOWNVOTE,
                    user_id: user.id,
                    contributed_Id: id,
                    createdBy: user.id,
                },
            });
            this._logger.log(`User ${user.id} downvoted ${id}`);
            return vote;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async validate(id, isValid) {
        try {
            const contributedData = await this.findOne(id);
            let transaction;
            if (!contributedData) {
                throw new common_1.NotFoundException('Contributed data with such ID not found');
            }
            if (isValid) {
                transaction = await this.prisma.$transaction([
                    this.prisma.points.updateMany({
                        where: {
                            contributedDataId: id,
                        },
                        data: {
                            isValid: true,
                            isConfirmed: true,
                            leaderBoardType: client_1.LeaderBoardType.GLOBAL,
                        },
                    }),
                    this.prisma.contributedData.update({
                        data: { status: client_2.Status.Validated },
                        where: { contributed_UUID: id },
                    }),
                ]);
            }
            else {
                transaction = await this.prisma.$transaction([
                    this.prisma.points.updateMany({
                        where: {
                            contributedDataId: id,
                        },
                        data: {
                            isValid: false,
                            isConfirmed: true,
                            leaderBoardType: client_1.LeaderBoardType.GLOBAL,
                        },
                    }),
                    this.prisma.contributedData.update({
                        data: { status: client_2.Status.Rejected },
                        where: { contributed_UUID: id },
                    }),
                ]);
            }
            return transaction;
        }
        catch (error) {
            this._logger.error(error);
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.ContributeDataService = ContributeDataService;
exports.ContributeDataService = ContributeDataService = ContributeDataService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof points_service_1.PointsService !== "undefined" && points_service_1.PointsService) === "function" ? _b : Object])
], ContributeDataService);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PointsService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointsService = void 0;
const common_1 = __webpack_require__(1);
const prisma_service_1 = __webpack_require__(19);
let PointsService = PointsService_1 = class PointsService {
    constructor(prisma) {
        this.prisma = prisma;
        this._logger = new common_1.Logger(PointsService_1.name);
    }
    async create(createPointDto) {
        let point;
        try {
            point = await this.prisma.points.create({
                data: createPointDto,
            });
        }
        catch (error) {
            this._logger.error(error);
            throw new common_1.InternalServerErrorException();
        }
        return point;
    }
    async findAll(query) {
        let points;
        try {
            points = await this.prisma.points.findMany({ where: query });
        }
        catch (error) {
            this._logger.error(error);
            throw new common_1.InternalServerErrorException();
        }
        return points;
    }
    async findOne(id) {
        let point;
        try {
            point = await this.prisma.points.findUnique({
                where: { id },
                include: { user: true },
            });
        }
        catch (error) {
            this._logger.error(error);
            throw new common_1.InternalServerErrorException();
        }
        return point;
    }
    async update(id, updatePointDto) {
        let point;
        try {
            point = await this.prisma.points.update({
                where: { id },
                data: updatePointDto,
            });
        }
        catch (error) {
            this._logger.error(error);
            throw new common_1.InternalServerErrorException();
        }
        return point;
    }
    async remove(id) {
        let point;
        try {
            point = await this.prisma.points.delete({
                where: { id },
            });
        }
        catch (error) {
            this._logger.error(error);
            throw new common_1.InternalServerErrorException();
        }
        return point;
    }
};
exports.PointsService = PointsService;
exports.PointsService = PointsService = PointsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], PointsService);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContributeDataController = void 0;
const common_1 = __webpack_require__(1);
const contribute_service_1 = __webpack_require__(57);
const create_contribute_datum_dto_1 = __webpack_require__(60);
const update_contribute_datum_dto_1 = __webpack_require__(61);
const swagger_1 = __webpack_require__(24);
const public_decorator_1 = __webpack_require__(30);
const roles_decorator_1 = __webpack_require__(55);
const jwt_auth_guard_1 = __webpack_require__(53);
const role_guard_1 = __webpack_require__(54);
let ContributeDataController = class ContributeDataController {
    constructor(contributeDataService) {
        this.contributeDataService = contributeDataService;
    }
    create(createContributeDatumDto) {
        return this.contributeDataService.create(createContributeDatumDto);
    }
    findAll() {
        return this.contributeDataService.findAll();
    }
    findOne(id) {
        return this.contributeDataService.findOne(id);
    }
    update(id, updateContributeDatumDto) {
        return this.contributeDataService.update(id, updateContributeDatumDto);
    }
    remove(id) {
        return this.contributeDataService.remove(id);
    }
    upvote(id, req) {
        return this.contributeDataService.upvote(id, req.user);
    }
    downvote(id, req) {
        return this.contributeDataService.downvote(id, req.user);
    }
    validate(id, ValidateDto) {
        return this.contributeDataService.validate(id, ValidateDto.isValid);
    }
};
exports.ContributeDataController = ContributeDataController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_contribute_datum_dto_1.CreateContributeDatumDto !== "undefined" && create_contribute_datum_dto_1.CreateContributeDatumDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], ContributeDataController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContributeDataController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContributeDataController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_contribute_datum_dto_1.UpdateContributeDatumDto !== "undefined" && update_contribute_datum_dto_1.UpdateContributeDatumDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], ContributeDataController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContributeDataController.prototype, "remove", null);
__decorate([
    (0, roles_decorator_1.Roles)('CONTRIBUTOR'),
    (0, common_1.Post)('upvote/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ContributeDataController.prototype, "upvote", null);
__decorate([
    (0, roles_decorator_1.Roles)('CONTRIBUTOR'),
    (0, common_1.Post)('downvote/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ContributeDataController.prototype, "downvote", null);
__decorate([
    (0, roles_decorator_1.Roles)('VALIDATOR'),
    (0, common_1.Post)('validate/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof create_contribute_datum_dto_1.ValidateDto !== "undefined" && create_contribute_datum_dto_1.ValidateDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], ContributeDataController.prototype, "validate", null);
exports.ContributeDataController = ContributeDataController = __decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, common_1.Controller)('contribute'),
    (0, swagger_1.ApiTags)('Contribute'),
    __metadata("design:paramtypes", [typeof (_a = typeof contribute_service_1.ContributeDataService !== "undefined" && contribute_service_1.ContributeDataService) === "function" ? _a : Object])
], ContributeDataController);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidateDto = exports.CreateContributeDatumDto = void 0;
const swagger_1 = __webpack_require__(24);
const client_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(25);
class CreateContributeDatumDto {
}
exports.CreateContributeDatumDto = CreateContributeDatumDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '{"key": "value"}',
        description: 'JSON value with key value pair',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsJSON)(),
    __metadata("design:type", String)
], CreateContributeDatumDto.prototype, "contributed_data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pending',
        enum: client_1.Status,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", typeof (_a = typeof client_1.Status !== "undefined" && client_1.Status) === "function" ? _a : Object)
], CreateContributeDatumDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1c0ebe70-f286-473c-bb9c-165db6af77c7',
        description: 'User ID of user who contributed the data.',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContributeDatumDto.prototype, "contributedUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'school-id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContributeDatumDto.prototype, "school_Id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'season-id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContributeDatumDto.prototype, "season_ID", void 0);
class ValidateDto {
}
exports.ValidateDto = ValidateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ValidateDto.prototype, "isValid", void 0);


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateContributeDatumDto = void 0;
const swagger_1 = __webpack_require__(24);
const create_contribute_datum_dto_1 = __webpack_require__(60);
class UpdateContributeDatumDto extends (0, swagger_1.PartialType)(create_contribute_datum_dto_1.CreateContributeDatumDto) {
}
exports.UpdateContributeDatumDto = UpdateContributeDatumDto;


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeasonModule = void 0;
const common_1 = __webpack_require__(1);
const seasons_service_1 = __webpack_require__(63);
const seasons_controller_1 = __webpack_require__(64);
let SeasonModule = class SeasonModule {
};
exports.SeasonModule = SeasonModule;
exports.SeasonModule = SeasonModule = __decorate([
    (0, common_1.Module)({
        controllers: [seasons_controller_1.SeasonController],
        providers: [seasons_service_1.SeasonService],
    })
], SeasonModule);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SeasonService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeasonService = void 0;
const common_1 = __webpack_require__(1);
const prisma_service_1 = __webpack_require__(19);
let SeasonService = SeasonService_1 = class SeasonService {
    constructor(prisma) {
        this.prisma = prisma;
        this._logger = new common_1.Logger(SeasonService_1.name);
    }
    async create(createSeasonDto) {
        try {
            const createdSeason = await this.prisma.season.create({
                data: createSeasonDto,
            });
            return createdSeason;
        }
        catch (error) {
            this._logger.error(`Error while creating season: ${error}`);
        }
    }
    async findAll() {
        const allSeason = await this.prisma.season.findMany();
        if (!allSeason)
            throw new common_1.NotFoundException('No season in DB');
        return allSeason;
    }
    async findOne(id) {
        try {
            const oneSeason = await this.prisma.season.findUnique({
                where: { season_id: id },
            });
            return oneSeason;
        }
        catch (error) {
            this._logger.error(`Error while creating season: ${error}`);
            throw new common_1.NotFoundException(`Couldn't find season with such ID.`);
        }
    }
    async remove(id) {
        const seasonWithId = this.prisma.season.findUnique({ where: { season_id: id } });
        if (!seasonWithId)
            throw new common_1.NotFoundException('No season with such id');
        await this.prisma.season.delete({
            where: { season_id: id },
        });
        return `Season ${id} deleted successfully.`;
    }
};
exports.SeasonService = SeasonService;
exports.SeasonService = SeasonService = SeasonService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], SeasonService);


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeasonController = void 0;
const common_1 = __webpack_require__(1);
const seasons_service_1 = __webpack_require__(63);
const create_seasons_dto_1 = __webpack_require__(65);
const public_decorator_1 = __webpack_require__(30);
const swagger_1 = __webpack_require__(24);
let SeasonController = class SeasonController {
    constructor(seasonService) {
        this.seasonService = seasonService;
    }
    create(createSeasonDto) {
        return this.seasonService.create(createSeasonDto);
    }
    findAll() {
        return this.seasonService.findAll();
    }
    findOne(id) {
        return this.seasonService.findOne(id);
    }
    remove(id) {
        return this.seasonService.remove(id);
    }
};
exports.SeasonController = SeasonController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new season' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_seasons_dto_1.CreateSeasonDto !== "undefined" && create_seasons_dto_1.CreateSeasonDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], SeasonController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get list of all season' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeasonController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get one season with ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SeasonController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a new season' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SeasonController.prototype, "remove", null);
exports.SeasonController = SeasonController = __decorate([
    (0, swagger_1.ApiTags)('seasons'),
    (0, common_1.Controller)('seasons'),
    __metadata("design:paramtypes", [typeof (_a = typeof seasons_service_1.SeasonService !== "undefined" && seasons_service_1.SeasonService) === "function" ? _a : Object])
], SeasonController);


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSeasonDto = void 0;
const class_validator_1 = __webpack_require__(25);
const client_1 = __webpack_require__(20);
const swagger_1 = __webpack_require__(24);
class CreateSeasonDto {
}
exports.CreateSeasonDto = CreateSeasonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Summer season',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSeasonDto.prototype, "season_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Start',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", typeof (_a = typeof client_1.Season_Status !== "undefined" && client_1.Season_Status) === "function" ? _a : Object)
], CreateSeasonDto.prototype, "season_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-08-15T08:20:05.565Z',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CreateSeasonDto.prototype, "season_start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-08-15T08:20:05.565Z',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], CreateSeasonDto.prototype, "season_end_date", void 0);


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointsModule = void 0;
const common_1 = __webpack_require__(1);
const points_service_1 = __webpack_require__(58);
const points_controller_1 = __webpack_require__(67);
let PointsModule = class PointsModule {
};
exports.PointsModule = PointsModule;
exports.PointsModule = PointsModule = __decorate([
    (0, common_1.Module)({
        controllers: [points_controller_1.PointsController],
        providers: [points_service_1.PointsService],
    })
], PointsModule);


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointsController = void 0;
const common_1 = __webpack_require__(1);
const points_service_1 = __webpack_require__(58);
const create_point_dto_1 = __webpack_require__(68);
const update_point_dto_1 = __webpack_require__(69);
const swagger_1 = __webpack_require__(24);
const point_entity_1 = __webpack_require__(70);
const public_decorator_1 = __webpack_require__(30);
let PointsController = class PointsController {
    constructor(pointsService) {
        this.pointsService = pointsService;
    }
    async create(createPointDto) {
        const point = await this.pointsService.create(createPointDto);
        return point;
    }
    findAll(user_id, season_id, createdBy) {
        let query;
        if (user_id || season_id || createdBy) {
            query = { user_id, season_id, createdBy };
        }
        return this.pointsService.findAll(query);
    }
    findOne(id) {
        return this.pointsService.findOne(+id);
    }
    update(id, updatePointDto) {
        return this.pointsService.update(+id, updatePointDto);
    }
    remove(id) {
        return this.pointsService.remove(+id);
    }
};
exports.PointsController = PointsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ type: point_entity_1.PointEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_point_dto_1.CreatePointDto !== "undefined" && create_point_dto_1.CreatePointDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], PointsController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'user_id', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'season_id', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'createdBy', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: point_entity_1.PointEntity, isArray: true }),
    __param(0, (0, common_1.Query)('user_id')),
    __param(1, (0, common_1.Query)('season_id')),
    __param(2, (0, common_1.Query)('createdBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], PointsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: point_entity_1.PointEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PointsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: point_entity_1.PointEntity }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_point_dto_1.UpdatePointDto !== "undefined" && update_point_dto_1.UpdatePointDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], PointsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: point_entity_1.PointEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PointsController.prototype, "remove", null);
exports.PointsController = PointsController = __decorate([
    (0, common_1.Controller)('points'),
    (0, swagger_1.ApiTags)('Points'),
    __metadata("design:paramtypes", [typeof (_a = typeof points_service_1.PointsService !== "undefined" && points_service_1.PointsService) === "function" ? _a : Object])
], PointsController);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePointDto = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const client_1 = __webpack_require__(20);
class CreatePointDto {
}
exports.CreatePointDto = CreatePointDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePointDto.prototype, "points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: client_1.LeaderBoardType.SEASONAL,
        enum: client_1.LeaderBoardType,
    }),
    (0, class_validator_1.IsEnum)(client_1.LeaderBoardType),
    __metadata("design:type", typeof (_a = typeof client_1.LeaderBoardType !== "undefined" && client_1.LeaderBoardType) === "function" ? _a : Object)
], CreatePointDto.prototype, "leaderBoardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: client_1.ContributionType.VOTE,
        enum: client_1.ContributionType,
    }),
    (0, class_validator_1.IsEnum)(client_1.ContributionType),
    __metadata("design:type", typeof (_b = typeof client_1.ContributionType !== "undefined" && client_1.ContributionType) === "function" ? _b : Object)
], CreatePointDto.prototype, "contributionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePointDto.prototype, "isConfirmed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePointDto.prototype, "isValid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The id of the user',
        example: '3974',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePointDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The id of the season',
        example: '242',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePointDto.prototype, "season_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The id of creator user',
        example: '545',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePointDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The id of contributed data',
        example: '545',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePointDto.prototype, "contributedDataId", void 0);


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePointDto = void 0;
const swagger_1 = __webpack_require__(24);
const create_point_dto_1 = __webpack_require__(68);
class UpdatePointDto extends (0, swagger_1.PartialType)(create_point_dto_1.CreatePointDto) {
}
exports.UpdatePointDto = UpdatePointDto;


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointEntity = void 0;
const swagger_1 = __webpack_require__(24);
const client_1 = __webpack_require__(20);
class PointEntity {
}
exports.PointEntity = PointEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PointEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PointEntity.prototype, "points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_a = typeof client_1.LeaderBoardType !== "undefined" && client_1.LeaderBoardType) === "function" ? _a : Object)
], PointEntity.prototype, "leaderBoardType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_b = typeof client_1.ContributionType !== "undefined" && client_1.ContributionType) === "function" ? _b : Object)
], PointEntity.prototype, "contributionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PointEntity.prototype, "isConfirmed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PointEntity.prototype, "isValid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], PointEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PointEntity.prototype, "season_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PointEntity.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PointEntity.prototype, "user_id", void 0);


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomExceptionFilter = void 0;
const common_1 = __webpack_require__(1);
const class_transformer_1 = __webpack_require__(72);
const class_validator_1 = __webpack_require__(25);
const exception_1 = __webpack_require__(73);
const prisma_exception_1 = __webpack_require__(74);
const client_1 = __webpack_require__(20);
let CustomExceptionFilter = class CustomExceptionFilter {
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToInstance)(metatype, value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            const messages = this.getErrorMessage(errors);
            throw new common_1.BadRequestException({
                message: 'Validation failed',
                errors: messages,
                status: 400,
            });
        }
        return value;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
    getErrorMessage(errors) {
        const result = {};
        errors.forEach((error) => {
            const constraints = error.constraints;
            if (constraints) {
                const property = error.property;
                result[property] = Object.values(constraints);
            }
        });
        return result;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let exceptionResponse;
        const responseData = {
            name: 'DEFAULT',
            message: 'Our server is not happy. It threw an error. Please try again or contact support.' || 0,
            success: false,
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            group: '',
            meta: null,
            timestamp: new Date().getTime(),
        };
        function isObjectWithErrors(value) {
            return typeof value === 'object' && value !== null && 'errors' in value;
        }
        if (exception instanceof common_1.HttpException) {
            exceptionResponse = exception?.getResponse();
            if (isObjectWithErrors(exceptionResponse)) {
                responseData.meta = exceptionResponse?.errors ?? '';
            }
            else {
                responseData.meta = [response?.errors ?? ''];
            }
            responseData.name = exception.name;
            responseData.statusCode = exception.getStatus();
            responseData.message = exception.message;
            responseData.group = 'HTTP';
        }
        else if (exception instanceof exception_1.RsException) {
            if (isObjectWithErrors(exceptionResponse)) {
                responseData.meta = exceptionResponse?.errors ?? '';
            }
            else {
                responseData.meta = [response?.errors ?? ''];
            }
            responseData.message = exception.message;
            responseData.statusCode = exception.httpCode;
            responseData.name = exception.name;
            responseData.group = exception.group;
        }
        else if (exception instanceof client_1.Prisma?.PrismaClientKnownRequestError) {
            responseData.name = exception.code;
            const prismaError = (0, prisma_exception_1.PrimsaFriendlyErrorMessage)(exception);
            responseData.message = prismaError.message;
            responseData.statusCode = prismaError.httpCode;
            responseData.group = 'DBERROR';
        }
        else if (exception instanceof Error) {
            responseData.name = exception.name;
            responseData.message = exception.message;
        }
        else if (typeof exception === 'string') {
            responseData.message = exception;
        }
        response.status(responseData.statusCode).send(responseData);
    }
};
exports.CustomExceptionFilter = CustomExceptionFilter;
exports.CustomExceptionFilter = CustomExceptionFilter = __decorate([
    (0, common_1.Catch)()
], CustomExceptionFilter);


/***/ }),
/* 72 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERRORS = exports.RsException = void 0;
class RsException extends Error {
    constructor(message, name = 'unknown', httpCode = 500, group = '') {
        super(message);
        this.name = name || 'UNKNOWN';
        this.httpCode = httpCode || 500;
        this.group = group || '';
    }
}
exports.RsException = RsException;
exports.ERRORS = {
    NOT_JSON: new RsException('Invalid JSON string', 'NOT_JSON', 400, 'VALIDATION'),
};


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrimsaFriendlyErrorMessage = void 0;
const shortenPrismaMessage = (message) => {
    const shortMessage = message.substring(message.indexOf('→'));
    return shortMessage.substring(shortMessage.indexOf('\n')).replace(/\n/g, '').trim();
};
const PrimsaFriendlyErrorMessage = (execption) => {
    let message = execption.message || 'Error occured';
    let httpCode = 500;
    if (execption.code === 'P2002') {
        const field = execption.meta.target.join('.');
        message = `Duplicate entry in [${field}] is not allowed.`;
    }
    else if (execption.code === 'P2025') {
        httpCode = 404;
    }
    else {
        message = shortenPrismaMessage(execption.message);
    }
    return { message, httpCode };
};
exports.PrimsaFriendlyErrorMessage = PrimsaFriendlyErrorMessage;


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupSwagger = void 0;
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(24);
function setupSwagger(app) {
    const port = process.env.PORT;
    const logger = new common_1.Logger('swagger setup');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('GIGA NFT 2.0 API PROVIDER')
        .setDescription('NFT2.0')
        .setVersion('1.0.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
    logger.log(`Swagger Documentation running on the url http://localhost:${port}/api/docs`);
}
exports.setupSwagger = setupSwagger;


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(29);
let AuthGuard = class AuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.get('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], AuthGuard);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const platform_fastify_1 = __webpack_require__(3);
const helmet_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const exception_filter_1 = __webpack_require__(71);
const swagger_1 = __webpack_require__(75);
const auth_global_guard_1 = __webpack_require__(76);
async function bootstrap() {
    const logger = new common_1.Logger('bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({ logger: false }));
    const reflector = app.get(core_1.Reflector);
    const port = process.env.PORT || 3000;
    await app.register(helmet_1.default);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api').enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalFilters(new exception_filter_1.CustomExceptionFilter());
    app.useGlobalGuards(new auth_global_guard_1.AuthGuard(reflector));
    (0, swagger_1.setupSwagger)(app);
    await app.listen(port, '0.0.0.0');
    logger.log(`Application listening on port ${port}`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map