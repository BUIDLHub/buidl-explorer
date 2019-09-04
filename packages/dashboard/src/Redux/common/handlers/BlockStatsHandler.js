import * as DBNames from 'Redux/storage/DBNames';
import {Handler} from 'eth-pipeline';

/**
 * Aggregates info specific to blocks
 */
const BLOCK_KEY = "_blockStats";

export default class BlockStats extends Handler {
    constructor() {
        super({name:"BlockStatsAnalytics"});
        this.stats = {};

        [
            'init',
            'newBlock',
            'purgeBlocks'
        ].forEach(fn=>this[fn]=this[fn].bind(this));
    }

    async init(ctx, next) {
        let ex = await ctx.db.read({
            database: DBNames.Analytics,
            key: BLOCK_KEY
        });
        this.stats = ex || {};
        ctx.aggregations.put(BLOCK_KEY, this.stats);
        return next();
    }

    async newBlock(ctx, block, next) {
        let callCnt = block.transactions.reduce((c, t)=>{
            if(t.input.length > 2) {
                return c + 1;
            }
            return c;
        }, 0);
        let valCnt = block.transactions.length - callCnt;
        let ex = {
            ...this.stats
        }
        ex[block.number] = {
            contractCalls: callCnt,
            valueXfers: valCnt
        };
        this.stats = ex;
        ctx.aggregations.put(BLOCK_KEY, ex);
        return next();
    }

    async purgeBlocks(ctx, blocks, next) {
        let ex = {
           ...this.stats
        }
        
        blocks.forEach(b=>{
            delete ex[b.number]
        });
        this.stats = ex;
        ctx.aggregations.put(BLOCK_KEY, ex);
        return next();
    }
}