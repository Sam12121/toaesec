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
/**
 * 
 * @export
 * @interface ModelNodeIdentifier
 */
export interface ModelNodeIdentifier {
    /**
     * 
     * @type {string}
     * @memberof ModelNodeIdentifier
     */
    node_id: string;
    /**
     * 
     * @type {string}
     * @memberof ModelNodeIdentifier
     */
    node_type: ModelNodeIdentifierNodeTypeEnum;
}


/**
 * @export
 */
export const ModelNodeIdentifierNodeTypeEnum = {
    Image: 'image',
    Host: 'host',
    Container: 'container',
    CloudAccount: 'cloud_account',
    Cluster: 'cluster',
    Registry: 'registry',
    Pod: 'pod'
} as const;
export type ModelNodeIdentifierNodeTypeEnum = typeof ModelNodeIdentifierNodeTypeEnum[keyof typeof ModelNodeIdentifierNodeTypeEnum];


/**
 * Check if a given object implements the ModelNodeIdentifier interface.
 */
export function instanceOfModelNodeIdentifier(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "node_id" in value;
    isInstance = isInstance && "node_type" in value;

    return isInstance;
}

export function ModelNodeIdentifierFromJSON(json: any): ModelNodeIdentifier {
    return ModelNodeIdentifierFromJSONTyped(json, false);
}

export function ModelNodeIdentifierFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelNodeIdentifier {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'node_id': json['node_id'],
        'node_type': json['node_type'],
    };
}

export function ModelNodeIdentifierToJSON(value?: ModelNodeIdentifier | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'node_id': value.node_id,
        'node_type': value.node_type,
    };
}

