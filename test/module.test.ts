/**
 * WARNING!!!
 * The tests in this unit are supposed to run sequentially because they depend on the Matterbridge/Matter state.
 * Is not possible for timing reasons to create and destroy a Matter node each test to keep isolation.
 */

// oxlint-disable jest/no-conditional-expect

import path from 'node:path';

import { jest } from '@jest/globals';
import type { MatterbridgeEndpoint, PlatformMatterbridge } from 'matterbridge';
import { AnsiLogger, LogLevel } from 'matterbridge/logger';
import type { ActionContext } from 'matterbridge/matter';
import { VendorId } from 'matterbridge/matter';
import { OnOff, Thermostat } from 'matterbridge/matter/clusters';

import { TemplatePlatform, type TemplatePlatformConfig } from '../src/module.js';

const mockMatterbridge: PlatformMatterbridge = {
  systemInformation: {
    interfaceName: 'eth0',
    macAddress: 'aa:bb:cc:dd:ee:ff',
    ipv4Address: '192.168.1.1',
    ipv6Address: 'fd78:cbf8:4939:746:a96:8277:346f:416e',
    osRelease: 'x.y.z',
    nodeVersion: '22.10.0',
    hostname: 'matterbridge',
    user: 'jest',
    osType: 'Linux',
    osPlatform: 'linux',
    osArch: 'x64',
    totalMemory: '0 B',
    freeMemory: '0 B',
    systemUptime: '0s',
    processUptime: '0s',
    cpuUsage: '0%',
    processCpuUsage: '0%',
    rss: '0 B',
    heapTotal: '0 B',
    heapUsed: '0 B',
  },
  uuid: '00000000-0000-0000-0000-000000000000',
  rootDirectory: path.join('.cache', 'jest', 'TemplatePlugin'),
  homeDirectory: path.join('.cache', 'jest', 'TemplatePlugin'),
  matterbridgeDirectory: path.join('.cache', 'jest', 'TemplatePlugin', '.matterbridge'),
  matterbridgePluginDirectory: path.join('.cache', 'jest', 'TemplatePlugin', 'Matterbridge'),
  matterbridgeCertDirectory: path.join('.cache', 'jest', 'TemplatePlugin', '.mattercert'),
  globalModulesDirectory: path.join('.cache', 'jest', 'TemplatePlugin', 'node_modules'),
  matterbridgeVersion: '3.9.0',
  matterbridgeLatestVersion: '3.9.0',
  matterbridgeDevVersion: '3.9.0',
  frontendVersion: '3.0.0',
  bridgeMode: 'bridge',
  restartMode: 'docker',
  virtualMode: 'mounted_switch',
  aggregatorVendorId: VendorId(0xfff1),
  aggregatorVendorName: 'Matterbridge',
  aggregatorProductId: 0x8000,
  aggregatorProductName: 'Matterbridge Jest Aggregator',
};

const mockLog = {
  fatal: jest.fn((message: string, ...parameters: any[]) => {}),
  error: jest.fn((message: string, ...parameters: any[]) => {}),
  warn: jest.fn((message: string, ...parameters: any[]) => {}),
  notice: jest.fn((message: string, ...parameters: any[]) => {}),
  info: jest.fn((message: string, ...parameters: any[]) => {}),
  debug: jest.fn((message: string, ...parameters: any[]) => {}),
} as unknown as AnsiLogger;

const mockConfig: TemplatePlatformConfig = {
  name: 'matterbridge-plugin-template',
  type: 'DynamicPlatform',
  version: '1.0.0',
  whiteList: [],
  blackList: [],
  debug: false,
  unregisterOnShutdown: false,
};

// Mocked methods
const addBridgedEndpoint = jest.fn(async (pluginName: string, device: MatterbridgeEndpoint) => {});
const removeBridgedEndpoint = jest.fn(async (pluginName: string, device: MatterbridgeEndpoint) => {});
const removeAllBridgedEndpoints = jest.fn(async (pluginName: string) => {});
const registerVirtualDevice = jest.fn(async (name: string, type: 'light' | 'outlet' | 'switch' | 'mounted_switch', callback: () => Promise<void>) => {});

// Mock the logger
const loggerLogSpy = jest.spyOn(AnsiLogger.prototype, 'log').mockImplementation((level: string, message: string, ...parameters: any[]) => {});

