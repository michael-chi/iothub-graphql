"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_subscriptions_1 = require("graphql-subscriptions");
var apollo_server_1 = require("apollo-server");
var deviceClient_1 = require("../api/deviceClient");
var pubsub = new graphql_subscriptions_1.PubSub();
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  extend type Query {\n    \" get all devices \"\n    devices: [IoTHubDeviceType]\n  }\n\n  extend type Mutation {\n    \" add or update an IoT Device \"\n    upsertDevice(input: IoTHubDeviceInputType!): IoTHubDeviceType\n  }\n\n  extend type Subscription {\n    \" called when a new post is created \"\n    deviceUpserted: IoTHubDeviceType\n  }\n\n  \" input to create a new post \"\n  input IoTHubDeviceInputType {\n    text: String\n  }\n  type IoTHubDeviceCapabilitityType{\n    iotEdge: Boolean\n  }\n  type IoTHubDeviceType {\n    deviceId: String\n    generationId: String\n    etag: String\n    connectionState: String\n    status: String\n    statusReason: String\n    connectionStateUpdatedTime: String\n    statusUpdatedTime: String\n    lastActivityTime: String\n    cloudToDeviceMessageCount: Int\n    capabilities: IoTHubDeviceCapabilitityType\n    authentication: IoTHubDeviceAuthenticationType\n  }\n  type IoTHubDeviceKeyPairType{\n    primaryKey: String\n    secondaryKey: String\n  }\n  type IoTHubDeviceAuthenticationType\n  { \n    symmetricKey: IoTHubDeviceKeyPairType\n    x509Thumbprint: IoTHubDeviceThumbprintType\n    type: String\n  }\n  type IoTHubDeviceThumbprintType {\n    primaryThumbprint: String\n    secondaryThumbprint: String\n  }\n"], ["\n  extend type Query {\n    \" get all devices \"\n    devices: [IoTHubDeviceType]\n  }\n\n  extend type Mutation {\n    \" add or update an IoT Device \"\n    upsertDevice(input: IoTHubDeviceInputType!): IoTHubDeviceType\n  }\n\n  extend type Subscription {\n    \" called when a new post is created \"\n    deviceUpserted: IoTHubDeviceType\n  }\n\n  \" input to create a new post \"\n  input IoTHubDeviceInputType {\n    text: String\n  }\n  type IoTHubDeviceCapabilitityType{\n    iotEdge: Boolean\n  }\n  type IoTHubDeviceType {\n    deviceId: String\n    generationId: String\n    etag: String\n    connectionState: String\n    status: String\n    statusReason: String\n    connectionStateUpdatedTime: String\n    statusUpdatedTime: String\n    lastActivityTime: String\n    cloudToDeviceMessageCount: Int\n    capabilities: IoTHubDeviceCapabilitityType\n    authentication: IoTHubDeviceAuthenticationType\n  }\n  type IoTHubDeviceKeyPairType{\n    primaryKey: String\n    secondaryKey: String\n  }\n  type IoTHubDeviceAuthenticationType\n  { \n    symmetricKey: IoTHubDeviceKeyPairType\n    x509Thumbprint: IoTHubDeviceThumbprintType\n    type: String\n  }\n  type IoTHubDeviceThumbprintType {\n    primaryThumbprint: String\n    secondaryThumbprint: String\n  }\n"])));
function get_devices(connectString) {
    return __awaiter(this, void 0, void 0, function () {
        var results, devices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deviceClient_1.listDevices(connectString)];
                case 1:
                    results = _a.sent();
                    devices = results.responseBody;
                    return [2 /*return*/, devices.map(function (x) { return ({
                            deviceId: x.deviceId,
                            generationId: x.generationId,
                            etag: x.etag,
                            connectionState: x.connectionState,
                            status: x.status,
                            statusReason: x.statusReason,
                            connectionStateUpdatedTime: x.connectionStateUpdatedTime,
                            statusUpdatedTime: x.statusUpdatedTime,
                            lastActivityTime: x.lastActivityTime,
                            cloudToDeviceMessageCount: x.cloudToDeviceMessageCount,
                            capabilities: x.capabilities,
                            authentication: x.authentication
                        }); })];
            }
        });
    });
}
exports.default = {
    resolvers: {
        Query: {
            // get devices
            devices: function (root, _a, _b) {
                var input = _a.input;
                var connectionString = _b.connectionString;
                return get_devices('HostName=michi-vision-ai-kit.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=zJbZb+CgR6Oh/VuJWIFoJBI9Vrs2W/lxAtESs/SXK1A=');
                //return get_devices(connectionString);
            },
        },
        Mutation: {
            // create a post
            upsertDevice: function (root, _a, context) {
                var input = _a.input;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        return [2 /*return*/, null];
                    });
                });
            },
        },
        Subscription: {
            deviceUpserted: {
                subscribe: function (root, args, context) {
                    return pubsub.asyncIterator('deviceUpserted');
                },
            },
        }
        // ,
        // Post: {
        //   user: (post: Partial<GQL.Post>) => getPublicUser(post.userId),
        // },
    },
    typeDefs: [typeDefs],
};
var templateObject_1;
