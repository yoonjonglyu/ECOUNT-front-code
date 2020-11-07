/**
 * @description DOM select 간편화
 * @param {String} target
 */
const $ = (target) => {
    return document.querySelector(target);
}
/**
 * @description DOM selectAll 간편화
 * @param {String} target
 */
const $$ = (target) => {
    return document.querySelectorAll(target);
}
/**
 * @class JSDOM
 * @description DOM 셀렉 관련 클래스 Data Object
 */

class JSDOM {
    constructor(_dom){
        this._dom = {}
    }

    get DOM () {
        return this._dom;
    }
    set DOM ({ key, value }){
        if(key !== null && value !== null){
            this._dom[key] = value;
        } else {
            console.error("SET DOM INVALID VALUES");
        }
    }
    /**
     * 
     * @param {String} keyName 
     * @param {Node} Node 
     */
    saveDom (keyName, Node) {
        this.DOM = {key : keyName, value : Node};
    }
}