/* ===== Vihaan Kitchen — JS ===== */
const WHATSAPP_NUMBER = "919876543210"; // change to your actual number

/* ---------- DATA ---------- */
const popularDishes = [
  { id:"biryani", name:"Chicken Biryani", price:280, desc:"Aromatic basmati rice with tender chicken & spices.", img:"assets/biryani.jpg" },
  { id:"paneer", name:"Paneer Butter Masala", price:240, desc:"Creamy tomato gravy with soft paneer cubes.", img:"assets/paneer.jpg" },
  { id:"friedrice", name:"Veg Fried Rice", price:180, desc:"Wok-tossed rice with fresh seasonal vegetables.", img:"assets/friedrice.jpg" },
  { id:"tandoori", name:"Chicken Tandoori", price:320, desc:"Char-grilled chicken marinated in yogurt & spices.", img:"assets/tandoori.jpg" },
  { id:"naan", name:"Butter Naan (2)", price:80, desc:"Soft tandoor-baked naan brushed with butter.", img:"assets/naan.jpg" },
  { id:"coffee", name:"Cold Coffee", price:120, desc:"Creamy chilled coffee with chocolate drizzle.", img:"assets/coffee.jpg" },
  { id:"mango", name:"Mango Shake", price:140, desc:"Thick alphonso mango blended fresh.", img:"assets/mango.jpg" },
  { id:"thali", name:"Special Thali", price:350, desc:"A complete homestyle Indian meal platter.", img:"assets/thali.jpg" },
];

const menuData = {
  "Starters":[
    {name:"Paneer Tikka", price:220, desc:"Marinated paneer grilled to perfection."},
    {name:"Chicken 65", price:240, desc:"Spicy South Indian chicken starter."},
    {name:"Veg Manchurian", price:180, desc:"Crispy veg balls in indo-chinese sauce."},
    {name:"Hara Bhara Kebab", price:200, desc:"Spinach & green pea cutlets."},
  ],
  "Main Course":[
    {name:"Paneer Butter Masala", price:240, desc:"Creamy paneer in tomato gravy."},
    {name:"Chicken Curry", price:280, desc:"Homestyle chicken in rich masala."},
    {name:"Dal Makhani", price:200, desc:"Slow cooked black lentils."},
    {name:"Mix Veg Curry", price:190, desc:"Seasonal vegetables in spiced gravy."},
  ],
  "Rice":[
    {name:"Chicken Biryani", price:280, desc:"Hyderabadi style dum biryani."},
    {name:"Veg Biryani", price:220, desc:"Fragrant rice with veggies."},
    {name:"Jeera Rice", price:140, desc:"Cumin tempered basmati rice."},
    {name:"Veg Fried Rice", price:180, desc:"Indo-Chinese fried rice."},
  ],
  "Beverages":[
    {name:"Cold Coffee", price:120, desc:"Chilled coffee with cream."},
    {name:"Mango Shake", price:140, desc:"Thick mango blended fresh."},
    {name:"Masala Chaas", price:60, desc:"Spiced buttermilk."},
    {name:"Fresh Lime Soda", price:70, desc:"Refreshing lime with soda."},
  ],
  "Desserts":[
    {name:"Gulab Jamun (2)", price:80, desc:"Soft fried dumplings in syrup."},
    {name:"Gajar Halwa", price:120, desc:"Classic carrot pudding."},
    {name:"Rasmalai (2)", price:140, desc:"Cottage cheese in saffron milk."},
    {name:"Choco Lava Cake", price:160, desc:"Warm gooey chocolate cake."},
  ],
};

/* ---------- LOADER ---------- */
window.addEventListener("load", ()=> {
  setTimeout(()=> document.getElementById("loader").classList.add("hidden"), 500);
});

/* ---------- NAVBAR ---------- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", ()=> {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");
hamburger.addEventListener("click", ()=> navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a=> a.addEventListener("click", ()=> navLinks.classList.remove("open")));

/* ---------- POPULAR GRID ---------- */
const popularGrid = document.getElementById("popularGrid");
popularDishes.forEach(d => {
  const card = document.createElement("div");
  card.className = "food-card reveal";
  card.innerHTML = `
    <div class="food-img">
      <img src="${d.img}" alt="${d.name}" loading="lazy"/>
      <span class="food-price-tag">₹${d.price}</span>
    </div>
    <div class="food-body">
      <h3>${d.name}</h3>
      <p>${d.desc}</p>
      <div class="qty" data-id="${d.id}">
        <button data-act="dec">−</button>
        <span>1</span>
        <button data-act="inc">+</button>
      </div>
      <div class="food-actions">
        <button class="btn btn-primary" data-add='${JSON.stringify(d)}'>Add to Cart</button>
        <button class="btn btn-sm-ghost" data-order='${JSON.stringify(d)}'>Order Now</button>
      </div>
    </div>`;
  popularGrid.appendChild(card);
});

