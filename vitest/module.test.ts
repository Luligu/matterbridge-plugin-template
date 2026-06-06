// Warning: the tests in this unit are supposed to run sequentially.

import path from 'node:path';

import { MatterbridgeEndpoint, PlatformMatterbridge } from 'matterbridge';
import { AnsiLogger, LogLevel } from 'matterbridge/logger';
import { VendorId } from 'matterbridge/matter';

import { TemplatePlatform, TemplatePlatformConfig } from '../src/module.js';

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
  rootDirectory: path.join('.cache', 'vitest', 'TemplatePlugin'),
  homeDirectory: path.join('.cache', 'vitest', 'TemplatePlugin'),
  matterbridgeDirectory: path.join('.cache', 'vitest', 'TemplatePlugin', '.matterbridge'),
  matterbridgePluginDirectory: path.join('.cache', 'vitest', 'TemplatePlugin', 'Matterbridge'),
  matterbridgeCertDirectory: path.join('.cache', 'vitest', 'TemplatePlugin', '.mattercert'),
  globalModulesDirectory: path.join('.cache', 'vitest', 'TemplatePlugin', 'node_modules'),
  matterbridgeVersion: '3.8.0',
  matterbridgeLatestVersion: '3.8.0',
  matterbridgeDevVersion: '3.8.0',
  frontendVersion: '3.8.1',
  bridgeMode: 'bridge',
  restartMode: '',
  virtualMode: 'mounted_switch',
  aggregatorVendorId: VendorId(0xfff1),
  aggregatorVendorName: 'Matterbridge',
  aggregatorProductId: 0x8000,
  aggregatorProductName: 'Matterbridge Vitest Aggregator',
};

const mockLog = {
  fatal: vi.fn((message: string, ...parameters: any[]) => {}),
  error: vi.fn((message: string, ...parameters: any[]) => {}),
  warn: vi.fn((message: string, ...parameters: any[]) => {}),
  notice: vi.fn((message: string, ...parameters: any[]) => {}),
  info: vi.fn((message: string, ...parameters: any[]) => {}),
  debug: vi.fn((message: string, ...parameters: any[]) => {}),
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
const addBridgedEndpoint = vi.fn(async (pluginName: string, device: MatterbridgeEndpoint) => {});
const removeBridgedEndpoint = vi.fn(async (pluginName: string, device: MatterbridgeEndpoint) => {});
const removeAllBridgedEndpoints = vi.fn(async (pluginName: string) => {});
const registerVirtualDevice = vi.fn(async (name: string, type: 'light' | 'outlet' | 'switch' | 'mounted_switch', callback: () => Promise<void>) => {});

// Mock the logger
const loggerLogSpy = vi.spyOn(AnsiLogger.prototype, 'log').mockImplementation((level: string, message: string, ...parameters: any[]) => {});

describe('Matterbridge Plugin Template', () => {
  let instance: TemplatePlatform;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should throw an error if matterbridge is not the required version', async () => {
    expect(() => new TemplatePlatform({ ...mockMatterbridge, matterbridgeVersion: '2.0.0' }, mockLog, mockConfig)).toThrow(
      'This plugin requires Matterbridge version >= "3.8.0". Please update Matterbridge from 2.0.0 to the latest version in the frontend.',
    );
  });

  it('should create an instance of the platform', async () => {
    instance = (await import('../src/module.js')).default(mockMatterbridge, mockLog, mockConfig) as TemplatePlatform;
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
    await instance.onStart('Vitest');
    expect(mockLog.info).toHaveBeenCalledWith('onStart called with reason: Vitest');
    await instance.onStart();
    expect(mockLog.info).toHaveBeenCalledWith('onStart called with reason: none');
    expect(addBridgedEndpoint).not.toHaveBeenCalled();
  });

  it('should start', async () => {
    mockConfig.whiteList = [];
    await instance.onStart('Vitest');
    expect(mockLog.info).toHaveBeenCalledWith('onStart called with reason: Vitest');
    await instance.onStart();
    expect(mockLog.info).toHaveBeenCalledWith('onStart called with reason: none');
    expect(addBridgedEndpoint).toHaveBeenCalledTimes(1);
  });

  it('should call the command handlers', async () => {
    for (const device of instance.getDevices()) {
      if (device.hasClusterServer('onOff')) {
        await device.executeCommandHandler('on', {}, 'onOff', {} as any, device);
        await device.executeCommandHandler('off', {}, 'onOff', {} as any, device);
      }
    }
    expect(mockLog.info).toHaveBeenCalledWith('Command on called on cluster onOff');
    expect(mockLog.info).toHaveBeenCalledWith('Command off called on cluster onOff');
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
    await instance.onShutdown('Vitest');
    expect(mockLog.info).toHaveBeenCalledWith('onShutdown called with reason: Vitest');
    expect(removeAllBridgedEndpoints).not.toHaveBeenCalled();

    // Mock the unregisterOnShutdown behavior
    mockConfig.unregisterOnShutdown = true;
    await instance.onShutdown();
    expect(mockLog.info).toHaveBeenCalledWith('onShutdown called with reason: none');
    expect(removeAllBridgedEndpoints).toHaveBeenCalled();
    mockConfig.unregisterOnShutdown = false;
  });
});
