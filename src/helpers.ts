import "web-animations-js";

export function makePrice(price: number) {
  return (
    "€" +
    (price / 100)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
}

export function fiddlesticks() {
  const image = new Image(718, 750);
  image.src = "/dinosaur.png";
  image.style.position = "fixed";
  const mobile = document.documentElement.clientWidth < 688;
  image.style.width = mobile ? "60vw" : "718px";
  image.style.height = mobile ? "calc(60vw * 1.045)" : "750px";
  image.style.bottom = "0";
  image.style.right = "0";
  document.body.appendChild(image);
  image.animate(
    {
      transform: [
        "translate(0, calc(60vw * 1.045))",
        "translate(0, 0)",
        "translate(-80vw, 0)",
        "translate(-80vw, calc(60vw * 1.045))"
      ]
    },
    {
      duration: 4000,
      easing: "ease-out"
    }
  );

  const text = document.createElement("h1");
  text.innerText = "FIDDLESTICKS!!";
  text.className = "fiddlesticks";
  document.body.appendChild(text);

  const audio = new Audio("/dinosaur.mp3");
  audio.play();
  window.setTimeout(() => {
    document.body.removeChild(image);
    document.body.removeChild(text);
  }, 3900);
}
