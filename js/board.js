`use strict`;

const contents = [
  {
    level: "Beginner",
    title: "Korean food recipe",
    date: "2023-03-06",
    image: "bibimbap.jpg",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    level: "Intermediate",
    title: "recipe2",
    date: "2023-03-06",
    image: "bibimbap.jpg",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    level: "Advanced",
    title: "recipe3",
    date: "2023-05-20",
    image: "bibimbap.jpg",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    level: "Beginner",
    title: "recipe4",
    date: "2023-06-15",
    image: "bibimbap.jpg",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const tabs = document.querySelectorAll("a.nav-link");
const tabAll = document.querySelector(".tab-all");
const tabBeginner = document.querySelector("a.tab-beginner");
const tabIntermediate = document.querySelector(".tab-intermediate");
const tabAdvanced = document.querySelector(".tab-advanced");
const ACTIVE_CLASSNAME = "active";

const docFragment = new DocumentFragment();
const cardHtml = document.querySelector("#card-wrap");

const search = document.querySelector(".search");

// ??? ????????? All??? ??????, contents ??? ????????????
if (tabAll.classList.contains(ACTIVE_CLASSNAME)) {
  contents.map((content) => {
    createCard(content);
  });
}

// tab ?????? ??? filter
function handleTabClick(e) {
  //// ?????? ?????? active class ????????????
  for (let tab of tabs) {
    if (tab.classList.contains(ACTIVE_CLASSNAME)) {
      tab.classList.remove(ACTIVE_CLASSNAME);
    }
  }

  //// ?????? ????????? ????????????
  const cardHtmlChilds = document.querySelectorAll("#card-wrap div");
  if (cardHtml.hasChildNodes()) {
    for (let child of cardHtmlChilds) {
      child.remove();
    }
  }

  //// level??? ????????? ????????????
  const value = e.target.getAttribute("data-value");
  if (value === "Beginner") {
    contents
      .filter((x) => x.level === "Beginner")
      .map((content) => {
        createCard(content);
      });
    tabBeginner.classList.toggle(ACTIVE_CLASSNAME);
  } else if (value === "Intermediate") {
    contents
      .filter((x) => x.level === "Intermediate")
      .map((content) => {
        createCard(content);
      });
    tabIntermediate.classList.toggle(ACTIVE_CLASSNAME);
  } else if (value === "Advanced") {
    contents
      .filter((x) => x.level === "Advanced")
      .map((content) => {
        createCard(content);
      });
    tabAdvanced.classList.toggle(ACTIVE_CLASSNAME);
  } else if (value === "All") {
    contents.map((content) => {
      createCard(content);
    });
    tabAll.classList.toggle(ACTIVE_CLASSNAME);
  }
}

// card html ??????
function createCard(content) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "mb-3");
  const cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top");
  cardImg.src = `img/${content.image}`;
  cardDiv.appendChild(cardImg);

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = content.title;
  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent = content.detail;

  const cardDate = document.createElement("p");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formatDate = new Date(content.date);
  const month = months[formatDate.getMonth()];
  const date = formatDate.getDate();
  const year = formatDate.getFullYear();
  cardDate.textContent = `${month} ${date}, ${year}`;
  cardDate.classList.add("card-text", "date");

  cardBodyDiv.appendChild(cardTitle);
  cardBodyDiv.appendChild(cardText);
  cardBodyDiv.appendChild(cardDate);

  cardDiv.appendChild(cardBodyDiv);
  docFragment.append(cardDiv);
  cardHtml.appendChild(docFragment);
}

// search card
function searchCard(event) {
  const cards = cardHtml.childNodes;
  const searchValue = event.target.value.toLowerCase();
  for (let card of cards) {
    const arr = Array.from(card.children[1].children);

    // title?????? detail ????????? search input ?????? ???????????? card ????????????
    if (
      arr[0].innerText.toLowerCase().includes(searchValue) ||
      arr[1].innerText.toLowerCase().includes(searchValue)
    ) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  }
}
