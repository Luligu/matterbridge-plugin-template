/**
 * @file src/module.ts
 * @description This file contains the plugin template.
 * @author Luca Liguori
 * @created 2025-06-15
 * @version 2.0.0
 * @license Apache-2.0
 *
 * Copyright 2025, 2026, 2027 Luca Liguori.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { type BasePlatformConfig, MatterbridgeDynamicPlatform, MatterbridgeEndpoint, onOffPlugInUnit, type PlatformMatterbridge, thermostat } from 'matterbridge';
import type { AnsiLogger, LogLevel } from 'matterbridge/logger';
import type { ActionContext } from 'matterbridge/matter';
import { OnOff, Thermostat } from 'matterbridge/matter/clusters';

// This allows to have type checking and autocompletion for the instance config.
export type TemplatePlatformConfig = BasePlatformConfig & {
  whiteList: string[];
  blackList: string[];
};

/**
 * This is the standard interface for Matterbridge plugins.
 * Each plugin should export a default function that follows this signature.
 *
 * @param {PlatformMatterbridge} matterbridge - An instance of MatterBridge.
 * @param {AnsiLogger} log - An instance of AnsiLogger. This is used for logging messages in a format that can be displayed with ANSI color codes and in the frontend.
 * @param {TemplatePlatformConfig} config - The platform configuration.
 * @returns {TemplatePlatform} - An instance of the MatterbridgeAccessory or MatterbridgeDynamicPlatform class. This is the main interface for interacting with the Matterbridge system.
 */
export default function initializePlugin(matterbridge: PlatformMatterbridge, log: AnsiLogger, config: TemplatePlatformConfig): TemplatePlatform {
  return new TemplatePlatform(matterbridge, log, config);
}

// Here we define the TemplatePlatform class, which extends the MatterbridgeDynamicPlatform.
// If you want to create an Accessory platform plugin, you should extend the MatterbridgeAccessoryPlatform class instead.
export class TemplatePlatform extends MatterbridgeDynamicPlatform {
  constructor(matterbridge: PlatformMatterbridge, log: AnsiLogger, config: TemplatePlatformConfig) {
    // Always call super(matterbridge, log, config)
    super(matterbridge, log, config);

    // Verify that Matterbridge is the correct version
    if (typeof this.verifyMatterbridgeVersion !== 'function' || !this.verifyMatterbridgeVersion('3.9.0')) {
      throw new Error(
        `This plugin requires Matterbridge version >= "3.9.0". Please update Matterbridge from ${this.matterbridge.matterbridgeVersion} to the latest version in the frontend."`,
      );
    }

    this.log.info(`Initializing Platform...`);
    // You can initialize your platform here, like setting up initial state or loading configurations.
  }

  override async onStart(reason?: string): Promise<void> {
    this.log.info(`onStart called with reason: ${reason ?? 'none'}`);

    // Wait for the platform to fully load the select if you use them.
    await this.ready;

    // Clean the selectDevice and selectEntity maps, if you want to reset the select. This is useful when you have an API that sends all the devices and you want to rediscover all of them.
    await this.clearSelect();

    // Implements your own logic there
    await this.discoverDevices();
  }

  override async onConfigure(): Promise<void> {
    // Always call super.onConfigure()
    await super.onConfigure();

    this.log.info('onConfigure called');

    // Configure all your devices. The persisted attributes need to be updated.
    for (const device of this.getDevices()) {
      this.log.info(`Configuring device ${device.deviceName} with id ${device.originalId}`);
      // You can update the device state here, for example:
      if (device.id === 'outlet1') {
        // await device.setCluster(OnOff, { onOff: true }, this.log); // this.log is optional, but it is useful to log the attribute changes.
        await device.setAttribute(OnOff, 'onOff', true, this.log); // this.log is optional, but it is useful to log the attribute changes.
      }
      if (device.id === 'thermo1') {
        await device.setCluster(Thermostat, { systemMode: Thermostat.SystemMode.Heat }, this.log); // this.log is optional, but it is useful to log the attribute changes.
        // await device.setAttribute(Thermostat, 'systemMode', Thermostat.SystemMode.Heat, this.log); // this.log is optional, but it is useful to log the attribute changes.
      }
    }
  }

