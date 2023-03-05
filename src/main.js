let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img} = x;
        let search = basket.find((x) => x.id === id) || []
        return `
        <div id=product-id-${id} class=items> 
            <div class="item1">
                <img width="100"  src=${img} alt="">
                <div class="item-name">${name}</div>
                <div class="desc">${desc}</div>
            </div>
            <div class="price-quan">
                <div class="item-price" id="item-price">£${price}</div> 
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <span id=${id} class="quantity">
                        ${search.item === undefined? 0 : search.item}
                        </span>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
            </div>
        </div>
        `;
    }).join(""));  
};

generateShop();

let increment = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    }
    else {
        search.item += 1
    }
   
    // this is the amount you have selected, runs when plus or minus is clicked
    update(selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))
}


let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)

    if(search === undefined) return
    else if (search.item === 0) return
    else {
        search.item -= 1
    }
    
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)
   // this is the amount you have selected, runs when plus or minus is clicked
   
    localStorage.setItem("data", JSON.stringify(basket))
}


let update = (id) => {
    let search = basket.find((x) => x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    calculation()
}

let calculation = ()=> {
    let cartIcon = document.getElementById("cartAmount")

    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y)=> x+y, 0)
}

calculation()