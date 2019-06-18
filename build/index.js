"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
// ApolloServer: 讓我們啟動 server 的 class ，不但實作許多 GraphQL 功能也提供 web application 的功能 (背後使用 express)
// gql: template literal tag, 讓你在 Javascript 中使用 GraphQL 語法
// 1. GraphQL Schema 定義
var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    \"A simple type for getting started!\"\n    hello: String\n  }\n"], ["\n  type Query {\n    \"A simple type for getting started!\"\n    hello: String\n  }\n"])));
// 2. Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
var resolvers = {
    Query: {
        // 需注意名稱一定要對到 Schema 中 field 的名稱
        hello: function () { return 'world'; }
    }
};
// 3. 初始化 Web Server ，需傳入 typeDefs (Schema) 與 resolvers (Resolver)
var apolloConfig = {
    schemas: schema_1.schemas,
    playground: {
        settings: {
            'editor.theme': 'dark',
            'editor.cursorShape': 'line',
        },
    },
};
var server = new ApolloServer(apolloConfig);
// const server = new ApolloServer({
//   // Schema 部分
//   typeDefs,
//   // Resolver 部分
//   resolvers
// });
// 4. 啟動 Server
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("? Server ready at " + url);
});
var templateObject_1;
