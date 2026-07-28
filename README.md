# Article Hub

Article Hub - frontend-приложение для публикации, просмотра и обсуждения статей. Проект построен как учебный, но содержит полноценные инженерные практики: авторизацию, роли пользователей, работу с API, асинхронные Redux-модули, feature flags, новый и старый дизайн, локализацию, Storybook, unit/e2e/visual-тесты и CI.

## Что показывает проект

Проект демонстрирует разработку масштабируемого React-приложения по методологии Feature-Sliced Design. Код разделен по слоям `app`, `pages`, `widgets`, `features`, `entities`, `shared`, поэтому бизнес-логика, переиспользуемые компоненты и страницы не смешиваются между собой.

Главный пользовательский сценарий:

1. Гость открывает приложение и сразу видит новый redesigned-интерфейс.
2. Пользователь входит в аккаунт через форму авторизации.
3. После входа открываются защищенные разделы: профиль, список статей, детальная страница статьи, создание и редактирование статьи.
4. В статьях доступны фильтрация, сортировка, переключение вида, бесконечная подгрузка, комментарии, рекомендации и рейтинг.
5. Администратор или менеджер получает доступ к панели управления.

## Основные возможности

- Новый redesigned-интерфейс включен по умолчанию для гостей без авторизации.
- Старый интерфейс сохранен за feature flag `isAppRedesigned`, чтобы показать миграцию дизайна без переписывания всего приложения сразу.
- Авторизация через `json-server` с сохранением пользователя в `localStorage`.
- Ролевая модель: `USER`, `ADMIN`, `MANAGER`.
- Защищенные роуты и страница запрета доступа.
- Лента статей с фильтрами, сортировкой, поиском, типами статей и переключением вида списка.
- Детальная страница статьи с блоками текста, изображений и кода.
- Комментарии к статьям.
- Оценка статей и профилей.
- Профиль пользователя с редактированием и валидацией формы.
- Уведомления, выпадающее меню пользователя, смена темы и языка.
- Сохранение пользовательских настроек в `jsonSettings`.

## Технологический стек

- React 18
- TypeScript
- Redux Toolkit
- RTK Query
- React Router
- Axios
- i18next
- SCSS Modules
- Webpack 5
- Vite
- Storybook
- Jest и React Testing Library
- Cypress
- Loki для screenshot-тестов
- ESLint, Stylelint, Prettier, Husky

## Архитектура

Проект организован по Feature-Sliced Design:

- `src/app` - инициализация приложения, провайдеры, роутер, store, глобальные стили.
- `src/pages` - страницы приложения: главная, профиль, статьи, детали статьи, админка, настройки.
- `src/widgets` - крупные самостоятельные блоки интерфейса: Navbar, Sidebar, Page, ScrollToolbar.
- `src/features` - пользовательские сценарии: авторизация, редактирование профиля, добавление комментария, рейтинг статьи, переключение UI.
- `src/entities` - бизнес-сущности: User, Article, Profile, Comment, Rating, Notification.
- `src/shared` - общие UI-компоненты, API-клиент, helpers, hooks, layouts, константы и типы.

Такое разделение удобно презентовать как пример проекта, который можно расширять без хаотичных импортов и сильной связности между модулями.

## Feature Flags и новый дизайн

В проекте есть два UI-набора:

- `src/shared/ui/deprecated` - старые компоненты.
- `src/shared/ui/redesigned` - новые компоненты.

Переключение идет через feature flag `isAppRedesigned` и helpers `ToggleFeatures` / `toggleFeatures`.

Важное изменение для презентации: если пользователь не авторизован, приложение стартует с новым redesigned-интерфейсом. Для авторизованного пользователя дизайн может приходить из API в поле `features.isAppRedesigned`.

## Демо-аккаунты

Backend использует `json-server/db.json`. В демо-данных есть пользователи:

| Логин | Пароль | Роль | Особенности |
| --- | --- | --- | --- |
| `admin` | `123` | `ADMIN` | доступ к админке, новый дизайн |
| `user` | `123` | `USER` | базовый пользователь |
| `manager` | `123` | `MANAGER` | доступ к управленческим разделам |
| `testuser` | `123` | `ADMIN` | тестовый админ |

## Запуск проекта

Установить зависимости:

