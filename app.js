document.addEventListener('DOMContentLoaded', () => {

    // ЛОГІКА РЕЄСТРАЦІЇ (register.html)
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const password = document.getElementById('regPassword').value;
            const passwordConfirm = document.getElementById('regPasswordConfirm').value;

            // Перевірка паролів
            if (password !== passwordConfirm) {
                alert('Помилка: Паролі не співпадають!');
                return;
            }

            // Збираємо дані користувача в об'єкт
            const user = {
                name: document.getElementById('regName').value,
                email: document.getElementById('regEmail').value,
                gender: document.getElementById('regGender').value,
                date: document.getElementById('regDate').value,
                password: password
            };

            // Зберігаємо у localStorage як рядок
            localStorage.setItem('app_user', JSON.stringify(user));

            alert('Реєстрація успішна! Тепер ви можете увійти.');
            window.location.href = 'login.html';
        });
    }

    // ЛОГІКА ВХОДУ (login.html)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Отримуємо збережені дані
            const savedUserStr = localStorage.getItem('app_user');

            if (savedUserStr) {
                const savedUser = JSON.parse(savedUserStr);

                // Перевіряємо, чи збігаються email та пароль
                if (savedUser.email === email && savedUser.password === password) {
                    localStorage.setItem('is_logged_in', 'true');
                    window.location.href = 'profile.html';
                } else {
                    alert('Невірний email або пароль!');
                }
            } else {
                alert('Акаунт не знайдено. Будь ласка, спочатку зареєструйтеся.');
            }
        });
    }

    // ЛОГІКА ПРОФІЛЮ (profile.html)
    const profNameElement = document.getElementById('profName');
    if (profNameElement) {
        // Перевіряємо, чи користувач успішно залогінився
        const isLoggedIn = localStorage.getItem('is_logged_in');

        if (isLoggedIn !== 'true') {
            alert('Доступ заборонено! Будь ласка, увійдіть у систему.');
            window.location.href = 'login.html';
            return;
        }

        // Завантажуємо та відображаємо дані
        const savedUserStr = localStorage.getItem('app_user');
        if (savedUserStr) {
            const savedUser = JSON.parse(savedUserStr);

            profNameElement.innerText = savedUser.name;
            document.getElementById('profEmail').innerText = savedUser.email;
            document.getElementById('profDate').innerText = savedUser.date;

            let genderText = 'Інша';
            if (savedUser.gender === 'male') genderText = 'Чоловіча';
            if (savedUser.gender === 'female') genderText = 'Жіноча';
            document.getElementById('profGender').innerText = genderText;
        }

        // Логіка кнопки виходу
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('is_logged_in');
                window.location.href = 'login.html';
            });
        }
    }

    // ЛОГІКА РЕДАГУВАННЯ ПРОФІЛЮ
    const editBtn = document.getElementById('editBtn');
    const editProfileSection = document.getElementById('editProfileSection');
    const editProfileForm = document.getElementById('editProfileForm');

    if (editBtn && editProfileSection && editProfileForm) {

        // Відкриття форми з поточними даними
        editBtn.addEventListener('click', () => {
            editProfileSection.style.display = 'block';

            const currentUser = JSON.parse(localStorage.getItem('app_user'));
            document.getElementById('editName').value = currentUser.name;
            document.getElementById('editDate').value = currentUser.date;
            document.getElementById('editGender').value = currentUser.gender;
        });

        // Збереження нових даних
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const currentUser = JSON.parse(localStorage.getItem('app_user'));

            // Оновлюємо об'єкт новими даними з форми
            currentUser.name = document.getElementById('editName').value;
            currentUser.date = document.getElementById('editDate').value;
            currentUser.gender = document.getElementById('editGender').value;

            // Зберігаємо оновлений об'єкт у пам'ять браузера
            localStorage.setItem('app_user', JSON.stringify(currentUser));

            // Оновлюємо текст у таблиці на екрані без перезавантаження
            profNameElement.innerText = currentUser.name;
            document.getElementById('profDate').innerText = currentUser.date;

            let genderText = 'Інша';
            if (currentUser.gender === 'male') genderText = 'Чоловіча';
            if (currentUser.gender === 'female') genderText = 'Жіноча';
            document.getElementById('profGender').innerText = genderText;

            editProfileSection.style.display = 'none';
        });
    }
});