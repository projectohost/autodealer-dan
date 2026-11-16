// База даних автомобілів
const CARS_DATA = [
  {
    id: 1,
    brand: 'BMW',
    model: 'X5 M Competition',
    year: 2024,
    price: 125000,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    accel: '3.8 с',
    power: '625 к.с.',
    drive: 'Повний (xDrive)',
    mileage: '0 км',
    description: 'Флагманський спортивний кросовер з вражаючою динамікою, розкішним шкіряним салоном Merino та найновішими системами безпеки.'
  },
  {
    id: 2,
    brand: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    price: 140000,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=800&q=80',
    accel: '3.3 с',
    power: '646 к.с.',
    drive: 'Повний (quattro)',
    mileage: '0 км',
    description: 'Повністю електричний гран-туризмо з пневмопідвіскою, лазерною оптикою та швидкістю зарядки до 270 кВт.'
  },
  {
    id: 3,
    brand: 'Mercedes-Benz',
    model: 'GLE 450 AMG',
    year: 2022,
    price: 78000,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    accel: '5.7 с',
    power: '367 к.с.',
    drive: 'Повний (4MATIC)',
    mileage: '35,000 км',
    description: 'Елегантний та комфортний позашляховик із м’яким гібридом, акустикою Burmester та панорамним дахом.'
  },
  {
    id: 4,
    brand: 'Porsche',
    model: 'Taycan GTS',
    year: 2023,
    price: 135000,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
    accel: '3.7 с',
    power: '598 к.с.',
    drive: 'Повний',
    mileage: '12,000 км',
    description: 'Ідеальний баланс між комфортом щоденних поїздок та трековим характером спортивного електрокара.'
  },
  {
    id: 5,
    brand: 'Toyota',
    model: 'RAV4 Hybrid AWD',
    year: 2024,
    price: 42000,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    accel: '8.1 с',
    power: '222 к.с.',
    drive: 'Повний',
    mileage: '0 км',
    description: 'Надійний та економний гібридний кросовер із високим кліренсом та асистентами водія Toyota Safety Sense.'
  },
  {
    id: 6,
    brand: 'Ford',
    model: 'Mustang GT 5.0',
    year: 2021,
    price: 39000,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80',
    accel: '4.3 с',
    power: '450 к.с.',
    drive: 'Задній',
    mileage: '42,000 км',
    description: 'Легендарний масл-кар із атмосферним V8 двигуном 5.0L, спортивним вихлопом та агресивним дизайном.'
  }
];

// --- 1. Рендеринг Каталогу ---
function renderCars(cars) {
  const container = document.getElementById('cars-grid');
  container.innerHTML = '';

  if (cars.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem 0; color: #737373;">За вашим запитом авто не знайдено</div>`;
    return;
  }

  cars.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <div>
        <div class="car-img-wrapper">
          <img src="${car.image}" alt="${car.brand} ${car.model}">
          <span class="badge ${car.isNew ? 'badge-green' : 'badge-amber'} car-badge-pos">
            ${car.isNew ? 'Новий' : 'З пробігом'}
          </span>
        </div>
        <div class="car-info">
          <div class="car-brand">${car.brand}</div>
          <h3 class="car-model">${car.model}</h3>
          <div class="car-price">$${car.price.toLocaleString()}</div>
          <div class="car-specs">
            <div><i class="fa-solid fa-gauge icon-red"></i>${car.accel}</div>
            <div><i class="fa-solid fa-bolt icon-red"></i>${car.power}</div>
            <div><i class="fa-solid fa-road icon-red"></i>${car.mileage}</div>
            <div><i class="fa-solid fa-car icon-red"></i>${car.year} р.</div>
          </div>
        </div>
      </div>
      <div class="car-actions">
        <button class="btn btn-secondary" style="flex: 1;" onclick="openCarDetails(${car.id})">Детальніше</button>
        <button class="btn btn-primary" onclick="selectCarForDrive('${car.brand} ${car.model}')">Тест-драйв</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// --- 2. Фільтрація ---
function applyFilters() {
  const brand = document.getElementById('filter-brand').value;
  const condition = document.getElementById('filter-condition').value;
  const maxPrice = Number(document.getElementById('filter-price').value);

  const filtered = CARS_DATA.filter(car => {
    const matchesBrand = brand === 'all' || car.brand === brand;
    const matchesCond = condition === 'all' || (condition === 'new' ? car.isNew : !car.isNew);
    const matchesPrice = car.price <= maxPrice;
    return matchesBrand && matchesCond && matchesPrice;
  });

  renderCars(filtered);
}

// --- 3. Кредитний Калькулятор ---
function calculateLoan() {
  const price = Number(document.getElementById('calc-price').value);
  const downPercent = Number(document.getElementById('calc-downpayment').value);
  const termMonths = Number(document.getElementById('calc-term').value);
  const annualRate = Number(document.getElementById('calc-rate').value) / 100;

  const downPaymentAmount = price * (downPercent / 100);
  const loanAmount = price - downPaymentAmount;

  const monthlyRate = annualRate / 12;
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);

  const totalPaid = (monthlyPayment * termMonths) + downPaymentAmount;
  const totalInterest = totalPaid - price;

  document.getElementById('calc-car-price-val').textContent = `$${price.toLocaleString()}`;
  document.getElementById('calc-downpayment-val').textContent = `${downPercent}% ($${downPaymentAmount.toLocaleString()})`;
  document.getElementById('calc-term-val').textContent = `${termMonths} міс.`;

  document.getElementById('calc-monthly-payment').textContent = `$${Math.round(monthlyPayment).toLocaleString()}`;
  document.getElementById('calc-loan-amount').textContent = `$${Math.round(loanAmount).toLocaleString()}`;
  document.getElementById('calc-total-interest').textContent = `$${Math.round(totalInterest).toLocaleString()}`;
  document.getElementById('calc-total-paid').textContent = `$${Math.round(totalPaid).toLocaleString()}`;
}

