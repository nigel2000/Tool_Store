let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation = ()=> {
   let cartIcon = document.getElementById("cartAmount")

    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y)=> x+y, 0)
}

calculation()

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x
            // x is in the basket y is in the data.js
            let search = shopItemsData.find((y) => y.id === id) || []
            return `
            <div class="cart-item">
                <div class="image">
                <img width="100" src=${search.img} alt=" />
                </div>

                <div class="details">
                        <div class="title-price-x">
                            <div class="title-price">
                                <p>${search.name}</p>
                                <p class="cart-item-price">£${search.price}</p>
                                <i class="bi bi-x-lg"></i>
                            </div>

                        <div class="buttons">
                                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                <div id=${id} class="quantity">${item}</div>
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                        <div class="total">£${item * search.price}</div>
                </div>
            </div>
            `
        }).join(""))
    }
    else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBTN">Back to Home</button>
        </a>
        `
    }
}

generateCartItems()

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
   
    generateCartItems()
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
    // line below will remove items out of basket which are zero
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems()
   // this is the amount you have selected, runs when plus or minus is clicked
   
    localStorage.setItem("data", JSON.stringify(basket))
}


let update = (id) => {
    let search = basket.find((x) => x.id === id)
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item
    calculation()
}
