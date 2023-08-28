"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutgoingController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// ORM - Outgoing Collection
const outgoing_orm_1 = require("../domain/orm/outgoing.orm");
let OutgoingController = exports.OutgoingController = class OutgoingController {
    /**
     * Endpoint to retreive the Outgoings in the Collection "Outgoings" of DB
     * @param {string} id Id of user to retreive (optional)
     * @returns All user o user found by iD
     */
    getOutgoingByID(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/Outgoings] Get Outgoings By user ID: ${id} `);
                response = yield (0, outgoing_orm_1.getOutgoingByID)(id);
            }
            else {
                (0, logger_1.LogError)('[/api/outgoings] Get Outgoing Request WITHOUT ID');
                response = {
                    message: "Please, provide an ID to get a existing Outgoing"
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to retreive the Outgoings in the Collection "Outgoings" of DB
     * @param {string} userIdid Id of user to retreive (optional)
     * @returns All Outgoings by User iD
     */
    getOutgoings(page, limit, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (userId) {
                (0, logger_1.LogSuccess)(`[/api/outgoings] Get Outgoings By user ID: ${userId} `);
                response = yield (0, outgoing_orm_1.getAllOutgoingsbyUserId)(page, limit, userId);
            }
            else {
                (0, logger_1.LogError)('[/api/outgoings] Get Outgoings Request WITHOUT USERID');
                response = {
                    message: "Please, provide an USERID to get existing outgoings"
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to delete the Outgoing in the Collection "Outgoing" of DB
     * @param {string} id Id of user to delete (optional)
     * @returns message informing if deletion was correct
     */
    deleteOutgoing(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/outgoings] Delete Outgoings By ID: ${id} `);
                yield (0, outgoing_orm_1.deleteOutgoingByID)(id).then((r) => {
                    response = {
                        message: `Outgoing with id ${id} deleted successfully`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/outgoings] Delete User Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to remove from database'
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to update the outgoings in the Collection "outgoings" of DB
     * @param {string} id to update de outgoings
     * @param {Ioutgoing}outgoing the entity to update
     * @returns message informing if updating was correct
     */
    updateOutgoing(id, outgoing) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/outgoings] Update Outgoings By ID: ${id} `);
                yield (0, outgoing_orm_1.updateOutgoingByID)(id, outgoing).then((r) => {
                    response = {
                        message: `Outgoings with id ${id} updated successfully`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/outgoings]  Update Outgoings Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to update an existing user'
                };
            }
            return response;
        });
    }
    /**
 * Endpoint to create the outgoings in the Collection "Outgoings" of DB
 * @param {Ioutgoing} outgoing of user to create
 * @returns message informing if insertion was correct
 */
    addOutgoing(outgoing) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (outgoing) {
                (0, logger_1.LogSuccess)(`[/api/outgoings] Created New Outgoing: ${outgoing.title} `);
                yield (0, outgoing_orm_1.createOutgoing)(outgoing).then((r) => {
                    (0, logger_1.LogSuccess)(`[/api/Outgoings] Created New Outgoing: ${outgoing.title} `);
                    response = {
                        message: `User created successfully: ${outgoing.title}`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/outgoings] creation needs outgoing Entity');
                response = {
                    message: 'Outgoing not created:  Please, provide an Outgoing Entity to create one'
                };
            }
            return response;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], OutgoingController.prototype, "getOutgoingByID", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], OutgoingController.prototype, "getOutgoings", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OutgoingController.prototype, "deleteOutgoing", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OutgoingController.prototype, "updateOutgoing", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OutgoingController.prototype, "addOutgoing", null);
exports.OutgoingController = OutgoingController = __decorate([
    (0, tsoa_1.Route)("/api/outgoing"),
    (0, tsoa_1.Tags)("outgoingController")
], OutgoingController);
//# sourceMappingURL=OutgoingController.js.map