//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License file under the project root for license information.
//-----------------------------------------------------------------------------
import { IModuleInfo } from "sfx.module-manager";
import { ILog } from "sfx.logging";
import { ICertificateLoader, IPkiCertificateService } from "sfx.cert";
import { IHttpClient } from "sfx.http";
import { SelectClientCertAsyncHandler, IAadMetadata } from "sfx.http.auth";
import { WebContents } from "electron";

import * as appUtils from "../../utilities/appUtils";

import { HttpProtocols } from "./common";
import handleJsonRequest from "./request-handlers/handle-json";
import handleJsonResponse from "./response-handlers/handle-json";
import handleRedirectionResponse from "./response-handlers/handle-redirection";
import handleAuthAadResponse from "./response-handlers/handle-auth-aad";
import handleAuthCertResponse from "./response-handlers/handle-auth-cert";
import NodeHttpClientBuilder from "./node.http-client-builder";
import ElectronHttpClientBuilder from "./electron.http-client-builder";

function buildNodeHttpClient(log: ILog, certLoader: ICertificateLoader, protocol: string): IHttpClient {
    const clientBuilder = new NodeHttpClientBuilder(log, certLoader);

    // Request handlers
    clientBuilder.handleRequest(handleJsonRequest);

    // Response handlers
    clientBuilder
        .handleResponse(handleRedirectionResponse)
        .handleResponse(handleJsonResponse);

    return clientBuilder.build(protocol);
}

function buildElectronHttpClient(log: ILog, protocol: string): IHttpClient {
    const clientBuilder = new ElectronHttpClientBuilder(log);

    // Request handlers
    clientBuilder.handleRequest(handleJsonRequest);

    // Response handlers
    clientBuilder
        .handleResponse(handleRedirectionResponse)
        .handleResponse(handleJsonResponse);

    return clientBuilder.build(protocol);
}

export function getModuleMetadata(): IModuleInfo {
    return {
        name: "http",
        version: appUtils.getAppVersion(),
        components: [
            {
                name: "http.http-client",
                version: appUtils.getAppVersion(),
                descriptor: (log: ILog, certLoader: ICertificateLoader) => buildNodeHttpClient(log, certLoader, HttpProtocols.any),
                deps: ["logging", "cert.cert-loader"]
            },
            {
                name: "http.https-client",
                version: appUtils.getAppVersion(),
                descriptor: (log: ILog, certLoader: ICertificateLoader) => buildNodeHttpClient(log, certLoader, HttpProtocols.https),
                deps: ["logging", "cert.cert-loader"]
            },
            {
                name: "http.node-http-client",
                version: appUtils.getAppVersion(),
                descriptor: (log: ILog, certLoader: ICertificateLoader) => buildNodeHttpClient(log, certLoader, HttpProtocols.any),
                deps: ["logging", "cert.cert-loader"]
            },
            {
                name: "http.node-https-client",
                version: appUtils.getAppVersion(),
                descriptor: (log: ILog, certLoader: ICertificateLoader) => buildNodeHttpClient(log, certLoader, HttpProtocols.https),
                deps: ["logging", "cert.cert-loader"]
            },
            {
                name: "http.electron-http-client",
                version: appUtils.getAppVersion(),
                descriptor: (log: ILog) => buildElectronHttpClient(log, HttpProtocols.any),
                deps: ["logging"]
            },
            {
                name: "http.electron-https-client",
                version: appUtils.getAppVersion(),
                descriptor: (log: ILog) => buildElectronHttpClient(log, HttpProtocols.https),
                deps: ["logging"]
            },
            {
                name: "http.node-client-builder",
                version: appUtils.getAppVersion(),
                descriptor: (log: ILog, certLoader: ICertificateLoader) => new NodeHttpClientBuilder(log, certLoader),
                deps: ["logging", "cert.cert-loader"]
            },
            {
                name: "http.electron-client-builder",
                version: appUtils.getAppVersion(),
                descriptor: (log: ILog) => new ElectronHttpClientBuilder(log),
                deps: ["logging"]
            },

            // Request Handlers
            {
                name: "http.request-handlers.handle-json",
                version: appUtils.getAppVersion(),
                descriptor: () => handleJsonRequest
            },

            // Response Handlers
            {
                name: "http.response-handlers.handle-redirection",
                version: appUtils.getAppVersion(),
                descriptor: () => handleRedirectionResponse
            },
            {
                name: "http.response-handlers.handle-json",
                version: appUtils.getAppVersion(),
                descriptor: () => handleJsonResponse
            },
            {
                name: "http.response-handlers.handle-auth-aad",
                version: appUtils.getAppVersion(),
                descriptor: (handlingHost: WebContents, aadMetadata: IAadMetadata) => handleAuthAadResponse.bind(null, handlingHost, aadMetadata)
            },
            {
                name: "http.response-handlers.handle-auth-cert",
                version: appUtils.getAppVersion(),
                descriptor:
                    (certLoader: ICertificateLoader, pkiCertSvc: IPkiCertificateService, selectClientCertAsyncHandler: SelectClientCertAsyncHandler) =>
                        handleAuthCertResponse.bind(null, certLoader, pkiCertSvc, selectClientCertAsyncHandler),
                deps: ["cert.cert-loader", "cert.pki-service"]
            }
        ]
    };
}