describe('Matterbridge Plugin Template', () => {
  let instance: TemplatePlatform;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should throw an error if matterbridge is not the required version', () => {
    expect(() => new TemplatePlatform({ ...mockMatterbridge, matterbridgeVersion: '2.0.0' }, mockLog, mockConfig)).toThrow(
      'This plugin requires Matterbridge version >= "3.9.0". Please update Matterbridge from 2.0.0 to the latest version in the frontend.',
    );
  });

  it('should create an instance of the platform', async () => {
    instance = (await import('../src/module.js')).default(mockMatterbridge, mockLog, mockConfig);
    expect(instance).toBeInstanceOf(TemplatePlatform);
    // @ts-expect-error Accessing private method for testing purposes
    instance.setMatterNode(addBridgedEndpoint, removeBridgedEndpoint, removeAllBridgedEndpoints, registerVirtualDevice);
    expect(instance.matterbridge).toBe(mockMatterbridge);
    expect(instance.log).toBe(mockLog);
    expect(instance.config).toBe(mockConfig);
    expect(mockLog.info).toHaveBeenCalledWith('Initializing Platform...');
  });

  it('should start with no devices selected', async () => {
    mockConfig.whiteList = ['No devices'];
    await instance.onStart('Jest');
    expect(mockLog.info).toHaveBeenCalledWith('onStart called with reason: Jest');
    await instance.onStart();
    expect(mockLog.info).toHaveBeenCalledWith('onStart called with reason: none');
    expect(addBridgedEndpoint).not.toHaveBeenCalled();
  });

  it('should start', async () => {
    mockConfig.whiteList = [];
    await instance.onStart('Jest');
    expect(mockLog.info).toHaveBeenCalledWith('onStart called with reason: Jest');
    await instance.onStart();
    expect(mockLog.info).toHaveBeenCalledWith('onStart called with reason: none');
    expect(addBridgedEndpoint).toHaveBeenCalledTimes(2);
  });

  it('should call the command subscribe handlers', async () => {
    for (const device of instance.getDevices()) {
      if (device.hasClusterServer(OnOff)) {
        await device.executeCommandHandler('on', {}, 'onOff', {} as any, device);
        await device.executeCommandHandler('off', {}, 'onOff', {} as any, device);
        expect(mockLog.info).toHaveBeenCalledWith('Command on called on cluster onOff');
        expect(mockLog.info).toHaveBeenCalledWith('Command off called on cluster onOff');
      }
      if (device.hasClusterServer(Thermostat)) {
        const offlineContext = { fabric: undefined } as ActionContext;
        device.eventsOf('thermostat').systemMode$Changed?.emit(Thermostat.SystemMode.Off, Thermostat.SystemMode.Auto, offlineContext);
        device.eventsOf('thermostat').occupiedCoolingSetpoint$Changed?.emit(27, 25, offlineContext);
        device.eventsOf('thermostat').occupiedHeatingSetpoint$Changed?.emit(19, 21, offlineContext);
        expect(mockLog.info).toHaveBeenCalledWith('Attribute systemMode changed offline from 1 to 0');
        expect(mockLog.info).toHaveBeenCalledWith('Attribute occupiedCoolingSetpoint changed offline from 25 to 27');
        expect(mockLog.info).toHaveBeenCalledWith('Attribute occupiedHeatingSetpoint changed offline from 21 to 19');

        const onlineContext = { fabric: 1 } as ActionContext;
        device.eventsOf('thermostat').systemMode$Changed?.emit(Thermostat.SystemMode.Off, Thermostat.SystemMode.Auto, onlineContext);
        device.eventsOf('thermostat').occupiedCoolingSetpoint$Changed?.emit(27, 25, onlineContext);
        device.eventsOf('thermostat').occupiedHeatingSetpoint$Changed?.emit(19, 21, onlineContext);
        expect(mockLog.info).toHaveBeenCalledWith('Attribute systemMode changed online from 1 to 0');
        expect(mockLog.info).toHaveBeenCalledWith('Attribute occupiedCoolingSetpoint changed online from 25 to 27');
        expect(mockLog.info).toHaveBeenCalledWith('Attribute occupiedHeatingSetpoint changed online from 21 to 19');
      }
    }
  });

  it('should configure', async () => {
    await instance.onConfigure();
    expect(mockLog.info).toHaveBeenCalledWith('onConfigure called');
    expect(mockLog.info).toHaveBeenCalledWith(expect.stringContaining('Configuring device'));
  });

  it('should change logger level', async () => {
    await instance.onChangeLoggerLevel(LogLevel.DEBUG);
    expect(mockLog.info).toHaveBeenCalledWith('onChangeLoggerLevel called with: debug');
  });

  it('should shutdown', async () => {
    await instance.onShutdown('Jest');
    expect(mockLog.info).toHaveBeenCalledWith('onShutdown called with reason: Jest');
    expect(removeAllBridgedEndpoints).not.toHaveBeenCalled();

    // Mock the unregisterOnShutdown behavior
    mockConfig.unregisterOnShutdown = true;
    await instance.onShutdown();
    expect(mockLog.info).toHaveBeenCalledWith('onShutdown called with reason: none');
    expect(removeAllBridgedEndpoints).toHaveBeenCalled();
    mockConfig.unregisterOnShutdown = false;
  });
});
