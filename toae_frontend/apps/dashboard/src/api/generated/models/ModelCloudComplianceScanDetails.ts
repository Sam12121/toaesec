/* tslint:disable */
/* eslint-disable */
/**
 * Toae ThreatMapper
 * Toae Runtime API provides programmatic control over Toae microservice securing your container, kubernetes and cloud deployments. The API abstracts away underlying infrastructure details like cloud provider,  container distros, container orchestrator and type of deployment. This is one uniform API to manage and control security alerts, policies and response to alerts for microservices running anywhere i.e. managed pure greenfield container deployments or a mix of containers, VMs and serverless paradigms like AWS Fargate.
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: toaedev@toaesecurity.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { ModelCloudComplianceBenchmark } from './ModelCloudComplianceBenchmark';
import {
    ModelCloudComplianceBenchmarkFromJSON,
    ModelCloudComplianceBenchmarkFromJSONTyped,
    ModelCloudComplianceBenchmarkToJSON,
} from './ModelCloudComplianceBenchmark';

/**
 * 
 * @export
 * @interface ModelCloudComplianceScanDetails
 */
export interface ModelCloudComplianceScanDetails {
    /**
     * 
     * @type {string}
     * @memberof ModelCloudComplianceScanDetails
     */
    account_id?: string;
    /**
     * 
     * @type {Array<ModelCloudComplianceBenchmark>}
     * @memberof ModelCloudComplianceScanDetails
     */
    benchmarks?: Array<ModelCloudComplianceBenchmark> | null;
    /**
     * 
     * @type {string}
     * @memberof ModelCloudComplianceScanDetails
     */
    scan_id?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ModelCloudComplianceScanDetails
     */
    scan_types?: Array<string> | null;
    /**
     * 
     * @type {boolean}
     * @memberof ModelCloudComplianceScanDetails
     */
    stop_requested?: boolean;
}

/**
 * Check if a given object implements the ModelCloudComplianceScanDetails interface.
 */
export function instanceOfModelCloudComplianceScanDetails(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ModelCloudComplianceScanDetailsFromJSON(json: any): ModelCloudComplianceScanDetails {
    return ModelCloudComplianceScanDetailsFromJSONTyped(json, false);
}

export function ModelCloudComplianceScanDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelCloudComplianceScanDetails {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'account_id': !exists(json, 'account_id') ? undefined : json['account_id'],
        'benchmarks': !exists(json, 'benchmarks') ? undefined : (json['benchmarks'] === null ? null : (json['benchmarks'] as Array<any>).map(ModelCloudComplianceBenchmarkFromJSON)),
        'scan_id': !exists(json, 'scan_id') ? undefined : json['scan_id'],
        'scan_types': !exists(json, 'scan_types') ? undefined : json['scan_types'],
        'stop_requested': !exists(json, 'stop_requested') ? undefined : json['stop_requested'],
    };
}

export function ModelCloudComplianceScanDetailsToJSON(value?: ModelCloudComplianceScanDetails | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'account_id': value.account_id,
        'benchmarks': value.benchmarks === undefined ? undefined : (value.benchmarks === null ? null : (value.benchmarks as Array<any>).map(ModelCloudComplianceBenchmarkToJSON)),
        'scan_id': value.scan_id,
        'scan_types': value.scan_types,
        'stop_requested': value.stop_requested,
    };
}
