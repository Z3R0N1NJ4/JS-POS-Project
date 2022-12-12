let shop = document.getElementById("shop");

let admin = JSON.parse(localStorage.getItem("Data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, brand, price, model, img } = x;
      let search = admin.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="">
        <div class="details">
          <h3>${brand}</h3>
          <p>${model}</p>
          <div class="price-quantity">
            <h2>R ${price} </h2>
            <div class="buttons">
              <div onclick="decrement(${id})" ><button class="sub"><</button></div>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <div onclick="increment(${id})" ><button class="add">></button></div>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = admin.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    admin.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  update(selectedItem.id);
  localStorage.setItem("Data", JSON.stringify(admin));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = admin.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  admin = admin.filter((x) => x.item !== 0);

  localStorage.setItem("Data", JSON.stringify(admin));
};
let update = (id) => {
  let search = admin.find((x) => x.id === id);

  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let adminPage = document.getElementById("adminAmount");
  adminPage.innerHTML = admin.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
