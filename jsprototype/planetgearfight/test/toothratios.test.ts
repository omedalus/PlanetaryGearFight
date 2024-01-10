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

test('underspecification is invalid', () => {
  let r = GearAssembly.checkValidToothCounts(null, null, 30);
  expect(r).toBe(false);

  r = GearAssembly.checkValidToothCounts(12, null, null);
  expect(r).toBe(false);

  r = GearAssembly.checkValidToothCounts(null, 9, null);
  expect(r).toBe(false);
});

test('solve for Sun', () => {
  const r = GearAssembly.checkValidToothCounts(null, 9, 30);
  expect(r).toBe(12);
});

test('solve for Planet', () => {
  const r = GearAssembly.checkValidToothCounts(12, null, 30);
  expect(r).toBe(9);
});

test('solve for Ring', () => {
  const r = GearAssembly.checkValidToothCounts(12, 9, null);
  expect(r).toBe(30);
});

test('non-integer solution is invalid', () => {
  const r = GearAssembly.checkValidToothCounts(6, null, 15);
  expect(r).toBe(false);
});

test('zero does not mean null', () => {
  const r = GearAssembly.checkValidToothCounts(12, 0, 30);
  expect(r).toBe(false);
});