/* qty controls */
popularGrid.addEventListener("click", e=>{
  const btn = e.target.closest("button");
  if(!btn) return;
  const qtyBox = btn.closest(".qty");
  if(qtyBox){
    const span = qtyBox.querySelector("span");
    let v = parseInt(span.textContent,10);
    if(btn.dataset.act==="inc") v++;
    if(btn.dataset.act==="dec" && v>1) v--;
    span.textContent = v;
    return;
  }
  if(btn.dataset.add){
    const d = JSON.parse(btn.dataset.add);
    const qty = parseInt(btn.closest(".food-body").querySelector(".qty span").textContent,10);
    addToCart(d, qty);
  }
  if(btn.dataset.order){
    const d = JSON.parse(btn.dataset.order);
    const qty = parseInt(btn.closest(".food-body").querySelector(".qty span").textContent,10);
    const msg = `Hello Vihaan Kitchen,%0A%0AI would like to order:%0A${d.name} x${qty}%0ATotal: ₹${d.price*qty}%0A%0APlease confirm availability.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  }
});

/* ---------- MENU TABS ---------- */
const tabsBox = document.getElementById("menuTabs");
const menuList = document.getElementById("menuList");
const categories = Object.keys(menuData);
categories.forEach((c,i)=>{
  const b = document.createElement("button");
  b.className = "menu-tab"+(i===0?" active":"");
  b.textContent = c;
  b.addEventListener("click", ()=>{
    document.querySelectorAll(".menu-tab").forEach(t=>t.classList.remove("active"));
    b.classList.add("active");
    renderMenu(c);
  });
  tabsBox.appendChild(b);
});
function renderMenu(cat){
  menuList.innerHTML = "";
  menuData[cat].forEach(item=>{
    const el = document.createElement("div");
    el.className = "menu-item reveal visible";
    el.innerHTML = `
      <div class="menu-item-info">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
      </div>
      <div class="menu-item-right">
        <strong>₹${item.price}</strong>
        <button>Add +</button>
      </div>`;
    el.querySelector("button").addEventListener("click", ()=>{
      addToCart({id:item.name.toLowerCase().replace(/\s+/g,"-"), name:item.name, price:item.price, img:"assets/logo.png"}, 1);
    });
    menuList.appendChild(el);
  });
}
renderMenu(categories[0]);

/* ---------- CART ---------- */
let cart = JSON.parse(localStorage.getItem("vk_cart")||"[]");
const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsBox = document.getElementById("cartItems");
const cartBadge = document.getElementById("cartBadge");
const cartTotalEl = document.getElementById("cartTotal");

function saveCart(){ localStorage.setItem("vk_cart", JSON.stringify(cart)); }

function addToCart(d, qty=1){
  const ex = cart.find(i=>i.id===d.id);
  if(ex) ex.qty += qty;
  else cart.push({...d, qty});
  saveCart(); renderCart();
  openCart();
}
function removeItem(id){ cart = cart.filter(i=>i.id!==id); saveCart(); renderCart(); }
function changeQty(id, delta){
  const it = cart.find(i=>i.id===id); if(!it) return;
  it.qty += delta;
  if(it.qty<=0) cart = cart.filter(i=>i.id!==id);
  saveCart(); renderCart();
}
function renderCart(){
  cartItemsBox.innerHTML = "";
  if(cart.length===0){
    cartItemsBox.innerHTML = `<div class="cart-empty">🛒<br/>Your cart is empty.<br/>Start adding delicious dishes!</div>`;
  } else {
    cart.forEach(it=>{
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${it.img}" alt="${it.name}"/>
        <div class="cart-item-info">
          <h5>${it.name}</h5>
          <small>₹${it.price} × ${it.qty} = ₹${it.price*it.qty}</small>
          <div class="cart-item-actions">
            <button data-dec="${it.id}">−</button>
            <span>${it.qty}</span>
            <button data-inc="${it.id}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-rm="${it.id}">×</button>`;
      cartItemsBox.appendChild(row);
    });
  }
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  cartTotalEl.textContent = `₹${total}`;
  const count = cart.reduce((s,i)=>s+i.qty,0);
  cartBadge.textContent = count;
  cartBadge.style.display = count>0 ? "grid" : "none";
}
cartItemsBox.addEventListener("click", e=>{
  const b = e.target.closest("button"); if(!b) return;
  if(b.dataset.inc) changeQty(b.dataset.inc, +1);
  if(b.dataset.dec) changeQty(b.dataset.dec, -1);
  if(b.dataset.rm)  removeItem(b.dataset.rm);
});

function openCart(){ cartDrawer.classList.add("open"); cartOverlay.classList.add("open"); }
function closeCart(){ cartDrawer.classList.remove("open"); cartOverlay.classList.remove("open"); }
cartBtn.addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

/* CHECKOUT via WhatsApp */
document.getElementById("checkoutBtn").addEventListener("click", ()=>{
  if(cart.length===0){ alert("Your cart is empty!"); return; }
  const lines = cart.map(i=>`${i.name} x${i.qty}`).join("%0A");
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const msg = `Hello Vihaan Kitchen,%0A%0AI would like to place an order:%0A%0A${lines}%0A%0ATotal: ₹${total}%0A%0APlease confirm availability.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
});

/* Hero CTA */
document.getElementById("heroWa").addEventListener("click", e=>{
  e.preventDefault();
  const msg = `Hello Vihaan Kitchen,%0A%0AI would like to place an order. Please share today's menu.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
});

renderCart();

/* ---------- REVEAL ON SCROLL ---------- */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.add("visible");
      io.unobserve(en.target);
    }
  });
},{threshold:0.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
