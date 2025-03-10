let imageArray = [
  "./assets/scramble-image.jpg",
  "./assets/reacingCarsOnIce_imresizer.jpg",
  "./assets/steveJobs_imresizer.jpg",
  "./assets/Bigmesstoys_imresizer.jpg",
];

const tileStyles = [
  {
    className: "tile0",
    width: "165px",
    height: "165px",
    backgroundSize: "295%",
    backgroundPosition: "0% 0%",
    border: "1px solid white",
  },
  {
    className: "tile1",
    width: "165px",
    height: "165px",
    backgroundSize: "295%",
    backgroundPosition: "51% 0%",
    border: "1px solid white",
  },
  {
    className: "tile2",
    width: "165px",
    height: "165px",
    backgroundSize: "295%",
    backgroundPosition: "103% 0%",
    border: "1px solid white",
  },
  {
    className: "tile3",
    width: "165px",
    height: "165px",
    backgroundSize: "295%",
    backgroundPosition: "0% 53%",
    border: "1px solid white",
  },
  {
    className: "tile4",
    width: "165px",
    height: "165px",
    backgroundSize: "295%",
    backgroundPosition: "51% 53%",
    border: "1px solid white",
  },
  {
    className: "tile5",
    width: "165px",
    height: "165px",
    backgroundSize: "295%",
    backgroundPosition: "102% 52%",
    border: "1px solid white",
  },
  {
    className: "tile6",
    width: "165px",
    height: "165px",
    backgroundSize: "295%",
    backgroundPosition: "0% 105%",
    border: "1px solid white",
  },
  {
    className: "tile7",
    width: "165px",
    height: "165px",
    backgroundSize: "295%",
    backgroundPosition: "51% 105%",
    border: "1px solid white",
  },
  {
    className: "tile8",
    width: "165px",
    height: "165px",
    border: "1px solid white",
  },
];

let count = 0;

function shuffle() {
  var arr = [];
  while (arr.length < 9) {
    var r = Math.floor(Math.random() * 9);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

function loadGame() {
  let divObjects = shuffle();
  const randomImageIndex = Math.floor(Math.random() * 4);
  const selectedImage = imageArray[randomImageIndex];

  const heading = document.createElement("h1");
  heading.textContent = "Scrambled Image Puzzle";
  heading.style.position = "absolute";
  heading.style.top = "10px";
  document.body.appendChild(heading);
  document.body.style.backgroundColor = "rgb(218, 203, 185)";

  const moves = document.createElement("h2");
  moves.setAttribute("id", "moves");
  moves.textContent = `Moves : ${count}`;
  moves.style.position = "absolute";
  moves.style.top = "110px";

  document.body.appendChild(moves);

  const imagePreview = document.createElement("img");
  imagePreview.setAttribute("src", selectedImage);
  imagePreview.style.borderRadius = "10px";
  document.body.appendChild(imagePreview);

  document.body.style.display = "flex";
  document.body.style.justifyContent = "space-evenly";
  document.body.style.alignItems = "center";

  const mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "mainDiv");
  mainDiv.style.width = "500px";
  mainDiv.style.height = "500px";
  mainDiv.style.backgroundColor = "white";
  mainDiv.style.display = "grid";
  mainDiv.style.gridTemplateColumns = "repeat(3,1fr)";
  mainDiv.style.alignItems = "center";
  mainDiv.style.justifyItems = "center";
  mainDiv.style.borderRadius = "10px";
  document.body.appendChild(mainDiv);

  const styleSheet = document.createElement("style");
  document.head.appendChild(styleSheet);

  for (let i of divObjects) {
    let tileDiv = document.createElement("div");
    tileDiv.setAttribute("id", `${i}`);
    tileDiv.classList.add(`tile${i}`);
    if (i === 8) {
      const tile = tileStyles[i];
      const cssRule = `
      .tile${i} {
        width: ${tile.width};
        height: ${tile.height};
        background-image:none;
        border: ${tile.border};
      }`;
      styleSheet.appendChild(document.createTextNode(cssRule));
    } else {
      const tile = tileStyles[i];
      const cssRule = `
      .tile${i} {
        width: ${tile.width};
        height: ${tile.height};
        background-image: url("${selectedImage}");
        background-position: ${tile.backgroundPosition};
        background-size:${tile.backgroundSize};
        border: ${tile.border};
      }`;
      styleSheet.appendChild(document.createTextNode(cssRule));
    }

    mainDiv.appendChild(tileDiv);
  }
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  let tiles = document.getElementById("mainDiv").children;
  let emptyDivIndex = Array.from(tiles).findIndex((tile) => tile.id === "8");
  let emptyRow = Math.floor(emptyDivIndex / 3);
  let emptyCol = emptyDivIndex % 3;

  let targetIndex = -1;

  switch (event.key) {
    case "ArrowUp":
      if (emptyRow < 2) {
        count++;
        targetIndex = emptyDivIndex + 3;
      }
      break;

    case "ArrowDown":
      if (emptyRow > 0) {
        count++;
        targetIndex = emptyDivIndex - 3;
      }
      break;

    case "ArrowRight":
      if (emptyCol > 0) {
        count++;
        targetIndex = emptyDivIndex - 1;
      }
      break;

    case "ArrowLeft":
      if (emptyCol < 2) {
        count++;
        targetIndex = emptyDivIndex + 1;
      }
      break;
  }

  if (targetIndex !== -1) {
    const emptyTile = tiles[emptyDivIndex];
    const targetTile = tiles[targetIndex];

    const tempId = emptyTile.id;
    emptyTile.id = targetTile.id;
    targetTile.id = tempId;

    const tempClass = emptyTile.className;
    emptyTile.className = targetTile.className;
    targetTile.className = tempClass;
  }

  document.getElementById("moves").textContent = `Moves : ${count}`;

  isMatching();
});

function isMatching() {
  const currentTiles = Array.from(document.getElementById("mainDiv").children);
  let count = 0;

  for (let i = 0; i < currentTiles.length; i++) {
    if (i === parseInt(currentTiles[i].id)) {
      count++;
    }
  }

  if (count === 9) {
    alert("You have successfully solved the puzzle");
  }
}

window.onload = loadGame();
