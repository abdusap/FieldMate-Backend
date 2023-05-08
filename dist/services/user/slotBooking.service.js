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
const slotBooking_repository_1 = __importDefault(require("../../repositories/user/slotBooking.repository"));
class SlotBookingService extends slotBooking_repository_1.default {
    bookSlot(userId, turfId, date, slots, sports, total, walletAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.bookSlotWallet(userId, turfId, date, slots, sports, total, walletAmount);
            return data;
        });
    }
    BookSlotPayment(userId, turfId, date, slots, sports, total, paymentAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.bookSlotPayment(userId, turfId, date, slots, sports, total, paymentAmount);
            return data;
        });
    }
    BookSlotPaymentAndWallet(userId, turfId, date, slots, sports, total, walletAmount, paymentAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.bookSlotPaymentAndWallet(userId, turfId, date, slots, sports, total, walletAmount, paymentAmount);
            return data;
        });
    }
    AllBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.allBooking(id);
            //         const now = new Date();
            // const pastBookings = data.filter((booking:any) => {
            //   return booking.date < now;
            // });
            // const presentBookings = data.filter((booking:any) => {
            //   return booking.date >= now && !isSameDay(booking.date, now);
            // });
            const now = new Date();
            // const pastBookings:any = [];
            // const presentBookings:any = [];
            // data.forEach((booking:any) => {
            //     const bookingDate = new Date(booking.date);
            //     if (bookingDate < now) {
            //         pastBookings.push(booking);
            //     } else {
            //         const isSameDay = bookingDate.getFullYear() === now.getFullYear() &&
            //             bookingDate.getMonth() === now.getMonth() &&
            //             bookingDate.getDate() === now.getDate();
            //         if (isSameDay) {
            //             presentBookings.push(booking);
            //         } else {
            //             presentBookings.push(booking);
            //         }
            //     }
            // });
            const pastBookings = data.filter((booking) => {
                return new Date(booking.date) < new Date(now.toDateString());
            });
            const presentBookings = data.filter((booking) => {
                const bookingDate = new Date(booking.date);
                const sameDay = bookingDate.getFullYear() === now.getFullYear() &&
                    bookingDate.getMonth() === now.getMonth() &&
                    bookingDate.getDate() === now.getDate();
                return sameDay || bookingDate >= new Date(now.toDateString());
            });
            console.log(pastBookings);
            console.log(presentBookings);
            return {
                "pastBooking": pastBookings,
                "presentBooking": presentBookings
            };
        });
    }
    CancelBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.cancelBooking(id);
            return data;
        });
    }
}
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}
exports.default = SlotBookingService;
