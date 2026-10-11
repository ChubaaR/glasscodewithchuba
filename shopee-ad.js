
const overlay = document.getElementById("adOverlay");
const closeButton = document.getElementById("closeAd");
const timerDisplay = document.getElementById("adTimer");
const shopeeButton = document.getElementById("shopeeButton");

const affiliateLink = "https://s.shopee.com.my/20w9CXGzBR";
const startTime = Date.now();
let secondsLeft = 5;

function openAffiliate() {
  window.open(affiliateLink, "_blank", "noopener,noreferrer");
}

function closeAd() {
  // Tell index.html to close the iframe
  window.parent.postMessage("closeShopeeAd", "*");
}

function handleClick() {
  if (secondsLeft > 0) {
    openAffiliate();
  } else {
    closeAd();
  }
}

closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  handleClick();
});

shopeeButton.addEventListener("click", (event) => {
  if (secondsLeft > 0) {
    event.preventDefault();
  }
  event.stopPropagation();
});

overlay.addEventListener("click", (event) => {
  if (event.target === overlay || event.target.closest(".shopee-ad-modal")) {
    handleClick();
  }
});

const timer = setInterval(() => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  secondsLeft = Math.max(0, 5 - elapsed);

  timerDisplay.textContent = secondsLeft > 0
    ? `${secondsLeft}s`
    : "Ready";

  if (elapsed >= 3) {
    closeButton.hidden = false;
  }

  if (secondsLeft === 0) {
    clearInterval(timer);
    shopeeButton.classList.remove("disabled");
  }
}, 100);
