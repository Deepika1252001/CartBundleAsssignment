const ACTIVE_MAIN_BOX_CLASS = "active-item-box";
const ACTIVE_SECTION_BOX_CLASS = "active-section-box";
const ACTIVE_OVERFLOW_BOX_CLASS = "active-item-box-overflow";

const cart_data = [
    {
        product_id: 'first-box-pair',
        pair: 1,
        ddk: 195,
        size: [
            {
                '#1': 'S'
            },
            {
                '#2': 'S'
            }
        ],
        colour: [
            {
                '#1': 'Colour'
            },
            {
                '#2': 'Colour'
            }
        ],
        off_percent: 50,
        total: 195
    },
    {
        product_id: 'second-box-pair',
        pair: 2,
        ddk: 345,
        size: [
            {
                '#1': 'S'
            },
            {
                '#2': 'S'
            }
        ],
        colour: [{
            '#1': 'Colour'
        },
        {
            '#2': 'Colour'
        }],
        off_percent: 40,
        total: 360
    },
    {
        product_id: 'third-box-pair',
        pair: 3,
        ddk: 528,
        size: [
            {
                '#1': 'S'
            },
            {
                '#2': 'S'
            }
        ],
        colour: [
            {
                '#1': 'Colour'
            },
            {
                '#2': 'Colour'
            }
        ],
        off_percent: 60,
        total: 360
    },
]


var selected_cart_data = cart_data[1]; // Default is second card data!

const getElementByClass = (class_name) => {
    let elements = document.getElementsByClassName(class_name);
    return [...elements]
}


function boxEventHandler(event, id) {
    // event.stopPropagation()
    selected_cart_data = cart_data.find(i => i.product_id === id);

    let element = document.getElementById(id);
    const [firstEle] = element.children;
    const [inputEle] = firstEle.children;


    let active_class = getElementByClass(ACTIVE_MAIN_BOX_CLASS)
    if (active_class.length) {
        active_class.forEach(i => {
            const [firstSection, secondSection] = i.children;
            if (firstSection) {
                const [inputEle] = firstSection.children;
                inputEle.checked = false; // reset checked input
            }
            if (secondSection) {
                secondSection.classList.remove(ACTIVE_SECTION_BOX_CLASS) // reset action section class
            }
            i.classList.remove(ACTIVE_MAIN_BOX_CLASS);
            i.classList.remove(ACTIVE_OVERFLOW_BOX_CLASS);
        })
    }
    const [, secondSection] = element.children;
    secondSection.classList.add(ACTIVE_SECTION_BOX_CLASS);
    element.classList.add(ACTIVE_MAIN_BOX_CLASS);
    setTimeout(() => {
        element.classList.add(ACTIVE_OVERFLOW_BOX_CLASS);
    }, 100)
    inputEle.checked = true;
}

const selectEventHandler = (() => {

    let setSelectCache = [

    ];

    const clearSelectCache = () => {
        if (setSelectCache.length) {
            setSelectCache.forEach(i => i.tag.classList.remove(i._class))
        }
    }

    document.addEventListener('click', () => {
        clearSelectCache();
    })

    return (event, second_class) => {
        event.stopPropagation();
        clearSelectCache()// Before we open select menu reset cache data!   
        const { target } = event;
        let targetElement = (target?.tagName === 'DIV') ? target.children : target?.parentElement?.children
        const [selectViewContent, arrow, selectMenu] = targetElement ?? [];

        selectMenu.classList.toggle(second_class);

        // Put select menu in cache then remove form it
        setSelectCache.push(
            {
                tag: selectMenu,
                _class: second_class
            },
            {
                tag: arrow,
                _class: 'toggle-arrow'
            }
        );

        const handleSelectMenuItem = (e) => {
            // e?.stopPropagation();
            selectViewContent.textContent = e.target.textContent;

            [...selectMenu.children].forEach(i => { // Once item selected then remove the event listner form select menu!
                i?.removeEventListener('click', handleSelectMenuItem)
            });
            clearSelectCache();
        }

        const handleSelectMenuPaper = (element) => { // Open select menu and add eveent listner to every menu
            [...element.children].forEach(i => {
                i?.addEventListener('click', handleSelectMenuItem)
            })
        }

        selectMenu && handleSelectMenuPaper(selectMenu)
    }
})();


const firstSizeHandler = (event) => {
    const data = event.target.textContent;
    selected_cart_data.size = selected_cart_data.size.map(i => {
        if (i['#1']) {
            i['#1'] = data;
        }
        return i;
    });
}

const secondSizeHandler = (event) => {
    const data = event.target.textContent;
    selected_cart_data.size = selected_cart_data.size.map(i => {
        if (i['#2']) {
            i['#2'] = data;
        }
        return i;
    })
}

const firstColorHandler = (event) => {
    const data = event.target.textContent;
    selected_cart_data.colour = selected_cart_data.colour.map(i => {
        if (i['#1']) {
            i['#1'] = data;
        }
        return i;
    })
}

const secondColorHandler = (event) => {
    const data = event.target.textContent;
    selected_cart_data.colour = selected_cart_data.colour.map(i => {
        if (i['#2']) {
            i['#2'] = data;
        }
        return i;
    })
}

const dummyAPIWait = async () => new Promise((resolve) => setTimeout(resolve, 1000))

const addToCartSubmitHandler = async (event) => {
    event.target.disabled = true;
    console.log('data: ', selected_cart_data);
    
    try {
        await dummyAPIWait();
        alert('Item added to cart successfully!');
    } catch (error) {
        console.error('Error adding item to cart:', error);
        alert('Failed to add item to cart. Please try again.');
    } finally {
        event.target.disabled = false;
    }
}



