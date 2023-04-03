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
const sports_repository_1 = __importDefault(require("../../repositories/admin/sports.repository"));
class SportsService extends sports_repository_1.default {
    AddSport(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const sports = this.addSports(name);
            return sports;
        });
    }
    FindSports(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.findSports(id);
            return data;
        });
    }
    // async GetLocationAndSport():Promise<any>{   
    //     const data=adminRepositories.getLocationAndSports()
    //     return data
    // }
    EditSports(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.editSports(id, name);
            return data;
        });
    }
}
exports.default = SportsService;
