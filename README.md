# PlanetaryGearFight
Testing the concept of a combat engine based on shifting the clutching of planetary gears

This game is a timing, reflex, and strategy game that involves controlling a complex of planetary gears. The player's actions are to choose, at any given moment, which gear is in one of three modes: Driver, Fixed, or Follower.

The field through which the planetary gear system rotates is called the Firmament. The Firmament is divided into twelve (thirteen?) Celestial Houses. Each House can be owned by the player, the enemy, or unowned. The objective of the game is own more celestial houses than the enemy. Once a House is owned, its ownership can't be changed, so the game progresses steadily towards a completion condition.

There's an evil Moon gear that represents the opponent. The Moon gear circulates around the outer Ring gear.

The Moon gear has a Sword icon on it. At whichever point the Moon gear's sword contacts the Ring gear, whichever House the contact is made in gets owned by the enemy.

The Moon gear can also have a shield on it. At whichever point the Moon gear's shield contacts the Ring gear, whichever House the contact is made in becomes unownable by the player for one turn of the Moon, i.e. when the Moon places its shield into another House.

Each Planet gear has a sword and shield icon on it as well. Wherever the sword icon makes contact with the Ring gear, the corresponding house gets owned by the player (unless it's shielded by the enemy). Wherever the shield icon makes contact with the ring, a shield is placed on that ring corresponding to that ring gear; the enemy cannot claim that house until the same planet gear places its shield into another house.

The Moon gear has a Seize icon. When this icon contacts the Ring gear, whichever gear is currently in Drive mode gets stuck in Fixed mode for some period. NOTE: This period can't be one revolution of the Moon, because then that would mean that some gear is always stuck.


## Example speeds:
Calculated with https://www.thecatalystis.com/gears/
At Sun-Planet-Ring 12-9-30...
| Drive            | Fixed            | Follower           | Sun Speed     | Planet Carrier Speed   | Ring Speed      |
|------------------|------------------|--------------------|--------------:|-----------------------:|----------------:|
| Sun              | Planet Carrier   | Ring               |  1.000        |  0.000                 | -0.400          |
| Sun              | Ring             | Planet Carrier     |  1.000        |  0.286                 |  0.000          |
| Planet Carrier   | Sun              | Ring               |  0.000        |  1.000                 |  1.400          |
| Planet Carrier   | Ring             | Sun                |  3.500        |  1.000                 |  0.000          |
| Ring             | Sun              | Planet Carrier     |  0.000        |  0.714                 |  1.000          |
| Ring             | Planet Carrier   | Sun                | -2.500        |  0.000                 |  1.000          |












// 
// Drive    Fixed    Follower   Speed Ratios
// Sun 
