const baseUrl = "https://golden-whispering-show.glitch.me";

const formEl = document.getElementById("form");
console.log("formEl===", formEl);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("js is in control");

  const newPost = {};
  const members = ["image", "title", "price"];
  members.forEach((memb) => {
    newPost[memb] = formEl.elements[memb].value;
  });
  createPost(newPost);
});

async function createPost(newPostData) {
  const resp = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPostData),
  });
  const atsInJs = await resp.json();
  console.log("atsInJs===", atsInJs);
  if (atsInJs.success === false) {
    // turim klaidu masyva atsInJs.error
    handleErrors(atsInJs.error);
  }
  if (atsInJs.success === true) {
    // post sukurtas
    window.location.href = "posts.html";
  }
  console.log("atsInJs ===", atsInJs);
}

function handleErrors(errorArr) {
  const errString = errorArr.map((errObj) => `<p>${errObj.message}</p>`).join("");
  const divEl = document.createElement("div");
  divEl.innerHTML = errString;
  formEl.before(divEl);
}
