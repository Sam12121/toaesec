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
import type { ModelContainerImage } from './ModelContainerImage';
import {
    ModelContainerImageFromJSON,
    ModelContainerImageFromJSONTyped,
    ModelContainerImageToJSON,
} from './ModelContainerImage';
import type { ModelProcess } from './ModelProcess';
import {
    ModelProcessFromJSON,
    ModelProcessFromJSONTyped,
    ModelProcessToJSON,
} from './ModelProcess';

/**
 * 
 * @export
 * @interface ModelContainer
 */
export interface ModelContainer {
    /**
     * 
     * @type {number}
     * @memberof ModelContainer
     */
    cpu_max: number;
    /**
     * 
     * @type {number}
     * @memberof ModelContainer
     */
    cpu_usage: number;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    docker_container_command: string;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    docker_container_created: string;
    /**
     * 
     * @type {Array<any>}
     * @memberof ModelContainer
     */
    docker_container_ips: Array<any> | null;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    docker_container_name: string;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    docker_container_network_mode: string;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    docker_container_networks: string;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    docker_container_ports: string;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    docker_container_state: string;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    docker_container_state_human: string;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ModelContainer
     */
    docker_labels: { [key: string]: any; } | null;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    host_name: string;
    /**
     * 
     * @type {ModelContainerImage}
     * @memberof ModelContainer
     */
    image: ModelContainerImage;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    malware_latest_scan_id: string;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    malware_scan_status: string;
    /**
     * 
     * @type {number}
     * @memberof ModelContainer
     */
    malwares_count: number;
    /**
     * 
     * @type {number}
     * @memberof ModelContainer
     */
    memory_max: number;
    /**
     * 
     * @type {number}
     * @memberof ModelContainer
     */
    memory_usage: number;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    node_id: string;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    node_name: string;
    /**
     * 
     * @type {Array<ModelProcess>}
     * @memberof ModelContainer
     */
    processes: Array<ModelProcess> | null;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    secret_latest_scan_id: string;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    secret_scan_status: string;
    /**
     * 
     * @type {number}
     * @memberof ModelContainer
     */
    secrets_count: number;
    /**
     * 
     * @type {number}
     * @memberof ModelContainer
     */
    uptime: number;
    /**
     * 
     * @type {number}
     * @memberof ModelContainer
     */
    vulnerabilities_count: number;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    vulnerability_latest_scan_id: string;
    /**
     * 
     * @type {string}
     * @memberof ModelContainer
     */
    vulnerability_scan_status: string;
}

/**
 * Check if a given object implements the ModelContainer interface.
 */
export function instanceOfModelContainer(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "cpu_max" in value;
    isInstance = isInstance && "cpu_usage" in value;
    isInstance = isInstance && "docker_container_command" in value;
    isInstance = isInstance && "docker_container_created" in value;
    isInstance = isInstance && "docker_container_ips" in value;
    isInstance = isInstance && "docker_container_name" in value;
    isInstance = isInstance && "docker_container_network_mode" in value;
    isInstance = isInstance && "docker_container_networks" in value;
    isInstance = isInstance && "docker_container_ports" in value;
    isInstance = isInstance && "docker_container_state" in value;
    isInstance = isInstance && "docker_container_state_human" in value;
    isInstance = isInstance && "docker_labels" in value;
    isInstance = isInstance && "host_name" in value;
    isInstance = isInstance && "image" in value;
    isInstance = isInstance && "malware_latest_scan_id" in value;
    isInstance = isInstance && "malware_scan_status" in value;
    isInstance = isInstance && "malwares_count" in value;
    isInstance = isInstance && "memory_max" in value;
    isInstance = isInstance && "memory_usage" in value;
    isInstance = isInstance && "node_id" in value;
    isInstance = isInstance && "node_name" in value;
    isInstance = isInstance && "processes" in value;
    isInstance = isInstance && "secret_latest_scan_id" in value;
    isInstance = isInstance && "secret_scan_status" in value;
    isInstance = isInstance && "secrets_count" in value;
    isInstance = isInstance && "uptime" in value;
    isInstance = isInstance && "vulnerabilities_count" in value;
    isInstance = isInstance && "vulnerability_latest_scan_id" in value;
    isInstance = isInstance && "vulnerability_scan_status" in value;

    return isInstance;
}

export function ModelContainerFromJSON(json: any): ModelContainer {
    return ModelContainerFromJSONTyped(json, false);
}

export function ModelContainerFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelContainer {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'cpu_max': json['cpu_max'],
        'cpu_usage': json['cpu_usage'],
        'docker_container_command': json['docker_container_command'],
        'docker_container_created': json['docker_container_created'],
        'docker_container_ips': json['docker_container_ips'],
        'docker_container_name': json['docker_container_name'],
        'docker_container_network_mode': json['docker_container_network_mode'],
        'docker_container_networks': json['docker_container_networks'],
        'docker_container_ports': json['docker_container_ports'],
        'docker_container_state': json['docker_container_state'],
        'docker_container_state_human': json['docker_container_state_human'],
        'docker_labels': json['docker_labels'],
        'host_name': json['host_name'],
        'image': ModelContainerImageFromJSON(json['image']),
        'malware_latest_scan_id': json['malware_latest_scan_id'],
        'malware_scan_status': json['malware_scan_status'],
        'malwares_count': json['malwares_count'],
        'memory_max': json['memory_max'],
        'memory_usage': json['memory_usage'],
        'node_id': json['node_id'],
        'node_name': json['node_name'],
        'processes': (json['processes'] === null ? null : (json['processes'] as Array<any>).map(ModelProcessFromJSON)),
        'secret_latest_scan_id': json['secret_latest_scan_id'],
        'secret_scan_status': json['secret_scan_status'],
        'secrets_count': json['secrets_count'],
        'uptime': json['uptime'],
        'vulnerabilities_count': json['vulnerabilities_count'],
        'vulnerability_latest_scan_id': json['vulnerability_latest_scan_id'],
        'vulnerability_scan_status': json['vulnerability_scan_status'],
    };
}

export function ModelContainerToJSON(value?: ModelContainer | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'cpu_max': value.cpu_max,
        'cpu_usage': value.cpu_usage,
        'docker_container_command': value.docker_container_command,
        'docker_container_created': value.docker_container_created,
        'docker_container_ips': value.docker_container_ips,
        'docker_container_name': value.docker_container_name,
        'docker_container_network_mode': value.docker_container_network_mode,
        'docker_container_networks': value.docker_container_networks,
        'docker_container_ports': value.docker_container_ports,
        'docker_container_state': value.docker_container_state,
        'docker_container_state_human': value.docker_container_state_human,
        'docker_labels': value.docker_labels,
        'host_name': value.host_name,
        'image': ModelContainerImageToJSON(value.image),
        'malware_latest_scan_id': value.malware_latest_scan_id,
        'malware_scan_status': value.malware_scan_status,
        'malwares_count': value.malwares_count,
        'memory_max': value.memory_max,
        'memory_usage': value.memory_usage,
        'node_id': value.node_id,
        'node_name': value.node_name,
        'processes': (value.processes === null ? null : (value.processes as Array<any>).map(ModelProcessToJSON)),
        'secret_latest_scan_id': value.secret_latest_scan_id,
        'secret_scan_status': value.secret_scan_status,
        'secrets_count': value.secrets_count,
        'uptime': value.uptime,
        'vulnerabilities_count': value.vulnerabilities_count,
        'vulnerability_latest_scan_id': value.vulnerability_latest_scan_id,
        'vulnerability_scan_status': value.vulnerability_scan_status,
    };
}

