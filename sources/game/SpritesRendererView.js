export default class SpritesRendererView extends PIXI.Container {
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
            this.isPlaying = false;
            this.clearSprites();
            this.visible = false;
        };

        this.spritesArray = [];
        this.spritesContainer = new PIXI.Container();
        this.spritesEndContainer =  new PIXI.Container();
        this.movingSpriteId = this.activeSpriteId = config['sprites_num'] - 1;
        this.isPlaying = false;
        this.addChild(this.spritesEndContainer, this.spritesContainer);
        this.initElements();
        this.visible = false;
        parent.addChild(this);
    }

    /**
     * Inits sprites
     */
    initElements(){
        let  button = new game.Button(this.respack['button'], this.config['button_close'], this.closeCallBack);
        this.addChild(button);

        for(let spriteIdx = 0; spriteIdx < this.config['sprites_num']; spriteIdx++){
            let tempSprite = new PIXI.Sprite(this.respack['sprite']);
            tempSprite.position.set((spriteIdx * this.config['sprite_offset_x']) + this.config['startPosition'].x,
                this.config['startPosition'].y);
            this.spritesArray.push(tempSprite);
            this.spritesContainer.addChild(tempSprite);
        }
    }

    /**
     * Shows layer
     */
    show(){
        this.visible = true;
        this.isPlaying = true;
        this.playSprite();
    }

    /**
     * Plays sprite, if it's possible
     */
    playSprite(){
        if(this.activeSpriteId < 0 || !this.isPlaying){
            return;
        }
        createjs.Tween.get(this.spritesArray[this.activeSpriteId])
            .wait(this.config['waitTime'])
            .call(()=> {
                this.playSprite();
            })
            .to({
                x: this.config['endPosition'].x + ((this.config['sprites_num'] - this.activeSpriteId) * this.config['sprite_offset_x']),
                y: this.config['endPosition'].y
            }, this.config['playTime'])
            .call(()=>{
                let tempSprite =  this.spritesContainer.children[this.movingSpriteId];
                this.spritesContainer.removeChild(tempSprite);
                this.spritesEndContainer.addChild(tempSprite);
                this.movingSpriteId --;
                if (!this.isPlaying){
                    this.clearSprites();
                }
            });

        this.activeSpriteId--;
    }

    /**
     * Set init position for all sprites
     */
    clearSprites(){
        this.spritesArray.forEach((sprite, idX)=>{
            sprite.position.set((idX * this.config['sprite_offset_x']) + this.config['startPosition'].x,
                this.config['startPosition'].y);
            this.spritesEndContainer.removeChild(sprite);
            this.spritesContainer.addChild(sprite);
        });
        this.activeSpriteId = this.movingSpriteId = this.config['sprites_num'] - 1;
    }
}