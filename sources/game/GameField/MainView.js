import config from '../../configurations/field_config';

import ParticlesView from '../ParticlesView';
import ImagesTextView from '../ImagesTextView';
import SpritesRendererView from '../SpritesRendererView';

export default class MainView extends PIXI.Container {
    /**
     * Field class view
     * @constructor
     * @param respack {Object} resources pack
     * @param parent {PIXI.DisplayObject}
     */
    constructor(respack, parent) {
        super();

        this.respack = respack;
        this.menuContainer = new PIXI.Container();
        this.gameLayersContainer = new PIXI.Container();
        this.addChild(this.menuContainer, this.gameLayersContainer);
        this._initLayers();
        this._initElements();
        this.showGameLayer = false;
        parent.addChild(this);
    }

//////////////////////////////// INITIALIZING ////////////////////////////////
    /**
     * Init test task parts views
     * @private
     */
    _initLayers() {
        this.spritesRendererView = new SpritesRendererView(
            config['part1'],
            this.respack,
            this.gameLayersContainer,
            () => {this.showGameLayer = false}
        );
        this.imagesTextView = new ImagesTextView(
            config['part2'],
            this.respack,
            this.gameLayersContainer,
            () => {this.showGameLayer = false});
        this.particlesView = new ParticlesView(config['part3'],
            this.respack,
            this.gameLayersContainer,
            () => {this.showGameLayer = false}
        );
    }

    /**
     * Initializing of background and PIXI.Container
     * @private
     */
    _initElements() {
        let back = new PIXI.Graphics(),
            label = new PIXI.Text(config['label'].text, config['label'].style),
            button_p1 = new game.Button(this.respack['button'], config['button_p1'], () => {
                this.showGameLayer = true;
                this.spritesRendererView.show();
            }),
            button_p2 = new game.Button(this.respack['button'], config['button_p2'], () => {
                this.showGameLayer = true;
                this.imagesTextView.show();
            }),
            button_p3 = new game.Button(this.respack['button'], config['button_p3'], () => {
                this.showGameLayer = true;
                this.particlesView.show();
            });

        label.position.set(config['label'].x, config['label'].y);

        back.beginFill(config['back'].color);
        back.drawRect(0, 0, game._renderer.width, game._renderer.height);
        back.alpha = config['back'].alpha;

        this.menuContainer.addChild(back, label, button_p1, button_p2, button_p3);
    }

//////////////////////////////// GETTERS|SETTERS ///////////////////////////////
    /**
     * Change game layers
     * @param bool
     */
    set showGameLayer(bool) {
        this.menuContainer.visible = !bool;
        this.gameLayersContainer.visible = bool;
    }
}