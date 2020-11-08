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
/**
 * @description 검색 관련 인풋 컴포넌트
 * @param {String} category 카테고리 명칭
 * @param {Object} codeInfo {id} 
 * @param {Object} labelInfo {readAvail}
 */
const searchInput = (category, codeInfo, labelInfo) => {
    const {
        infoInput
    } = Main.DOM;
    const {
        id,
        popupUrl
    } = codeInfo;
    const {
        readAvail
    } = labelInfo
    
    /** create */
    const box = $Create('div');
    const label = $Create('label');
    const span = $Create('span');
    const inputCode = $Create('input');
    const button = $Create('button');
    const inputLabel = $Create('input');

    /** set class */
    box.className = "search-insert";
    span.className = "category";

    /** set attr */
    span.innerText = category;
    inputCode.id = `code${id}`;
    inputCode.setAttribute("type", "text");
    inputCode.setAttribute("name", "code");
    inputCode.setAttribute("placeholder", category);
    inputCode.setAttribute("readonly", true);
    button.innerText = "검색";
    button.setAttribute("type", "button")

    inputLabel.id = `label${id}`;
    inputLabel.setAttribute("type", "text");
    if(readAvail){
        inputLabel.setAttribute("readonly", true);
    }

    /** set event */
    const popupConfig = "width=500,height=300,top=100,left=150,menubar=no,toolbar=no,location=no,status=yes";
    
    inputCode.addEventListener('dblclick', (e) => {
        const popup = window.open(popupUrl, category, popupConfig);
    });
    button.addEventListener('click', (e) => {
        const popup = window.open(popupUrl, category, popupConfig);
    })

    /** dom tree */
    label.appendChild(span);
    label.appendChild(inputCode);
    label.appendChild(button);
    label.appendChild(inputLabel);

    box.appendChild(label);
    infoInput.appendChild(box);
} 
searchInput('선택1', {id : 1, popupUrl : "./popup1.html"}, {readAvail : true});
searchInput('선택2', {id : 2, popupUrl : "./popup2.html"}, {readAvail : true});
searchInput('선택3', {id : 3, popupUrl : "./popup3.html"}, {readAvail : false});