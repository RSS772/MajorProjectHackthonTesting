# 🧪 Playwright Test Automation Project

This repository contains an end-to-end test automation framework built using [Playwright](https://playwright.dev/).
 It is designed to efficiently test web applications with features such as parallel execution, retries, HTML and Allure reporting, and GitHub Actions integration.

## 📁 Project Structure
.
├── .github/
│   └── workflows/
│       └── playwright.yml        # CI workflow for GitHub Actions
├── allure-report/                # Allure HTML report files
├── allure-results/               # Allure test result files
├── data/
│   └── loginData.json            # Login test data
├── pages/
│   └── AccountLogin.js           # Page Object Model for login
├── tests/
│   └── AccountLogin.spec.js      # Login test cases
├── playwright.config.js          # Test configuration settings
├── package.json                  # Project dependencies and scripts
└── README.md                     # Documentation file

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Playwright](https://playwright.dev/)
- [Allure Report](https://docs.qameta.io/allure/) (optional for advanced reporting)


## 🚀 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright and browsers**:
   ```bash
   npx playwright install --with-deps
   ```

4. *(Optional)* Install Allure CLI:
   ```bash
   npm install -g allure-commandline --save-dev
   ```

---

## 🧪 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Sanity Tests (Tagged)
```bash
npx playwright test --grep @sanity
```

---

## 🔁 CI/CD Integration

This project uses GitHub Actions (`.github/workflows/playwright.yml`) to run tests automatically on every push or pull request to the `main` or `master` branch.

---

## 📊 Reporting

### Playwright HTML Report
```bash
npx playwright show-report
```

### Allure Report
```bash
allure generate allure-results --clean
allure open
```

---

## 🛠 Configuration

The test setup is configured in `playwright.config.js`. Key settings include:

- **Test directory**: `./tests`
- **Timeout**: 90 seconds per test
- **Retries**: 2 on CI
- **Browser**: Chromium
- **Reporters**: HTML & Allure

---

## 🧩 Test Data

Test inputs are stored in `data/loginData.json`. Modify this file to update credentials or scenarios.

---

## 📦 Page Object Model

The framework follows the Page Object Model (POM) design pattern. Page logic and selectors are encapsulated in `pages/AccountLogin.js`.

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request with a description

---

## 📜 License

This project is licensed under the MIT License.

---

## 📬 Contact

For questions, feedback, or support, please reach out at: `ritiksisodiya7610@gmail.com`

---
