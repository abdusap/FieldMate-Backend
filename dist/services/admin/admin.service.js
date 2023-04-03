"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_repositories_1 = __importDefault(require("../../repositories/admin.repositories"));
const adminRepositories = new admin_repositories_1.default();
class AdminService {
    AddLocation(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = adminRepositories.addLocation(name);
            return location;
        });
    }
    AddSport(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const sports = adminRepositories.addSports(name);
            return sports;
        });
    }
    GetLocationAndSport() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = adminRepositories.getLocationAndSports();
            return data;
        });
    }
    FindLocation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = adminRepositories.findLocation(id);
            return data;
        });
    }
    EditLocation(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = adminRepositories.editLocation(id, name);
            return data;
        });
    }
    FindSports(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = adminRepositories.findSports(id);
            return data;
        });
    }
    EditSports(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = adminRepositories.editSports(id, name);
            return data;
        });
    }
}
exports.default = AdminService;