```bash
npm install
```

Запустить frontend и backend вместе на Vite:

```bash
npm run start:dev:vite
```

Альтернативный запуск frontend и backend на Webpack Dev Server:

```bash
npm run start:dev
```

Только backend:

```bash
npm run start:dev:server
```

Только frontend:

```bash
npm run start:vite
```

После запуска Vite приложение обычно доступно на `http://localhost:5173`, backend - на `http://localhost:8000`.

## Скрипты

| Команда | Назначение |
| --- | --- |
| `npm run start` | запуск frontend на Webpack Dev Server |
| `npm run start:vite` | запуск frontend на Vite |
| `npm run start:dev` | запуск frontend на Webpack + backend |
| `npm run start:dev:vite` | запуск frontend на Vite + backend |
| `npm run start:dev:server` | запуск `json-server` |
| `npm run build:prod` | production-сборка |
| `npm run build:dev` | development-сборка |
| `npm run lint:ts` | проверка TypeScript/TSX через ESLint |
| `npm run lint:scss` | проверка SCSS через Stylelint |
| `npm run test:unit` | unit и component-тесты |
| `npm run test:e2e` | запуск Cypress |
| `npm run test:ui` | screenshot-тесты Loki |
| `npm run storybook` | запуск Storybook |
| `npm run generate:slice` | генерация FSD-слайса |
| `npm run remove-feature` | удаление feature flag из кода |

## Тестирование и качество

В проекте используются несколько уровней проверки:

- Unit-тесты для чистых функций, reducers, selectors и async thunks.
- Component-тесты для UI-сценариев.
- Cypress e2e-тесты для пользовательских потоков.
- Loki screenshot-тесты для контроля визуальных регрессий.
- Storybook для изолированной разработки компонентов.
- ESLint с архитектурными правилами для FSD.
- Stylelint для SCSS.
- Husky pre-commit hooks.

Дополнительная документация:

- [Тестирование](docs/tests.md)
- [Storybook](docs/storybook.md)

## Работа с данными

Для разработки используется моковый backend на `json-server`. Основные данные лежат в `json-server/db.json`:

- `users` - пользователи, роли, feature flags и настройки.
- `articles` - статьи и их блоки.
- `comments` - комментарии.
- `profile` - данные профилей.
- `article-ratings` и `profile-ratings` - оценки и отзывы.
- `notifications` - уведомления.

Запросы к API выполняются через Axios и RTK Query. Авторизационный id пользователя передается в заголовке `Authorization` из `localStorage`.

## Что можно показать на защите или презентации

1. Старт приложения без входа в аккаунт: сразу отображается новый дизайн.
2. Вход под `admin / 123`.
3. Появление защищенных пунктов меню после авторизации.
4. Переход в список статей, фильтрация и бесконечная подгрузка.
5. Открытие статьи, просмотр блоков текста/кода/изображений.
6. Добавление комментария и выставление рейтинга.
7. Редактирование профиля с валидацией.
8. Проверка ролевого доступа к админке.
9. Переключение темы и языка.
10. Storybook как доказательство компонентного подхода.
11. Тесты и линтинг как доказательство инженерного качества.

## Ключевые файлы для объяснения

- `src/app/App.tsx` - главный layout и переключение старого/нового дизайна.
- `src/app/providers/router/config/routeConfig.tsx` - конфигурация маршрутов и защищенных страниц.
- `src/app/providers/StoreProvider/config/store.ts` - Redux store и async reducers.
- `src/shared/lib/features` - feature flags и переключение дизайна.
- `src/entities/User/model/services/initAuthData.ts` - инициализация пользователя.
- `src/features/AuthByUsername` - авторизация.
- `src/pages/ArticlesPage` - список статей, фильтры и подгрузка.
- `src/pages/ArticleDetailsPage` - детальная страница статьи.
- `src/features/editableProfileCard` - редактирование профиля.

## Сборка

Production-сборка:

```bash
npm run build:prod
```

Development-сборка:

```bash
npm run build:dev
```

## Итог

Article Hub можно презентовать как полноценное React/TypeScript приложение с продуманной архитектурой, авторизацией, ролевой моделью, управлением состоянием, моковым backend, тестами и постепенной миграцией интерфейса на новый дизайн через feature flags.
