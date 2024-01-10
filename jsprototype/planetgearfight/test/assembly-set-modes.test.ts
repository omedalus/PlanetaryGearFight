import { expect, test } from 'vitest';

import GearAssembly from '../src/model/GearAssembly';
import GearMode from '../src/model/GearMode';
import Gear from '../src/model/Gear';

test('starts in mode of Sun:Fixed, Planet:Follower, Ring:Driver', () => {
  const assembly = new GearAssembly(1, 1);
  expect(assembly.sun.mode).toBe(GearMode.Fixed);
  expect(assembly.planetCarrier.mode).toBe(GearMode.Follow);
  expect(assembly.ring.mode).toBe(GearMode.Drive);
});

test('When set to Direct, all become Direct', () => {
  const assembly = new GearAssembly(1, 1);
  expect(assembly.directDriveMode).toBe(false);

  assembly.sun.mode = GearMode.Direct;
  expect(assembly.sun.mode).toBe(GearMode.Direct);
  expect(assembly.planetCarrier.mode).toBe(GearMode.Direct);
  expect(assembly.ring.mode).toBe(GearMode.Direct);
  expect(assembly.directDriveMode).toBe(true);
});

test('Can set a null gear to Direct', () => {
  const assembly = new GearAssembly(1, 1);
  expect(assembly.directDriveMode).toBe(false);

  const r = assembly.setGearMode(null, GearMode.Direct);
  expect(r).toBe(true);

  expect(assembly.sun.mode).toBe(GearMode.Direct);
  expect(assembly.planetCarrier.mode).toBe(GearMode.Direct);
  expect(assembly.ring.mode).toBe(GearMode.Direct);
  expect(assembly.directDriveMode).toBe(true);
});

test('Cannot set a strange gear to Direct', () => {
  const assembly = new GearAssembly(1, 1);
  expect(assembly.directDriveMode).toBe(false);

  const gear = new Gear(assembly, 'strange');
  const r = assembly.setGearMode(gear, GearMode.Direct);
  expect(r).toBe(false);

  expect(assembly.sun.mode).not.toBe(GearMode.Direct);
  expect(assembly.planetCarrier.mode).not.toBe(GearMode.Direct);
  expect(assembly.ring.mode).not.toBe(GearMode.Direct);
  expect(assembly.directDriveMode).toBe(false);
});

test('When unsetting Direct, we get back original drive modes', () => {
  const assembly = new GearAssembly(1, 1);
  expect(assembly.directDriveMode).toBe(false);

  const gearmodeSunBefore = assembly.sun.mode;
  const gearmodePlanetCarrierBefore = assembly.planetCarrier.mode;
  const gearmodeRingBefore = assembly.ring.mode;

  assembly.sun.mode = GearMode.Direct;

  assembly.directDriveMode = false;

  expect(assembly.sun.mode).toBe(gearmodeSunBefore);
  expect(assembly.planetCarrier.mode).toBe(gearmodePlanetCarrierBefore);
  expect(assembly.ring.mode).toBe(gearmodeRingBefore);
});

test('No matter what gear you set to what mode, there is always one gear in each mode', () => {
  const assembly = new GearAssembly(1, 1);
  const gears = [assembly.sun, assembly.planetCarrier, assembly.ring];
  const modes = [GearMode.Fixed, GearMode.Drive, GearMode.Follow];

  modes.forEach((mode) => {
    gears.forEach((gear) => {
      const previousGearInMode = assembly.getGearInMode(mode);
      const previousModeOfGear = gear.mode;

      expect(previousGearInMode).not.toBeNull();
      expect(previousModeOfGear).not.toBeNull();

      if (previousGearInMode === null) {
        return;
      }

      if (previousModeOfGear === mode) {
        return;
      }

      const gearsEliminate = new Set(gears);
      gearsEliminate.delete(gear);
      gearsEliminate.delete(previousGearInMode);
      const thirdGear = [...gearsEliminate][0];

      const thirdGearModeBefore = thirdGear.mode;

      gear.mode = mode;

      expect(gear.mode).toBe(mode);
      expect(previousGearInMode?.mode).toBe(previousModeOfGear);
      expect(thirdGear.mode).toBe(thirdGearModeBefore);
    });
  });
});
