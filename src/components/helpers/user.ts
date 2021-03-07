export class Gamer {
  name: string;
  level: number;
  power: number;
  constructor(name: string, level: number = 0, power: number = 0) {
    this.name = name;
    this.level = level;
    this.power = power;
  }
}
