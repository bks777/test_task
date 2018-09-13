import Loader from "./Loader";

export default class GameRunner {
    /**
     * @constructor
     * @param config
     */
    constructor(config) {
        this.config = config;
        this._respack = null;
        this._modules = {};
    }

    /**
     * Adds render statistic bar
     * @static
     */
    static addStats() {
        game.stats = new Stats();
        game.stats.showPanel(0);
        game.stats.dom.style.position = '';
        // game.stats.domElement.style.left = '0';
        // game.stats.domElement.style.top = '0';
        document.body.appendChild(game.stats.dom);
    }

    /**
     * Loads all resources, makes PIXI.Sprite-s
     * @param resolve {Function} resolver
     * @private
     */
    _startResourcesLoading(resolve) {
        this.loader = new Loader(this.config['images']);
        this.loader.startLoading(resolve);
    }

    /**
     * Start game logic, loads all components
     * @private
     */
    _startLogic() {
        console.info(`[${game.config.name}]: Logic started`);
        //Initializing of modules
        for (let Module of game.MODULES) {
            this._modules[Module.name] = new Module(this._respack, this.stage);
            console.info(`Module ${Module.name} was attached`);
        }
    }

    /**
     * Entry point
     */
    run() {
        GameRunner.addStats();
        this.initRenderer('container', game.config.width, game.config.height);
        this.initProton();
        new Promise(resolve => {
            this._startResourcesLoading(resolve);
        }).then((resources) => {
            this._respack = resources;
            this._startLogic();
        })
    }

    /**
     * Creates PIXI renderer and start frames ticker
     * @param parent {String} parent node id for a PIXI stage
     * @param width {Number} width of a stage
     * @param height {Number} height of a stage
     */
    initRenderer(parent = 'container', width = 640, height = 640) {
        PIXI.utils.skipHello();
        let renderer = PIXI.autoDetectRenderer({
                width, height,
                transparent: true,
                antialias: true
            }, false),
            stage = new PIXI.Container(),

            ticker = new PIXI.ticker.Ticker();
        document.getElementById(parent).appendChild(renderer.view);
        ticker.add(() => {
            game.stats.begin();
            PIXI.ticker.shared.deltaMS = Math.max(0.001, PIXI.ticker.shared.deltaTime / PIXI.settings.TARGET_FPMS);
            createjs.Tween.tick( PIXI.ticker.shared.deltaMS, false);

            this.proton.update();
            renderer.render(stage);
            game.stats.end();
        });
        ticker.start();
        this.stage = game._stage = stage;
        this.ticker = game._ticker = ticker;
        this.renderer = game._renderer = renderer;
        PIXI.customTicker = ticker;
    }

    /**
     * Adding proton particle system
     */
    initProton() {
       this.proton = new Proton();
       this.protonContainer = new PIXI.Container();
       this.stage.addChild(this.protonContainer);
       this.proton.addRenderer(new Proton.PixiRenderer(this.protonContainer));
       game.proton = this.proton;
       this.protonContainer.visible = false;
    }
}