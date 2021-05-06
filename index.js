const html = document.querySelector('html');
const btnThemeToggle = document.querySelector('.theme-toggle__checkbox');

if (localStorage.getItem('theme') == 'dark') {
  btnThemeToggle.checked = true;
  html.classList.add('dark-theme');
} else {
  btnThemeToggle.checked = false;
  html.classList.remove('dark-theme');
}

const setThemeToggle = () => {
  if (btnThemeToggle.checked) {
    html.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
};

btnThemeToggle.addEventListener('input', setThemeToggle);

// favorite__slider main page START
const favoriteSliderList = document.querySelector('.favorite__slider .slider__list');
const favoriteSliderItems = document.querySelectorAll('.favorite__slider .slider__item');
const favoriteRangeInput = document.querySelector('.favorite__slider #rangeInput');
const favoriteRangeOutput = document.querySelector('.favorite__slider #rangeOutput');

let favoriteSliderItemAllWidth = 0;

const getWidthFavoriteSliderItem = () => {
  const favoriteSliderItemStyle = window.getComputedStyle(favoriteSliderItems[0], null);
  const favoriteSliderItemWidth = favoriteSliderItems[0].offsetWidth;
  const favoriteSliderItemMargin = parseFloat(favoriteSliderItemStyle.marginRight);
  favoriteSliderItemAllWidth = favoriteSliderItemWidth + favoriteSliderItemMargin;
  favoriteSliderList.style.cssText = `transform: translateX(-${favoriteSliderItemAllWidth}px); left: ${favoriteSliderItemAllWidth}px;`;
};

const setActiveFavoriteSliderItem = (e) => {
  const parent = e.target.closest('.slider__item');
  const parentId = parent.dataset.id;

  favoriteSliderItems.forEach((el) => {
    el.classList.remove('active');
  });

  parent.classList.add('active');
  favoriteSliderList.style.cssText = `transform: translateX(-${
    favoriteSliderItemAllWidth * parentId
  }px); left: ${favoriteSliderItemAllWidth}px;`;

  favoriteRangeInput.value = +parentId + 1;
  favoriteRangeOutput.innerHTML = +parentId + 1;
};

const setActiveFavoriteSliderItemRange = (e) => {
  const value = e.target.value - 1;

  favoriteSliderItems.forEach((el) => {
    el.classList.remove('active');
  });

  favoriteSliderItems[value].classList.add('active');

  favoriteSliderList.style.cssText = `transform: translateX(-${
    favoriteSliderItemAllWidth * value
  }px); left: ${favoriteSliderItemAllWidth}px;`;
};

if (favoriteSliderList) {
  getWidthFavoriteSliderItem();
  window.addEventListener('resize', () => {
    widthFavoriteSliderItem = getWidthFavoriteSliderItem();
  });

  favoriteSliderList.addEventListener('click', setActiveFavoriteSliderItem);
  favoriteRangeInput.addEventListener('input', setActiveFavoriteSliderItemRange);
}
// favorite__slider main page END

// pets__slider main page START
const petsSliderList = document.querySelector('.pets__slider .slider__list');
const petsSliderItems = document.querySelectorAll('.pets__slider .slider__item');
const petsRangeInput = document.querySelector('#rangeInputPets');
const petsRangeOutput = document.querySelector('#rangeOutputPets');
const petsBtnPrev = document.querySelector('.pets__slider .slider__prev');
const petsBtnNext = document.querySelector('.pets__slider .slider__next');

let petsSliderIndexActiveItem = 1;
let petsSliderItemAllWidth = 0;
let petsSliderItemWidth = 0;
let petsSliderNumberVisibleItems = 0;

const getWidthPetsSliderItem = () => {
  const petsSliderItemStyle = window.getComputedStyle(petsSliderItems[0], null);
  petsSliderItemWidth = petsSliderItems[0].offsetWidth;
  const petsSliderItemMargin = parseFloat(petsSliderItemStyle.marginRight);
  petsSliderItemAllWidth = petsSliderItemWidth + petsSliderItemMargin;
};

const getPetsSliderNumberVisibleItems = () => {
  const petsSliderListWidth = petsSliderList.offsetWidth;
  petsSliderNumberVisibleItems = Math.floor(petsSliderListWidth / petsSliderItemWidth);
};

const setActivePetsSliderItemRange = (e) => {
  const value = e.target.value;
  petsSliderIndexActiveItem = value;

  petsSliderItems.forEach((el) => {
    el.classList.remove('active');
  });

  if (petsSliderIndexActiveItem > petsSliderNumberVisibleItems) {
    petsSliderList.style.cssText = `transform: translateX(-${
      petsSliderItemAllWidth * (petsSliderIndexActiveItem - petsSliderNumberVisibleItems)
    }px);`;
    petsSliderItems[petsSliderIndexActiveItem - 1].classList.add('active');
  } else if (petsSliderIndexActiveItem >= petsSliderNumberVisibleItems) {
    petsSliderList.style.cssText = `transform: translateX(-${
      petsSliderItemAllWidth * (petsSliderIndexActiveItem - petsSliderNumberVisibleItems)
    }px);`;
    petsSliderItems[petsSliderIndexActiveItem - 1].classList.add('active');
  } else {
    petsSliderItems[petsSliderIndexActiveItem - 1].classList.add('active');
    petsSliderList.style.cssText = `transform: translateX(0px);`;
  }
};

const setActivePetsBtnNext = () => {
  petsSliderIndexActiveItem++;

  petsSliderItems.forEach((el) => {
    el.classList.remove('active');
  });

  if (petsSliderIndexActiveItem > petsSliderItems.length) {
    petsSliderList.style.cssText = `transform: translateX(0px);`;
    petsSliderIndexActiveItem = 1;
  }

  if (petsSliderIndexActiveItem > petsSliderNumberVisibleItems) {
    petsSliderList.style.cssText = `transform: translateX(-${
      petsSliderItemAllWidth * (petsSliderIndexActiveItem - petsSliderNumberVisibleItems)
    }px);`;
    petsSliderItems[petsSliderIndexActiveItem - 1].classList.add('active');
  } else {
    petsSliderItems[petsSliderIndexActiveItem - 1].classList.add('active');
  }

  petsRangeInput.value = +petsSliderIndexActiveItem;
  petsRangeOutput.innerHTML = +petsSliderIndexActiveItem;
};

const setActivePetsBtnPrev = () => {
  petsSliderIndexActiveItem--;

  petsSliderItems.forEach((el) => {
    el.classList.remove('active');
  });

  if (petsSliderIndexActiveItem < 1) {
    petsSliderIndexActiveItem = petsSliderItems.length;

    petsSliderList.style.cssText = `transform: translateX(-${
      petsSliderItemAllWidth * (petsSliderIndexActiveItem - petsSliderNumberVisibleItems)
    }px);`;
  }

  if (petsSliderIndexActiveItem >= petsSliderNumberVisibleItems) {
    petsSliderList.style.cssText = `transform: translateX(-${
      petsSliderItemAllWidth * (petsSliderIndexActiveItem - petsSliderNumberVisibleItems)
    }px);`;
    petsSliderItems[petsSliderIndexActiveItem - 1].classList.add('active');
  } else {
    petsSliderItems[petsSliderIndexActiveItem - 1].classList.add('active');
  }

  petsRangeInput.value = +petsSliderIndexActiveItem;
  petsRangeOutput.innerHTML = +petsSliderIndexActiveItem;
};

if (petsSliderList) {
  getWidthPetsSliderItem();
  getPetsSliderNumberVisibleItems();

  window.addEventListener('resize', () => {
    widthPetsSliderItem = getWidthPetsSliderItem();
  });

  petsBtnNext.addEventListener('click', setActivePetsBtnNext);
  petsBtnPrev.addEventListener('click', setActivePetsBtnPrev);
  petsRangeInput.addEventListener('input', setActivePetsSliderItemRange);
}
// pets__slider main page END

// favorite-map__slider map page START
const mapSliderList = document.querySelector('.page-map .favorite-map__list');
const mapSliderItems = document.querySelectorAll('.page-map .favorite-map__item');
const mapRangeInput = document.querySelector('#rangeInputtesFavorite');
const mapRangeOutput = document.querySelector('#rangeOutputFavorite');
const mapBtnPrev = document.querySelector('.page-map .slider__prev');
const mapBtnNext = document.querySelector('.page-map .slider__next');

let mapSliderIndexActiveItem = 2;
let mapSliderItemAllWidth = 0;
let mapSliderItemWidth = 0;
let mapSliderNumberVisibleItems = 0;

const getWidthMapSliderItem = () => {
  const mapSliderItemStyle = window.getComputedStyle(mapSliderItems[0], null);
  mapSliderItemWidth = mapSliderItems[0].offsetWidth;
  const mapSliderItemMargin = parseFloat(mapSliderItemStyle.marginRight) + parseFloat(mapSliderItemStyle.marginLeft);
  mapSliderItemAllWidth = mapSliderItemWidth + mapSliderItemMargin;
};

const getMapSliderNumberVisibleItems = () => {
  const mapSliderListWidth = mapSliderList.offsetWidth;
  mapSliderNumberVisibleItems = Math.floor((mapSliderListWidth + 43) / mapSliderItemAllWidth);
  console.log(mapSliderNumberVisibleItems);
};

const setActiveMapSliderItemRange = (e) => {
  const value = e.target.value;
  mapSliderIndexActiveItem = value;

  mapSliderItems.forEach((el) => {
    el.classList.remove('active');
  });

  if (mapSliderIndexActiveItem > mapSliderNumberVisibleItems) {
    mapSliderList.style.cssText = `transform: translateX(-${
      mapSliderItemAllWidth * (mapSliderIndexActiveItem - mapSliderNumberVisibleItems)
    }px);`;
    mapSliderItems[mapSliderIndexActiveItem - 1].classList.add('active');
  } else if (mapSliderIndexActiveItem >= mapSliderNumberVisibleItems) {
    mapSliderList.style.cssText = `transform: translateX(-${
      mapSliderItemAllWidth * (mapSliderIndexActiveItem - mapSliderNumberVisibleItems)
    }px);`;
    mapSliderItems[mapSliderIndexActiveItem - 1].classList.add('active');
  } else {
    mapSliderItems[mapSliderIndexActiveItem - 1].classList.add('active');
    mapSliderList.style.cssText = `transform: translateX(0px);`;
  }

  mapRangeOutput.innerHTML =
    +mapSliderIndexActiveItem < 10 ? `0${+mapSliderIndexActiveItem}` : +mapSliderIndexActiveItem;
};

const setActiveMapBtnNext = () => {
  mapSliderIndexActiveItem++;

  mapSliderItems.forEach((el) => {
    el.classList.remove('active');
  });

  if (mapSliderIndexActiveItem > mapSliderItems.length) {
    mapSliderList.style.cssText = `transform: translateX(0px);`;
    mapSliderIndexActiveItem = 1;
  }

  if (mapSliderIndexActiveItem > mapSliderNumberVisibleItems) {
    mapSliderList.style.cssText = `transform: translateX(-${
      mapSliderItemAllWidth * (mapSliderIndexActiveItem - mapSliderNumberVisibleItems)
    }px);`;
    mapSliderItems[mapSliderIndexActiveItem - 1].classList.add('active');
  } else {
    mapSliderItems[mapSliderIndexActiveItem - 1].classList.add('active');
  }

  mapRangeInput.value = +mapSliderIndexActiveItem;
  mapRangeOutput.innerHTML =
    +mapSliderIndexActiveItem < 10 ? `0${+mapSliderIndexActiveItem}` : +mapSliderIndexActiveItem;
};

const setActiveMapBtnPrev = () => {
  mapSliderIndexActiveItem--;

  mapSliderItems.forEach((el) => {
    el.classList.remove('active');
  });

  if (mapSliderIndexActiveItem < 1) {
    mapSliderIndexActiveItem = mapSliderItems.length;

    mapSliderList.style.cssText = `transform: translateX(-${
      mapSliderItemAllWidth * (mapSliderIndexActiveItem - mapSliderNumberVisibleItems)
    }px);`;
  }

  if (mapSliderIndexActiveItem >= mapSliderNumberVisibleItems) {
    mapSliderList.style.cssText = `transform: translateX(-${
      mapSliderItemAllWidth * (mapSliderIndexActiveItem - mapSliderNumberVisibleItems)
    }px);`;
    mapSliderItems[mapSliderIndexActiveItem - 1].classList.add('active');
  } else {
    mapSliderItems[mapSliderIndexActiveItem - 1].classList.add('active');
  }

  mapRangeInput.value = +mapSliderIndexActiveItem;
  mapRangeOutput.innerHTML =
    +mapSliderIndexActiveItem < 10 ? `0${+mapSliderIndexActiveItem}` : +mapSliderIndexActiveItem;
};

if (mapSliderList) {
  getWidthMapSliderItem();
  getMapSliderNumberVisibleItems();

  window.addEventListener('resize', () => {
    widthMapSliderItem = getWidthMapSliderItem();
  });

  mapBtnNext.addEventListener('click', setActiveMapBtnNext);
  mapBtnPrev.addEventListener('click', setActiveMapBtnPrev);
  mapRangeInput.addEventListener('input', setActiveMapSliderItemRange);
}
// favorite-map__slider map page END
