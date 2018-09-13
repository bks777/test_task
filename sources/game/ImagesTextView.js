export default class ImagesTextView extends PIXI.Container {
    /**
     * @constructor
     * @param config
     * @param respack
     * @param parent
     * @param closeCB
     */
    constructor(config, respack, parent, closeCB) {
        super();
        this.config = config;
        this.respack = respack;
        this.closeCallBack = () => {
            closeCB();
            clearInterval(this.showInterval);
            while (this.charsContainer.children.length > 0){
                this.charsContainer.removeChildAt(0);
            }
            this.visible = false;
        };
        this.charsContainer = this.addChild(new PIXI.Container());
        this.charsContainer.position.set(this.config.x, this.config.y);
        this.initElements();
        parent.addChild(this);
        this.visible = false;
        this.charsArray = ['hello', 'lorem', 'ipsum', 'dolor'];
        this.imagesArray = ['happy', 'sad'];
        this.showInterval = null;
    }

    /**
     * Initializing
     */
    initElements() {
        let button = new game.Button(this.respack['button'], this.config['button_close'], this.closeCallBack);
        this.addChild(button);
    }

    /**
     * Shows layer
     */
    show() {
        this.generateImageText();
        this.visible = true;
        this.showInterval = setInterval(this.generateImageText.bind(this), this.config['generation_delay']);
    }

    /**
     * Generating of a new line
     */
    generateImageText() {
        if ( this.charsContainer.children.length > 0){
           while (this.charsContainer.children.length > 0){
               this.charsContainer.removeChildAt(0);
           }
        }
        let elementsCount = ImagesTextView.getRandomInt(this.config['elements_min'], this.config['elements_max']),
            totalWidth = 0;
        for (let i = 0; i < elementsCount; i++) {
            let data, element;
            if(ImagesTextView.getIsTextChar()){
                data = ImagesTextView.getRandomInt(0, this.charsArray.length - 1);
                let style = this.config['styles'][ImagesTextView.getRandomInt(0,  this.config['styles'].length - 1)];
                element = new PIXI.Text(this.charsArray[data], style);
            } else {
                data = ImagesTextView.getRandomInt(0, this.imagesArray.length - 1);
                element = new PIXI.Sprite(this.respack[this.imagesArray[data]]);
            }
            element.position.set(totalWidth, 0);
            totalWidth += element.width;
            this.charsContainer.addChild(element);
        }
    }

    /**
     * Getting random integer
     * @static
     * @param min
     * @param max
     * @return {*}
     */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     *
     * @return {*}
     */
    static getIsTextChar(){
        return ImagesTextView.getRandomInt(0, 1);
    }

}