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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContentTypes = exports.getAllContentItems = void 0;
function getAllContentItems(apiClient) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let allContentItems = [];
        let continuationToken = "";
        console.log('Fetching all content items, this may take a while...');
        do {
            let req = apiClient
                .listContentItems();
            if (continuationToken) {
                req.xContinuationToken(continuationToken);
            }
            const data = (yield req.toPromise()).data;
            allContentItems = allContentItems.concat(data.items);
            continuationToken = (_b = (_a = data.pagination) === null || _a === void 0 ? void 0 : _a.continuationToken) !== null && _b !== void 0 ? _b : "";
        } while (continuationToken != "");
        console.log(`Fetched ${allContentItems.length} content items.`);
        return allContentItems;
    });
}
exports.getAllContentItems = getAllContentItems;
function getAllContentTypes(apiClient) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let allContentTypes = [];
        let continuationToken = "";
        console.log('Fetching all content types, this may take a while...');
        do {
            let req = apiClient
                .listContentTypes();
            if (continuationToken) {
                req.xContinuationToken(continuationToken);
            }
            const data = (yield req.toPromise()).data;
            allContentTypes = allContentTypes.concat(data.items);
            continuationToken = (_b = (_a = data.pagination) === null || _a === void 0 ? void 0 : _a.continuationToken) !== null && _b !== void 0 ? _b : "";
        } while (continuationToken != "");
        console.log(`Fetched ${allContentTypes.length} content types.`);
        return allContentTypes;
    });
}
exports.getAllContentTypes = getAllContentTypes;
