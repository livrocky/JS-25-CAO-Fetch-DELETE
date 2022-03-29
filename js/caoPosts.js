const baseUrl = "https://golden-whispering-show.glitch.me";
const cardsContEl = document.querySelector(".cards-container");
console.log("cardsContEl===", cardsContEl);

// 1. Pasirašykite GET, kuris atsisiųs visus produktus ir atvaizduos vieną šalia kito (4 per eilutę):

async function getPosts() {
  const resp = await fetch(baseUrl);
  const posts = await resp.json();
  console.log("posts ===", posts);

  renderCards(posts, cardsContEl);
  if (posts.success === true) {
    renderCards(posts.data, cardsContEl);
  }
}

getPosts();

function renderCards(cardsArr, dest) {
  dest.innerHTML = "";
  cardsArr.forEach((cObj) => {
    dest.append(renderCard(cObj));
  });
}

function renderCard(cardObj) {
  const divEl = document.createElement("div");
  divEl.className = "card";
  divEl.innerHTML = `
  <div class="product">
  <img src="${cardObj.image}" alt="" />
    <p>${cardObj.title}</p>
    <p class="price">€${cardObj.price}.00</p>
    </div>
  `;

  //   3. Padarykite, kad paspaudus delete mygtuką - back-end'ui būtų išsiunčiamas Fetch Delete Request (baseURL + /:id). T.y. į url turėsite paduoti produkto ID parametrą (pvz.: DELETE baseURL/1 ištrins pirmą įrašą).

  const btnEl = document.createElement("button");
  btnEl.textContent = "Ištrinti";
  btnEl.addEventListener("click", () => deletePost(cardObj.id));
  divEl.append(btnEl);
  return divEl;
}

async function deletePost(postId) {
  console.log("delete", postId);
  const patvirtinimas = confirm("Ar tikrai norite istrinti?");
  if (patvirtinimas === false) return;
  const resp = await fetch(`${baseUrl}/${postId}`, {
    method: "DELETE",
  });
  window.location.reload();

  const post = await resp.json();
  console.log("post===", post);
  if (post.data.deletedCount === 1) {
    //istrinta sekmingai
    getPosts();
  }
}
