import Gear from './Gear';
import GearMode from './GearMode';

export default class GearAssembly {
  public sun: Gear;
  public planetCarrier: Gear;
  public ring: Gear;

  public moonCarrier: Gear;

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
}
