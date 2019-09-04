import {Handler} from 'eth-pipeline';
import {Logger} from 'buidl-utils';

const log = new Logger({component: "ReduxInjectHandler"});

export default class ReduxInjector extends Handler {
    constructor(props) {
        super({name: "ReduxInjectHandler"});
        this.dispatch = props.dispatch;
        this.getState = props.getState;
        if(typeof this.dispatch !== 'function') {
            throw new Error("Missing dispatch function");
        }
        if(typeof this.getState !== 'function') {
            throw new Error("Missing getState function");
        }
        [
            'init',
            'newBlock',
            'purgeBlock',
            '_setup'
        ].forEach(fn=>this[fn]=this[fn].bind(this));
    }

    async init(ctx, next) {
        this._setup(ctx);
        return next();
    }

    async newBlock(ctx, block, next) {
        this._setup(ctx);
        return next();
    }

    async purgeBlock(ctx, block, next) {
        this._setup(ctx);
        return next();
    }

    _setup(ctx) {
        ctx.dispatch = this.dispatch;
        ctx.getState = this.getState;
    }
}