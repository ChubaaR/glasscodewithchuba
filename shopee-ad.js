
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
  window.parent.postMessage("closeShopeeAd", "*");
}

function handleClick() {
  if (secondsLeft > 0) {
    openAffiliate();
  } else {
    closeAd();
  }
}

// X button
closeButton.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  handleClick();
});

// Shopee button
shopeeButton.addEventListener("click", function (event) {
  event.stopPropagation();

  if (secondsLeft > 0) {
    event.preventDefault();
  }
});

// Only clicks outside the popup trigger the overlay action
overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    handleClick();
  }
});

// Countdown
const timer = setInterval(function () {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  secondsLeft = Math.max(0, 5 - elapsed);

  timerDisplay.textContent =
    secondsLeft > 0 ? `${secondsLeft}s` : "Ready";

  if (elapsed >= 3) {
    closeButton.hidden = false;
  }

  if (secondsLeft === 0) {
    clearInterval(timer);
    shopeeButton.classList.remove("disabled");
    shopeeButton.removeAttribute("aria-disabled");
  }
}, 100);
