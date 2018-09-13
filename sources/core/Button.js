export default class Button extends PIXI.Sprite{
    constructor(texture, config, cb){
        super(texture);
        let text =  new PIXI.Text(config.text, config.style);

        this.position.set(config.x, config.y);
        this.mouseup = this.touchend = cb;
        this.buttonMode = this.interactive = true;
        text.position.set(config['text_offsets'].x, config['text_offsets'].y);
        this.addChild(text);
    }
}