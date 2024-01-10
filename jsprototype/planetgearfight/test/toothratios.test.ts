import { expect, test } from 'vitest';

import GearAssembly from '../src/model/GearAssembly';

test('reports that a valid tooth ratio is valid', () => {
  const r = GearAssembly.checkValidToothCounts(12, 9, 30);
  expect(r).toBe(true);
});

test('reports that an invalid tooth ratio is invalid', () => {
  const r = GearAssembly.checkValidToothCounts(10, 9, 30);
  expect(r).toBe(false);
});

test('a valid tooth ratio with fractional counts is invalid', () => {
  const r = GearAssembly.checkValidToothCounts(6, 4.5, 15);
  expect(r).toBe(false);
});
