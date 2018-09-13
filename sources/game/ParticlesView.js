export default class ParticlesView extends PIXI.Container {
    /**
     * @constructor
     * @param config
     * @param respack
     * @param parent
     * @param closeCB
     */
    constructor(config, respack, parent, closeCB){
        super();
        this.config = config;
        this.respack = respack;
        this.closeCallBack = ()=>{
            closeCB();
            this.visible = false;
            this.protonContainer.visible = false;
            this.emitter.stop();
        };
        this.initElements();
        parent.addChild(this);
        this.visible = false;
        this.protonContainer = game.proton.renderers[0].element;
    }

    /**
     * Inits emitter
     */
    initElements(){
        let proton = game.proton,
            button = new game.Button(this.respack['button'], this.config['button_close'], this.closeCallBack),
            emitter = new Proton.BehaviourEmitter();
        this.addChild(button);
        emitter.rate = new Proton.Rate(new Proton.Span(2, 8), new Proton.Span(.1, .35));

        emitter.addInitialize(new Proton.Mass(.1));
        emitter.addInitialize(new Proton.Body(this.respack['fire']));
        emitter.addInitialize(new Proton.P(new Proton.CircleZone(game._renderer.width / 2, game._renderer.height / 2 + 530, 10)));
        emitter.addInitialize(new Proton.Life(2, 5));
        emitter.addInitialize(new Proton.V(new Proton.Span(2, 3), new Proton.Span(0, 30, true), 'polar'));

        emitter.addBehaviour(new Proton.Scale(new Proton.Span(2, 6), .1));
        emitter.addBehaviour(new Proton.Alpha(1, .4));
        this.emitter = emitter;
        proton.addEmitter(emitter);
    }

    /**
     * Shows layer
     */
    show(){
        this.visible = true;
        this.protonContainer.visible = true;
        this.emitter.emit();
    }
}