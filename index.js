function shuffle() {
  var arr = [];
  while (arr.length < 9) {
    var r = Math.floor(Math.random() * 9);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
function loadGame() {
  document.body.style.display = "flex";
  document.body.style.justifyContent = "space-evenly";
  document.body.style.alignItems = "center";
  const mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "mainDiv");
  mainDiv.style.width = "500px";
  mainDiv.style.height = "500px";
  mainDiv.style.backgroundColor = "black";
  mainDiv.style.display = "grid";
  mainDiv.style.gridTemplateColumns = "repeat(3,1fr)";
  mainDiv.style.alignItems = "center";
  mainDiv.style.justifyItems = "center";
  document.body.appendChild(mainDiv);
  let divObjects = shuffle();

  for (let i of divObjects) {
    let tileDiv = document.createElement("div");
    tileDiv.setAttribute("id", `${i}`);
    tileDiv.classList.add(`tile${i}`);
    tileDiv.style.backgroundSize = "295%";
    mainDiv.appendChild(tileDiv);
  }

  console.log(mainDiv.children);

  const imagePreview = document.createElement("img");
  imagePreview.setAttribute("src", "./assets/scramble-image.jpg");
  imagePreview.style.width = "500px";
  imagePreview.style.height = "500px";
  document.body.appendChild(imagePreview);
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
        targetIndex = emptyDivIndex + 3;
      }
      // let upperTile = emptyDivIndex + 3;
      // console.log(upperTile);
      // document
      //   .getElementById(`${upperTile}`)
      //   .classList.remove(`tile${upperTile}`);
      // document.getElementById(`${upperTile}`).classList.add(`tile${8}`);
      // document.getElementById(`${emptyDiv}`).classList.remove(`tile${8}`);
      // document.getElementById(`${emptyDiv}`).classList.add(`tile${upperTile}`);
      break;

    case "ArrowDown":
      if (emptyRow > 0) {
        targetIndex = emptyDivIndex - 3;
      }
      // let lowerTile = emptyDivIndex - 3;
      // console.log(lowerTile);
      // document
      //   .getElementById(`${lowerTile}`)
      //   .classList.remove(`tile${lowerTile}`);
      // document.getElementById(`${lowerTile}`).classList.add(`tile${8}`);
      // document.getElementById(`${emptyDiv}`).classList.remove(`tile${8}`);
      // document.getElementById(`${emptyDiv}`).classList.add(`tile${lowerTile}`);
      break;

    case "ArrowRight":
      if (emptyCol > 0) {
        targetIndex = emptyDivIndex - 1;
      }

      // let rightTile = emptyDivIndex - 1;
      // console.log(rightTile);
      // document
      //   .getElementById(`${rightTile}`)
      //   .classList.remove(`tile${rightTile}`);
      // document.getElementById(`${rightTile}`).classList.add(`tile${8}`);
      // document.getElementById(`${emptyDiv}`).classList.remove(`tile${8}`);
      // document.getElementById(`${emptyDiv}`).classList.add(`tile${rightTile}`);
      break;

    case "ArrowLeft":
      if (emptyCol < 2) {
        targetIndex = emptyDivIndex + 1;
      }
      // let leftTile = emptyDivIndex + 1;
      // console.log(leftTile);
      // document
      //   .getElementById(`${leftTile}`)
      //   .classList.remove(`tile${leftTile}`);
      // document.getElementById(`${leftTile}`).classList.add(`tile${8}`);
      // document.getElementById(`${emptyDiv}`).classList.remove(`tile${8}`);
      // document.getElementById(`${emptyDiv}`).classList.add(`tile${leftTile}`);
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
  isMatching();
});

function isMatching() {
  const currentTiles = Array.from(document.getElementById("mainDiv").children);
  console.log(currentTiles.length);

  let count = 0;

  for (let i = 0; i < currentTiles.length; i++) {
    if (i === parseInt(currentTiles[i].id)) {
      count++;
    }
  }
  if (count === 3) {
    alert("You have solved 33% of the Puzzle");
  } else if (count === 8) {
    alert("You have successfully solved the puzzle");
  }
}
loadGame();
