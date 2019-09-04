import {Handler} from 'eth-pipeline';
import BlockStats from './BlockStatsHandler';
import {Logger} from 'buidl-utils';
import {Creators} from 'Redux/analytics/actions';
import _ from 'lodash';
import * as DBNames from 'Redux/storage/DBNames';

const log = new Logger({component: "RootAnalyticsHandler"});

const handlers = [
    new BlockStats()
]

export default class RootHandler extends Handler {
    constructor() {
        super({name: "RootAnalyticsHandler"});
        [
            'init',
            'newBlock',
            'purgeBlock',
            '_updateStore',
            '_updateRedux'
        ].forEach(fn=>this[fn]=this[fn].bind(this));
    }

    async init(ctx, next) {
        log.debug("Initializing sub-handlers");
        let aggCtx = new AggContext();
        await aggCtx.init(ctx, async ()=>{
            ctx = {
                ...ctx,
                ...aggCtx
            }
            await this._updateStore(ctx);
            await this._updateRedux(ctx);
        });
    }

    async newBlock(ctx, block, next) {
        let aggCtx = new AggContext();
        await aggCtx.newBlock(ctx, block, async () => {
            ctx = {
                ...ctx,
                ...aggCtx
            }
            await this._updateStore(ctx);
            await this._updateRedux(ctx);
        });
    }

    async purgeBlock(ctx, block,  next) {
        let aggCtx = new AggContext();
        await aggCtx.purgeBlock(ctx, block, async () => {
            ctx = {
                ...ctx,
                ...aggCtx
            }
            await this._updateStore(ctx);
            await this._updateRedux(ctx);
        });
    }

    async _updateStore(ctx) {
        let aggNames = _.keys(ctx._cache);
        log.debug("Aggregation keys", aggNames);
        let updates = aggNames.map(a=>({
            key: a,
            value: ctx._cache[a]
        }));
        log.debug("Analytics generated", updates.length, "aggregations", updates);
        if(updates.length > 0) {
            log.debug("GET STATE", ctx);
            await ctx.getState().storage.instance.createBulk({
                database: DBNames.Analytics,
                items: updates
            });
        }

        log.debug("Finished storing all aggregations");
    }

    async _updateRedux(ctx) {
        let data = {
            ...ctx.getState().analytics.data,
            ...ctx._cache 
        }
        ctx.dispatch(Creators.updateData(data));
    }
}

class AggContext {
    constructor() {
        this._cache = {};
        [
            'init',
            'newBlock',
            'purgeBlock',
            '_prepHandlers'
        ].forEach(fn=>this[fn]=this[fn].bind(this));
    }

    async init(ctx, cb) {
        ctx.db = ctx.getState().storage.instance;
        await this._prepHandlers(ctx, async (_ctx, h, next) => {
            log.debug("Initializing sub-handler", h.name);
            await h.init(_ctx, next);
        }).then(cb)
    }

    async newBlock(ctx, block, cb) {
        ctx.db = ctx.getState().storage.instance;
        await this._prepHandlers(ctx, async (_ctx, h, next) => {
            await h.newBlock(_ctx, block, next);
        }).then(cb)
    }

    async purgeBlock(ctx, block, cb) {
        ctx.db = ctx.getState().storage.instance;
        await this._prepHandlers(ctx, async (_ctx, h, next) => {
            await h.purgeBlock(_ctx, block, next);
        }).then(cb);
    }

    async _prepHandlers(ctx, cb) {
        if(typeof ctx.getState !== 'function') {
            log.warn("No redux in root anlaytics context", ctx.getState);
        }
        ctx = {
            ...ctx,
            aggregations: {
                put: (key, val) => {
                    log.debug("Adding aggregation with key", key, val);
                    this._cache[key] = val;
                }
            }
        };
        let idx = 0;
        let _next = async () => {
            ++idx;
            if(idx < handlers.length) {
                let h = handlers[idx];
                await cb(ctx, h, _next);
            }
        }
        let h = handlers[idx];
        await cb(ctx, h, _next);
    }
}