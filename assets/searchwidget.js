const initWidget = () => {
    const SearchWidget = new JSDOM();
    SearchWidget.saveDom("infoForm", $('.info-form')); // set form
    SearchWidget.saveDom("infoRadio", $('.info-form .data-box')); // set input box
    SearchWidget.saveDom("categoryTitle", $('.category-title')); // set headline

    /**
    * @description 검색 위젯 라디오 조건 컴포넌트
    * @param {Object} widgetInfo {category:String, id:Int} 
    * @param {Object} requirement {requirementTitle:String, items:Object{type:String, value:String}, isAvail:Object{code:String, labal:String}} 
    */
    const widgetRadio = (widgetInfo, requirement) => {
        const {
            infoRadio,
            categoryTitle
        } = SearchWidget.DOM;
        const {
            category,
            id
        } = widgetInfo;
        const {
            requirementTitle,
            items,
            isAvail
        } = requirement;

        categoryTitle.innerText = category;

        /** create */
        const box = $Create('div');

        const span = $Create('span');
        const inputRadio = [];

        box.className = "search-insert";
        span.className = "category";
        span.innerText = requirementTitle;

        if (items.length > 0) {
            items.forEach((item) => {
                const label = $Create('label');
                const input = $Create('input');
                label.innerText = `${item.value}`;
                input.setAttribute("type", "radio");
                input.setAttribute("name", item.type);
                input.setAttribute("id", id);
                input.value = item.value;
                if(item.value === isAvail.code || item.value === isAvail.label){
                    input.checked = true;
                }

                label.appendChild(input);
                inputRadio.push(label);
            });
        }

        /** dom tree */
        box.appendChild(span);

        if (inputRadio.length > 0) {
            inputRadio.forEach((node) => {
                box.appendChild(node);
            });
        }

        infoRadio.appendChild(box);

    };
    const widgetForm = () => {
        const {
            infoForm
        } = SearchWidget.DOM;

        infoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const target = [...e.target].filter((node) => node.nodeName === "INPUT" && node.checked === true);
            if(target.length > 0){
                const searchData = [];
                target.forEach((node) => {
                    const data = {
                        id : node.id,
                        type : node.name,
                        value : node.value
                    };

                    searchData.push(data);
                });

                window.opener.postMessage({
                    eventType : "postMessage",
                    data : {
                        searchData : searchData
                    }
                }, "*");
                
                window.close();
            } else {
                alert("선택된 조건이 없습니다.");
            }
        });
    }

    const render = () => {
        window.opener.postMessage({ // onload 신호 보내기
            eventType : "onload",
            data : {
                msg : "popup onload"
            }
        }, "*");

        window.addEventListener("message", (event) => {
            const {
                category,
                requirement
            } = event.data;

            widgetRadio(category, requirement);
        });

        widgetForm();
    }

    render();
};

initWidget();