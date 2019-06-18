"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var apollo_server_1 = require("apollo-server");
var iot_devices_resolvers_1 = __importDefault(require("../graphql/iot_devices_resolvers"));
// create our schema
function withArraysConcatination(objValue, srcValue) {
    // if an array, concat it
    if (lodash_1.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
    // use the normal lodash merge functionality
}
// allows us to merge schemas
exports.mergeRawSchemas = function () {
    var schemas = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        schemas[_i] = arguments[_i];
    }
    return lodash_1.mergeWith.apply(void 0, [{}].concat(schemas, [withArraysConcatination]));
};
var rawSchemas = exports.mergeRawSchemas({
    typeDefs: [
        // we create empty main types, we can later extend them in the shards
        apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                   type Query {\n                      _empty: String\n                  }\n                  type Mutation {\n                      _empty: String\n                  }\n                  type Subscription {\n                      _empty: String\n                  }\n              "], ["\n                   type Query {\n                      _empty: String\n                  }\n                  type Mutation {\n                      _empty: String\n                  }\n                  type Subscription {\n                      _empty: String\n                  }\n              "]))),
    ],
    resolvers: {},
}, iot_devices_resolvers_1.default);
// let rawSchemas = mergeRawSchemas(
//     devices
// );
exports.schema = rawSchemas.typeDefs;
exports.resolvers = rawSchemas.resolvers;
exports.graphqlSchemas = rawSchemas;
var templateObject_1;
