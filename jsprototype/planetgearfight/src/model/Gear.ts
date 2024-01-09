// Excellent animated demo for computing gear ratios and speeds found here:
// https://www.thecatalystis.com/gears/

// Gear ratio equation:
// https://woodgears.ca/gear/planetary.html

import GearAssembly from './GearAssemblyt';
import GearMode from './GearMode';

export default class Gear {
  public assembly: GearAssembly;

  public name: string;

  public mode: GearMode | null = null;

  // This gear might be a planet on a carrier.
  public carrier: Gear | null = null;

  // If this gear is a planet on a carrier, then this is its index in the carrier's child list.
  public carrierNumber: number = 0;

  // If this gear is a planet on a carrier, then this is its angular position (measured in rotations, with a value from 0 to 1).
  public carrierPosition: number = 0;

  // If this gear is a carrier, this is its collection of planets.
  public children: Gear[] = [];

  // Circumference is given in units of number of gear teeth. Should be understood to be the mean circumference (halfway up the teeth).
  public circumference: number | null = null;

  public constructor(assembly: GearAssembly, name: string) {
    this.assembly = assembly;
    this.name = name;
  }

  get radius() {
    if (this.circumference === null) {
      return null;
    }
    const r = this.circumference / (2.0 * Math.PI);
    return r;
  }
}
