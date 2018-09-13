import MainView from './MainView';
import MainController from './MainController';

export default class GameField {

    static get name (){
        return 'GameField';
    }

    /**
     * Game Field class
     * @param respack {Object} resources pack
     * @param parent {PIXI.DisplayObject}
     */
    constructor(respack, parent){
        this.view =       new MainView(respack, parent);
        this.controller = new MainController(this.view);
    }
}