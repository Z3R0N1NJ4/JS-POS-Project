let label = document.getElementById("label");
let AdminCart = document.getElementById("admin-cart");

let admin = JSON.parse(localStorage.getItem("Data")) || [];

let calculation = () => {
  let adminPage = document.getElementById("adminAmount");
  adminPage.innerHTML = admin.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateAdminItems = () => {
  if (admin.length !== 0) {
    return (AdminCart.innerHTML = admin.map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="admin-item">
        <img width="100" src=${search.img} alt=""/>
        <div class="details">

          <div class="title-price-remove">
              <h4 class="title-price">
                <p class="admin-item-title">${search.brand}</p>
                <p class="admin-item-price">R ${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})"class="remove"><button class="removebtn">delete</button></i>
          </div>

          <div class="buttons">
                <i onclick="decrement(${id})" ><button class="sub"><</button></i>
              <div id=${id} class="quantity">${item}</div>
              <div class="buttons">
              <i onclick="increment(${id})" ><button class="add">></button></i>
          </div>

          <h3 class="bottom-price">R ${item * search.price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    AdminCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Admin is Empty</h2>
    <a href="../index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateAdminItems();

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

  generateAdminItems();
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
  generateAdminItems();
  localStorage.setItem("Data", JSON.stringify(admin));
};

let update = (id) => {
  let search = admin.find((x) => x.id === id);

  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;

  admin = admin.filter((x) => x.id !== selectedItem.id);
  generateAdminItems();
  TotalAmount();
  localStorage.setItem("Data", JSON.stringify(admin));
};

let clearAdmin = () => {
  admin = [];
  generateAdminItems();
  localStorage.setItem("Data", JSON.stringify(admin));
};

let TotalAmount = () => {
  if (admin.length !== 0) {
    let amount = admin
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `
    <h2>Total Bill : R ${amount}</h2>
    <button class="checkout"><a href="../HTML/Checkout.html">Checkout</a></button>
    <button onclick="clearAdmin()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

TotalAmount();
