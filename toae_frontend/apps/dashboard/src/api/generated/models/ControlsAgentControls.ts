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
import type { ControlsAction } from './ControlsAction';
import {
    ControlsActionFromJSON,
    ControlsActionFromJSONTyped,
    ControlsActionToJSON,
} from './ControlsAction';

/**
 * 
 * @export
 * @interface ControlsAgentControls
 */
export interface ControlsAgentControls {
    /**
     * 
     * @type {number}
     * @memberof ControlsAgentControls
     */
    beatrate: number;
    /**
     * 
     * @type {Array<ControlsAction>}
     * @memberof ControlsAgentControls
     */
    commands: Array<ControlsAction> | null;
}

/**
 * Check if a given object implements the ControlsAgentControls interface.
 */
export function instanceOfControlsAgentControls(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "beatrate" in value;
    isInstance = isInstance && "commands" in value;

    return isInstance;
}

export function ControlsAgentControlsFromJSON(json: any): ControlsAgentControls {
    return ControlsAgentControlsFromJSONTyped(json, false);
}

export function ControlsAgentControlsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ControlsAgentControls {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'beatrate': json['beatrate'],
        'commands': (json['commands'] === null ? null : (json['commands'] as Array<any>).map(ControlsActionFromJSON)),
    };
}

export function ControlsAgentControlsToJSON(value?: ControlsAgentControls | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'beatrate': value.beatrate,
        'commands': (value.commands === null ? null : (value.commands as Array<any>).map(ControlsActionToJSON)),
    };
}
