const initMain = () => {
    const Main = new JSDOM();
    const store = new JSStore().store;
    Main.saveDom("infoForm", $('.info-form')); // set form
    Main.saveDom("infoInput", $('.info-form .data-box')); // set input box

    /**
    * @description 검색 관련 인풋 컴포넌트
    * @param {String} category 카테고리 명칭
    * @param {Object} codeInfo {id:any, popupUrl:String, requirementCode:requirement, requirementBtn:requirement} 
    * @param {Object} labelInfo {readAvail:Boolean}
    * @example
    * <requirement> = {title:String, items:Object[]{type:String, value: String}}
    */
    const searchInput = (category, codeInfo, labelInfo) => {
        const {
            infoInput
        } = Main.DOM;
        const {
            id,
            popupUrl,
            requirementCode,
            requirementBtn
        } = codeInfo;
        const {
            readAvail
        } = labelInfo;

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
        inputCode.setAttribute("placeholder", category);
        inputCode.setAttribute("readonly", true);
        button.innerText = "검색";
        button.setAttribute("type", "button")

        inputLabel.id = `label${id}`;
        inputLabel.setAttribute("type", "text");
        if (readAvail) {
            inputLabel.setAttribute("readonly", true);
        }

        /** set event */
        const popupConfig = "width=500,height=300,top=100,left=150,menubar=no,toolbar=no,location=no,status=yes";

        inputCode.addEventListener('dblclick', (e) => {
            const popup = window.open(popupUrl, category, popupConfig);
            const {
                title,
                items
            }
            = requirementCode;
            const request = {
                category : category,
                requirement : {
                    requirementTitle : title,
                    items : [
                    ]
                }
            };

            if(items.length > 0){
                request.requirement.items = items;
            } else {
                console.error("요구 조건이 없습니다.");
            }

            const popupPost = () => {
                popup.postMessage(request, "*");
            }

            store.popup = popupPost;
        });
        button.addEventListener('click', (e) => {
            const popup = window.open(popupUrl, category, popupConfig);
            const {
                title,
                items
            }
            = requirementBtn;
            const request = {
                category : category,
                requirement : {
                    requirementTitle : title,
                    items : [
                    ]
                }
            };

            if(items.length > 0){
                request.requirement.items = items;
            } else {
                console.error("요구 조건이 없습니다.");
            }

            const popupPost = () => {
                popup.postMessage(request, "*");
            }

            store.popup = popupPost;
        })

        /** dom tree */
        label.appendChild(span);
        label.appendChild(inputCode);
        label.appendChild(button);
        label.appendChild(inputLabel);

        box.appendChild(label);
        infoInput.appendChild(box);
    }
    /**
     * @description 검색 관련 form 이벤트
     */
    const searchForm = () => {
        const {
            infoForm
        } = Main.DOM;

        infoForm.addEventListener('submit', (e) => { // 과제 지문이 정확히 뭘말하는지 모호해서 내가 이해한대로 만든다.
            e.preventDefault();
            const target = [...e.target].filter((node) => node.nodeName === "INPUT");
            target.some((node) => {
                if (node.value.split('').join('').length > 0) {
                    console.log(`${node.id}의`, `값 : ${node.value}`);
                } else if (node.id.includes('code')) {
                    alert(`${node.placeholder} 항목에 값을 입력해주세요.`);
                    return true;
                }
            });
        });
    }

    const render = () => {
        const inputData = [
            {
                category : "선택1",
                codeInfo : {
                    id : 1,
                    popupUrl : "./popup1.html",
                    requirementCode : {
                        title : "규격",
                        items : [
                            {
                                type : "code",
                                value : "규격명"
                            },
                            {
                                type : "label",
                                value : "규격그룹"
                            }
                        ]
                    },
                    requirementBtn : {
                        title : "규격",
                        items : [
                            {
                                type : "code",
                                value : "규격명"
                            },
                            {
                                type : "label",
                                value : "규격그룹"
                            },
                            {
                                type : "code",
                                value : "규격계산"
                            },
                            {
                                type : "label",
                                value : "규격계산그룹"
                            }
                        ]
                    }
                },
                labelInfo : {
                    readAvail : true
                }
            },
            {
                category : "선택2",
                codeInfo : {
                    id : 2,
                    popupUrl : "./popup2.html",
                    requirementCode : 
                    {   /*
                        input( label ) + button + input( code )로 구성된다.(검색 위젯은 기본적으로 code - label 순서로 구성됨)
                        popup2.html을 로딩하고 선택한 값을 표시한다.
                        이게 대체 뭔소리인지 이해를 못하겠다. 그래서 그냥 label - code 순서로 주라는걸로 처리한다.(테스트중에 물어보라는 느낌인거같기도하다 -_-)
                        */
                        title : "규격",
                        items : [
                            {
                                type : "label",
                                value : "원재료"
                            },
                            {
                                type : "code",
                                value : "부재료"
                            },
                            {
                                type : "label",
                                value : "제품"
                            },
                            {
                                type : "code",
                                value : "반제품"
                            },
                            {
                                type : "label",
                                value : "상품"
                            },
                            {
                                type : "code",
                                value : "무형상품"
                            }
                        ]
                    },
                    requirementBtn : 
                    { 
                        title : "규격",
                        items : [
                            {
                                type : "label",
                                value : "원재료"
                            },
                            {
                                type : "code",
                                value : "부재료"
                            },
                            {
                                type : "label",
                                value : "제품"
                            },
                            {
                                type : "code",
                                value : "반제품"
                            },
                            {
                                type : "label",
                                value : "상품"
                            },
                            {
                                type : "code",
                                value : "무형상품"
                            }
                        ]
                    },
                },
                labelInfo : {
                    readAvail : true
                }
            },
            {
                category : "선택3",
                codeInfo : {
                    id : 3,
                    popupUrl : "./popup3.html",
                    requirementCode : {
                        title : "품질검사방법",
                        items : [
                            {
                                type : "code",
                                value : "전수"
                            },
                            {
                                type : "code",
                                value : "샘플링(%)"
                            }
                        ]
                    },
                    requirementBtn : {
                        title : "품질검사방법",
                        items : [
                            {
                                type : "code",
                                value : "전수"
                            },
                            {
                                type : "code",
                                value : "샘플링(%)"
                            }
                        ]
                    },
                },
                labelInfo : {
                    readAvail : false
                }
            }
        ];

        inputData.forEach((props) => {
            searchInput(props.category, props.codeInfo, props.labelInfo);
        });

        window.addEventListener("message", (event) => {
            const {
                eventType,
                data
            } = event.data;

            if(eventType === "onload"){
                store.popup();
            } else if(eventType === "postMessage"){

            } else {
                console.error("DoS~~~~ INVALID EVENT!!!!!!!!!!!");
            }
        });

        searchForm();
    }

    render();
};

initMain();