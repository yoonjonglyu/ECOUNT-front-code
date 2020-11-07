const Main = new JSDOM();

Main.saveDom("infoForm", $('.info-form')); // set form
Main.saveDom("infoInput", $('.info-form .data-box')); // set input box

/**
 *  사용 예시 example
 *  const {
 *      infoForm,
 *      infoInput
 * }  = Main.DOM;
 */