  // oxlint-disable-next-line typescript/require-await
  override async onChangeLoggerLevel(logLevel: LogLevel): Promise<void> {
    this.log.info(`onChangeLoggerLevel called with: ${logLevel}`);
    // Change here the logger level of the api you use or of your devices
  }

  override async onShutdown(reason?: string): Promise<void> {
    // Always call super.onShutdown(reason)
    await super.onShutdown(reason);

    this.log.info(`onShutdown called with reason: ${reason ?? 'none'}`);
    if (this.config.unregisterOnShutdown) await this.unregisterAllDevices();
  }

  private async discoverDevices(): Promise<void> {
    this.log.info('Discovering devices...');
    // Implement device discovery logic here.
    // For example, you might fetch devices from an API.
    // and register them with the Matterbridge instance.

    // Example: Create and register an outlet device (shows how to use the addCommandHandler method)
    // If you want to create an Accessory platform plugin and your platform extends MatterbridgeAccessoryPlatform,
    // instead of createDefaultBridgedDeviceBasicInformationClusterServer, call createDefaultBasicInformationClusterServer().
    const outlet = new MatterbridgeEndpoint(onOffPlugInUnit, { id: 'outlet1' })
      .createDefaultBridgedDeviceBasicInformationClusterServer('Outlet', 'SN123456', this.matterbridge.aggregatorVendorId, 'Matterbridge', 'Matterbridge Outlet', 10000, '1.0.0')
      .createDefaultPowerSourceWiredClusterServer()
      .addRequiredClusters() // This will add both server and client clusters that are required by the device.
      .addCommandHandler('on', (data) => {
        this.log.info(`Command on called on cluster ${data.cluster}`);
      })
      .addCommandHandler('off', (data) => {
        this.log.info(`Command off called on cluster ${data.cluster}`);
      });

    // Set the selectDevice for the outlet we created. This is used to link the device with the select in the frontend.
    this.setSelectDevice('SN123456', 'Outlet');

    // Validate the device with the select before registering it.
    if (this.validateDevice(['Outlet', 'SN123456'])) {
      // Register the device with this Matterbridge Platform.
      await this.registerDevice(outlet);
    }

    // Example: Create and register an thermostat device (shows how to use the subscribeAttribute method to listen for attribute changes)
    // If you want to create an Accessory platform plugin and your platform extends MatterbridgeAccessoryPlatform,
    // instead of createDefaultBridgedDeviceBasicInformationClusterServer, call createDefaultBasicInformationClusterServer().
    const thermo = new MatterbridgeEndpoint(thermostat, { id: 'thermo1' })
      .createDefaultBridgedDeviceBasicInformationClusterServer(
        'Thermostat',
        'SN654321',
        this.matterbridge.aggregatorVendorId,
        'Matterbridge',
        'Matterbridge Thermostat',
        10000,
        '1.0.0',
      )
      .createDefaultPowerSourceBatteryClusterServer()
      .addRequiredClusters() // This will add both server and client clusters that are required by the device.
      .subscribeAttribute(Thermostat, 'systemMode', (newValue: Thermostat.SystemMode, oldValue: Thermostat.SystemMode, context: ActionContext) => {
        this.log.info(`Attribute systemMode changed ${context.fabric === undefined ? 'offline' : 'online'} from ${oldValue} to ${newValue}`);
      })
      .subscribeAttribute(Thermostat, 'occupiedCoolingSetpoint', (newValue: number, oldValue: number, context: ActionContext) => {
        this.log.info(`Attribute occupiedCoolingSetpoint changed ${context.fabric === undefined ? 'offline' : 'online'} from ${oldValue} to ${newValue}`);
      })
      .subscribeAttribute(Thermostat, 'occupiedHeatingSetpoint', (newValue: number, oldValue: number, context: ActionContext) => {
        this.log.info(`Attribute occupiedHeatingSetpoint changed ${context.fabric === undefined ? 'offline' : 'online'} from ${oldValue} to ${newValue}`);
      });

    // Set the selectDevice for the thermostat we created. This is used to link the device with the select in the frontend.
    this.setSelectDevice('SN654321', 'Thermostat');

    // Validate the device with the select before registering it.
    if (this.validateDevice(['Thermostat', 'SN654321'])) {
      // Register the device with this Matterbridge Platform.
      await this.registerDevice(thermo);
    }
  }
}
