////////// CONFIGS //////////
import resources from './configurations/resources'  ;
import config    from './configurations/main_config';

////////// CORE //////////
import GameRunner           from './core/GameRunner'        ;
import Button               from './core/Button'            ;

////////// GLOBAL //////////
let game = {
    config,
    Button
};

////////// MODULES //////////
import GameField from './game/GameField/GameFieldAPI';
game.MODULES = [GameField];

window.game = game;

////////// GAME RUN //////////
const gameRunner = new GameRunner(resources);
gameRunner.run();