// --- 4. Модальні Вікна та Події ---
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function populateCarSelect() {
  const select = document.getElementById('modal-car-select');
  select.innerHTML = '';
  CARS_DATA.forEach(car => {
    const opt = document.createElement('option');
    opt.value = `${car.brand} ${car.model}`;
    opt.textContent = `${car.brand} ${car.model} (${car.year})`;
    select.appendChild(opt);
  });
}

function selectCarForDrive(carName) {
  populateCarSelect();
  document.getElementById('modal-car-select').value = carName;
  openModal('modal-test-drive');
}

function openCarDetails(id) {
  const car = CARS_DATA.find(c => c.id === id);
  if (!car) return;

  document.getElementById('modal-car-image').src = car.image;
  document.getElementById('modal-car-title').textContent = `${car.brand} ${car.model} (${car.year})`;
  document.getElementById('modal-car-price').textContent = `$${car.price.toLocaleString()}`;

  const badge = document.getElementById('modal-car-badge');
  badge.textContent = car.isNew ? 'Новий' : 'З пробігом';
  badge.className = `badge ${car.isNew ? 'badge-green' : 'badge-amber'}`;

  document.getElementById('modal-spec-accel').textContent = car.accel;
  document.getElementById('modal-spec-power').textContent = car.power;
  document.getElementById('modal-spec-drive').textContent = car.drive;
  document.getElementById('modal-spec-mileage').textContent = car.mileage;
  document.getElementById('modal-car-desc').textContent = car.description;

  openModal('modal-details');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = message;
  toast.classList.add('open');
  setTimeout(() => {
    toast.classList.remove('open');
  }, 4000);
}

// --- Ініціалізація Слухачів ---
document.addEventListener('DOMContentLoaded', () => {
  renderCars(CARS_DATA);
  calculateLoan();

  // Фільтри
  document.getElementById('filter-brand').addEventListener('change', applyFilters);
  document.getElementById('filter-condition').addEventListener('change', applyFilters);
  document.getElementById('filter-price').addEventListener('input', (e) => {
    document.getElementById('price-limit-val').textContent = `$${Number(e.target.value).toLocaleString()}`;
    applyFilters();
  });

  // Калькулятор
  document.getElementById('calc-price').addEventListener('input', calculateLoan);
  document.getElementById('calc-downpayment').addEventListener('input', calculateLoan);
  document.getElementById('calc-term').addEventListener('input', calculateLoan);
  document.getElementById('calc-rate').addEventListener('input', calculateLoan);

  // Бургер меню
  document.getElementById('burger-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('open');
  });

  // Кнопки модалок
  document.getElementById('btn-open-test-drive').addEventListener('click', () => {
    populateCarSelect();
    openModal('modal-test-drive');
  });

  document.getElementById('btn-mobile-test-drive').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.remove('open');
    populateCarSelect();
    openModal('modal-test-drive');
  });

  document.getElementById('btn-credit-apply').addEventListener('click', () => {
    populateCarSelect();
    openModal('modal-test-drive');
  });

  document.getElementById('modal-details-action').addEventListener('click', () => {
    closeModal('modal-details');
    populateCarSelect();
    openModal('modal-test-drive');
  });

  // Закриття модалок
  document.getElementById('modal-details-close').addEventListener('click', () => closeModal('modal-details'));
  document.getElementById('modal-test-drive-close').addEventListener('click', () => closeModal('modal-test-drive'));

  // Закриття по кліку на overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // Логотип (scroll top)
  document.getElementById('logo-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Відправка форм
  document.getElementById('test-drive-form').addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal('modal-test-drive');
    showToast('Дякуємо! Заявку на тест-драйв прийнято. Менеджер зателефонує вам.');
    e.target.reset();
  });

  document.getElementById('tradein-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Заявку на оцінку Trade-In успішно відправлено!');
    e.target.reset();
  });
});