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
 * @description DOM create 간편화
 * @param {String} target 생성할 태그Name을 입력해주세요.
 */
const $Create = (target) => {
    return document.createElement(target);
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
/**
 * @class JSStore
 * @description 전역 상태 관리를 위한 클래스 Store
 */
class JSStore {
    constructor(_store){
        this._store = {};
    }

    get store () {
        return this._store;
    }
    set store (next){
        this._store = {...this._store, next};
    }
}