import { expect, test } from 'vitest';

import Gear from '../src/model/Gear';
import GearAssembly from '../src/model/GearAssembly';

const dummyAssembly = new GearAssembly(3, 3);

test('it assigns constructor params to proper member variables', () => {
  const gear = new Gear(dummyAssembly, 'testgear');
  expect(gear.name).toBe('testgear');
  expect(gear.assembly).toBe(dummyAssembly);
});

test('set circumference, get radius', () => {
  const gear = new Gear(dummyAssembly, 'testgear');
  gear.circumference = 10;
  expect(gear.radius).toBeCloseTo(1.59, 2);
});

test('set radius, get circumference', () => {
  const gear = new Gear(dummyAssembly, 'testgear');
  gear.radius = 10;
  expect(gear.circumference).toBeCloseTo(62.83, 2);
});
