const SearchWidget = new JSDOM();
SearchWidget.saveDom("infoForm", $('.info-form')); // set form
SearchWidget.saveDom("infoRadio", $('.info-form .data-box')); // set input box
SearchWidget.saveDom("categoryTitle", $('.category-title')); // set headline

const widgetRadio = (category, requirement) => {
    const {
        infoRadio,
        categoryTitle
    } = SearchWidget.DOM;
    const {
        requirementTitle,
        items
    } = requirement;
    
    categoryTitle.innerText = category;

    /** create */
    const box = $Create('div');
    
    const span = $Create('span');
    const inputRadio = [];
    
    box.className = "search-insert";
    span.className = "category";
    span.innerText = requirementTitle;
    
    if(items.length > 0){
        items.forEach((item) => {
            const label = $Create('label');
            const input = $Create('input');
            label.innerText = `${item.value}`;
            input.setAttribute("type", "radio");
            input.setAttribute("name", item.type);
            input.setAttribute("id", item.type);
            input.value = item.value;

            label.appendChild(input);
            inputRadio.push(label);
        });
    }
    
    /** dom tree */
    box.appendChild(span);
    if(inputRadio.length > 0){
        inputRadio.forEach((node) => {
            box.appendChild(node);
        });
    }
    
    infoRadio.appendChild(box);

};

widgetRadio("선택1", { requirementTitle : "규격", items : [
    {
        type : "code",
        value : "코드1"
    },
    {
        type : "label",
        value : "라벨1"
    },
    {
        type : "code",
        value : "코드2"
    },
    {
        type : "label",
        value : "라벨2"
    },
    {
        type : "code",
        value : "코드3"
    },
    {
        type : "code",
        value : "코드4"
    }
] });