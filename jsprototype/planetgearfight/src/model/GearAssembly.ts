import Gear from './Gear';
import GearMode from './GearMode';

export default class GearAssembly {
  public sun: Gear;
  public planetCarrier: Gear;
  public ring: Gear;
  public moonCarrier: Gear;

  private _modesSunPlanetRing = [GearMode.Fixed, GearMode.Follow, GearMode.Drive];
  private _isInDirectDriveMode = false;

  public constructor(numPlanets: number, numMoons: number) {
    if (numPlanets < 0 || numPlanets !== Math.floor(numPlanets)) {
      throw new TypeError('numPlanets needs to be a positive integer.');
    }
    if (numMoons < 0 || numMoons !== Math.floor(numMoons)) {
      throw new TypeError('numMoons needs to be a positive integer.');
    }

    this.sun = new Gear(this, 'Sun');
    this.ring = new Gear(this, 'Ring');

    this.planetCarrier = new Gear(this, 'PlanetCarrier');
    for (let iPlanet = 0; iPlanet < numPlanets; iPlanet++) {
      const planetName = `Planet ${iPlanet + 1}`;
      const planet = new Gear(this, planetName);
      planet.carrier = this.planetCarrier;
      planet.carrierNumber = iPlanet;
      planet.carrierPosition = iPlanet / numPlanets;
      this.planetCarrier.children.push(planet);
    }

    this.moonCarrier = new Gear(this, 'MoonCarrier');
    for (let iMoon = 0; iMoon < numMoons; iMoon++) {
      const moonName = `Moon ${iMoon + 1}`;
      const moon = new Gear(this, moonName);
      moon.carrier = this.moonCarrier;
      moon.carrierNumber = iMoon;
      moon.carrierPosition = iMoon / numMoons;
      this.moonCarrier.children.push(moon);
    }
  }

  /**
   * Checks whether or not the given number of teeth for each of the given planetary gear components is valid, based on
   * the equation R = 2P + S.
   * @param sunToothCount The number of teeth around the Sun gear. Set it to null to compute this number based on the Planet and Ring tooth count.
   * @param planetToothCount The number of teeth around any single Planet gear. Set it to null to compute this number based on the Sun and Ring tooth count.
   * @param ringToothCount The number of teeth around any single Ring gear. Set it to null to compute this number based on the Sun and Planet tooth count.
   * @returns If all three tooth counts are provided, returns true or false based on whether or not the counts form a valid planetary
   * gear system, respectively. If one of the tooth counts is null, then it returns the number of teeth that that gear would need to have in order
   * to form a valid planetary gear system, or false if no gear system can be made with the combination provided.
   */
  public static checkValidToothCounts(
    sunToothCount: number | null = null,
    planetToothCount: number | null = null,
    ringToothCount: number | null = null
  ) {
    // All provided parameters need to be integers.
    const numFractions = [sunToothCount, planetToothCount, ringToothCount].filter(
      (x) => x !== null && x !== Math.floor(x)
    ).length;
    if (numFractions > 0) {
      return false;
    }

    // R = 2 × P + S
    // https://woodgears.ca/gear/planetary.html
    if (sunToothCount !== null && planetToothCount !== null && ringToothCount !== null) {
      // If all three circumferences are specified, then they have to meet the formula criterion.
      const isValidRatios = ringToothCount === 2.0 * planetToothCount + sunToothCount;
      return isValidRatios;
    }

    // We know that there's at least one null. Count the nulls. There should be *at most* one.
    const numNulls = [sunToothCount, planetToothCount, ringToothCount].filter(
      (x) => x === null
    ).length;
    if (numNulls > 1) {
      // NOTE: It might be better to throw an error here.
      return false;
    }

    let retval = null;
    if (ringToothCount === null && planetToothCount !== null && sunToothCount !== null) {
      retval = 2.0 * planetToothCount + sunToothCount;
    } else if (ringToothCount !== null && planetToothCount === null && sunToothCount !== null) {
      retval = (ringToothCount - sunToothCount) / 2.0;
    } else if (ringToothCount !== null && planetToothCount !== null && sunToothCount === null) {
      retval = ringToothCount - 2.0 * planetToothCount;
    }

    if (retval === null) {
      // This should be impossible.
      return false;
    }

    // The resulting circumference must be an integer.
    if (retval !== Math.floor(retval)) {
      return false;
    }

    return retval;
  }

  public get directDriveMode() {
    return this._isInDirectDriveMode;
  }

  public set directDriveMode(v: boolean) {
    this._isInDirectDriveMode = v;
  }

  public getGearMode(gear: Gear) {
    if (this.directDriveMode) {
      return GearMode.Direct;
    }

    const ixGear = this._getModeIndexOfGear(gear);
    if (ixGear === null) {
      return null;
    }
    return this._modesSunPlanetRing[ixGear];
  }

  private _getModeIndexOfGear(gear: Gear) {
    const a = [this.sun, this.planetCarrier, this.ring];
    const retval = a.indexOf(gear);
    if (retval === -1) {
      return null;
    }
    return retval;
  }

  private _getModeIndexOfGearInMode(mode: GearMode) {
    const retval = this._modesSunPlanetRing.indexOf(mode);
    if (retval === -1) {
      return null;
    }
    return retval;
  }

  public getGearInMode(mode: GearMode) {
    const ixGearInMode = this._getModeIndexOfGearInMode(mode);
    if (ixGearInMode === null) {
      return null;
    }
    const retval = [this.sun, this.planetCarrier, this.ring][ixGearInMode];
    return retval;
  }

  public setGearMode(gear: Gear | null, mode: GearMode) {
    // The gear needs to be one of the settable parts of the assembly
    // (or null, if we're setting Direct.)
    if (gear !== null && gear !== this.sun && gear !== this.planetCarrier && gear !== this.ring) {
      return false;
    }

    // At this point, we know that the gear is one of the three valid gears (or null).
    // If we set it to direct drive, then all gears get set to direct drive.
    if (mode == GearMode.Direct) {
      this.directDriveMode = true;
      return true;
    }

    // At this point, if it's not being set to direct drive, then we need to have specified some gear.
    if (gear === null) {
      return false;
    }

    const ixGearToSet = this._getModeIndexOfGear(gear);
    if (ixGearToSet === null) {
      return false;
    }
    const modeBeingReplaced = this._modesSunPlanetRing[ixGearToSet];
    const ixGearThatPreviouslyHadThisMode = this._getModeIndexOfGearInMode(mode);
    if (ixGearThatPreviouslyHadThisMode === null) {
      return false;
    }

    this._modesSunPlanetRing[ixGearToSet] = mode;
    this._modesSunPlanetRing[ixGearThatPreviouslyHadThisMode] = modeBeingReplaced;
    this.directDriveMode = false;
    return true;
  }
}
