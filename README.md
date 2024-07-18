# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Web-ларёк

### Подробное описание проекта

#### Подход разработки

В данном проекте используется событийно-ориентированный подход, который предполагает, что взаимодействие между различными компонентами приложения осуществляется через обмен сообщениями, вызванными определенными событиями.

Кроме того, в проекте используется модель MVP (Model-View-Presenter), которая разделяет приложение на три основных компонента: модель, представление и презентатор. Модель отвечает за работу с данными и бизнес-логикой, представление представляет собой интерфейс пользователя, а презентатор связывает модель и представление, обрабатывая события и передавая данные между ними.


#### Базовый код

**Класс Model\<T>**

Абстрактный класс дженерик, обобщающий в себе конструктор и метод привязки события.

**Конструктор:**

- Принимает на вход объект данных неявного типа и объект события типа IEvent.
- Производит слияние входящего объекта с родительским.

**Методы:**

- `emmitChanges` — регистрирует входящее событие в EventEmitter.

**Класс Component\<T>**

Абстрактный класс дженерик, обобщающий в себе конструктор и основные методы работы с компонентами отображения.

**Конструктор:**

- Принимает на вход контейнер типа HTMLElement.

**Методы:**

- `toggleClass` — метод переключения класса элемента.
- `setDisabled` — метод блокировки кнопки.
- `setText` — метод установки текста элемента.
- `setImage` — метод установки изображения элемента и его alt.
- `render` — метод слияния входящих данных и отрисовки элемента.

**Класс EventEmitter**

Класс EventEmitter обеспечивает работу событий. Функциональность класса стандартная: возможность установить/снять слушатели событий, вызвать слушателей при возникновении события.

**Класс Api**

Хранит основные поля и методы, необходимые при работе с сервером. Получает и хранит базовый URL (baseUrl) и опции запроса (options). Методы позволяют обработать запрос, отправить и получить данные.


### Компоненты модели данных (Model)

**Класс LarekApi**

Основной класс работы с сетью в проекте. Расширяется базовым классом Api.

**Конструктор:**

- Передает в родительский конструктор Api поля baseUrl и options.
- Принимает и сохраняет входящий URL запроса в cdn.

**Поля:**

- `cdn` — хранит входящий URL.

**Методы:**

- `getProductList` — метод получения списка товаров с сервера.
- `orderProducts` — метод отправки данных заказа на сервер.

**Класс AppState**

Является моделью данных приложения в целом. Данный класс содержит в себе все основные группы данных страницы и методы работы с ними. Тут распределяются данные частей приложения: каталог, превью, корзина, форма заказа. Расширяется базовым абстрактным классом Model\<T> по интерфейсу IAppState.

    export interface IAppState {
      catalog: IProductItem[];
      preview: string;
      basket: string[];
      order: IOrder;
      total: string | number;
      loading: boolean;
    }

**Поля:**

- `catalog` — для данных списка товаров, пришедших с сервера.
- `preview` — для данных товара, открытого в превью.
- `basket` — для данных товаров, добавленных в корзину.
- `order` — для данных заказа, который отправляется на сервер.
- `formErrors` — для ошибок валидации.

**Методы:**

- `clearBasket` — очистка данных корзины.
- `addToOrder` — добавить товар в заказ.
- `removeFromOrder` — удалить товар из заказа.
- `setCatalog` — установить данные в каталог.
- `setPreview` — установить данные в превью.
- `setProductToBasket` — установить данные в корзину.
- `removeProductToBasket` — удалить данные товара из корзины.
- `statusBasket` — получить статус корзины.
- `bskt` — получить данные товаров в корзине.
- `total` — установить сумму товаров в корзине.
- `getTotal` — получить сумму товаров в корзине.
- `setOrderField` — установить поле заказа.
- `setContactsField` — установить поле контактов.
- `validateOrder` — провести валидацию данных заказа.
- `validateContacts` — провести валидацию данных контактов.

**Класс ProductItem**

Является моделью хранения данных товара: идентификатора, заголовка, описания, категории, изображения, цены. Расширяется базовым абстрактным классом Model\<T> по интерфейсу IProductItem.

    export interface IProductItem {
      id: string;
      title: string;
      description: string;
      category: string;
      image: string;
      price: number | null;
    }


### Компоненты представления (View)

**Класс Card**

Отвечает за отображение данных карточки товара в каталоге. Поля отвечают за связь с разметкой, методы за наполнение разметки данными. Расширяется базовым абстрактным классом Component\<T> по интерфейсу ICard.

    interface ICard {
      title: string;
      category: string;
      image: string;
      price: number;
      text: string;
    }

**Конструктор:**

- Принимает container типа HTMLElement и опциональный объект события actions типа ICardActions.

<!---->

    interface ICardActions {
      onClick: (event: MouseEvent) => void;
    }

- Передает container в родительский конструктор.
- Сохраняет необходимые элементы разметки в полях.
- Если объект actions был передан, то вешает слушатель клика на container с вызовом объекта события actions.

**Поля:**

- `_title` — хранит разметку заголовка карточки.
- `_category` — хранит разметку категории карточки.
- `_image` — хранит разметку изображения карточки.
- `_price` — хранит разметку цены карточки.
- `_categoryColor` — является словарем для дальнейшей модификации класса категории в зависимости от ее содержимого.

**Методы:**

- `set title` — установка содержимого заголовка.
- `set category` — установка содержимого категории.
- `set image` — установка содержимого изображения.
- `set price` — установка содержимого цены.

**Класс CardPreview**

Отвечает за отображение данных карточки товара в превью. Поля отвечают за связь с разметкой, методы за наполнение разметки данными. Расширяется классом Card\<T> по интерфейсу ICardPreview.

    interface ICardPreview {
      text: string;
    }

**Конструктор:**

- Принимает container типа HTMLElement и опциональный объект события actions типа ICardActions.

<!---->

    interface ICardActions {
      onClick: (event: MouseEvent) => void;
    }

- Передает container и actions в родительский конструктор.
- Сохраняет необходимые элементы разметки в полях.
- Если объект actions был передан, то вешает слушатель клика на \_button с вызовом объекта события actions, слушатель с container при этом удаляется.

**Поля:**

- `_text` — хранит разметку описания превью.
- `_button` — хранит разметку кнопки превью.

**Методы:**

- `set text` — установка содержимого описания превью.

**Класс CardBasket**

Отвечает за отображение данных карточки товара в корзине. Поля отвечают за связь с разметкой, методы за наполнение разметки данными. Расширяется базовым абстрактным классом Component\<T> по интерфейсу ICardBasket.

    interface ICardBasket {
      title: string;
      price: number;
      index: number;
    }

**Конструктор:**

- Принимает container типа HTMLElement и опциональный объект события actions типа ICardActions.

<!---->

    interface ICardActions {
      onClick: (event: MouseEvent) => void;
    }

- Передает container в родительский конструктор.
- Сохраняет необходимые элементы разметки в полях.
- Если объект actions был передан, то вешает слушатель клика на \_button с вызовом объекта события actions, слушатель с container при этом удаляется.

**Поля:**

- `_title` — хранит разметку заголовка.
- `_button` — хранит разметку кнопки удаления.
- `_price` — хранит разметку цены.
- `_index` — хранит разметку порядкового номера.

**Методы:**

- `set title` — установка содержимого заголовка.
- `set index` — установка содержимого порядкового номера.
- `set price` — установка содержимого цены.

**Класс Page**

Отвечает за отображение данных составляющих элементов страницы: каталог, корзина, счетчик товаров в корзине. Поля отвечают за связь с разметкой, методы за наполнение разметки данными, а также метод закрытия/открытия для прокрутки страницы при открытии/закрытии модального окна. Расширяется базовым абстрактным классом Component\<T> по интерфейсу IPage.

    interface IPage {
      basket: string;
      counter: number;
    }

**Конструктор:**

- Принимает container типа HTMLElement и объект события actions типа IPageActions.

<!---->

    interface IPageActions {
      onClick: (event: MouseEvent) => void;
    }

- Передает container в родительский конструктор.
- Сохраняет необходимые элементы разметки в полях.
- Вешает слушатель клика на \_catalog с вызовом объекта события actions.

**Поля:**

- `_basket` — хранит разметку элемента корзины.
- `_counter` — хранит разметку счетчика товаров.
- `_catalog` — хранит разметку каталога товаров.

**Методы:**

- `render` — перерисовка контейнера.
- `set basket` — установка данных корзины.
- `set counter` — установка данных счетчика товаров в корзине.
- `toggleScroll` — переключение стилей контейнера при открытии/закрытии модального окна.

**Класс Modal**

Отвечает за отображение модальных окон корзины и превью. Поля отвечают за связь с разметкой, методы за наполнение разметки данными. Расширяется базовым абстрактным классом Component\<T> по интерфейсу IModal.

    interface IModal {
      body: string;
      show: boolean;
    }

**Конструктор:**

- Принимает container типа HTMLElement и объект события actions типа IModalActions.

<!---->

    interface IModalActions {
      onClick: (event: MouseEvent) => void;
    }

- Передает container в родительский конструктор.
- Сохраняет необходимые элементы разметки в полях.
- Вешает слушатель клика на \_closeButton и \_overlay с вызовом объекта события actions.

**Поля:**

- `_overlay` — хранит разметку оверлея модального окна.
- `_body` — хранит разметку содержимого модального окна.
- `_closeButton` — хранит разметку кнопки закрытия модального окна.

**Методы:**

- `set body` — установка содержимого тела модального окна.
- `set show` — переключение состояния модального окна.

**Класс Basket**

Отвечает за отображение корзины. Поля отвечают за связь с разметкой, методы за наполнение разметки данными. Расширяется базовым абстрактным классом Component\<T> по интерфейсу IBasket.

    interface IBasket {
      empty: boolean;
      total: number;
    }

**Конструктор:**

- Принимает container типа HTMLElement и объект события actions типа IBasketActions.

<!---->

    interface IBasketActions {
      onClick: (event: MouseEvent) => void;
    }

- Передает container в родительский конструктор.
- Сохраняет необходимые элементы разметки в полях.
- Вешает слушатель клика на \_button с вызовом объекта события actions.

**Поля:**

- `_total` — хранит разметку элемента общей суммы.
- `_empty` — хранит разметку элемента пустой корзины.
- `_button` — хранит разметку кнопки оформления заказа.

**Методы:**

- `set total` — установка суммы товаров.
- `set empty` — установка состояния пустой корзины.

**Класс Form**

Отвечает за отображение формы заказа. Поля отвечают за связь с разметкой, методы за наполнение разметки данными. Расширяется базовым абстрактным классом Component\<T> по интерфейсу IForm.

    interface IForm {
      submit: () => void;
      update: (event: MouseEvent) => void;
      reset: () => void;
    }

**Конструктор:**

- Принимает container типа HTMLElement и объект события actions типа IFormActions.

<!---->

    interface IFormActions {
      onClick: (event: MouseEvent) => void;
    }

- Передает container в родительский конструктор.
- Сохраняет необходимые элементы разметки в полях.
- Вешает слушатели событий на \_form (submit), \_button (click) и \_resetButton (click) с вызовом объектов событий actions.

**Поля:**

- `_form` — хранит разметку элемента формы.
- `_resetButton` — хранит разметку кнопки сброса формы.
- `_button` — хранит разметку кнопки отправки формы.

**Методы:**

- `set submit` — обработка отправки формы.
- `set reset` — обработка сброса формы.


### Презентаторы

**Класс AppPresenter**

Отвечает за связь между моделью данных (AppState) и представлением (Page, Basket, Card, CardPreview). Поля отвечают за хранение экземпляров моделей и представлений, методы за обработку событий и обновление представления.

**Конструктор:**

- Принимает экземпляры модели AppState и представлений Page, Basket, Card, CardPreview, Form.
- Инициализирует обработчики событий для представлений.
- Связывает события модели с методами обновления представлений.

**Поля:**

- `appState` — хранит экземпляр модели AppState.
- `page` — хранит экземпляр представления Page.
- `basket` — хранит экземпляр представления Basket.
- `card` — хранит экземпляр представления Card.
- `cardPreview` — хранит экземпляр представления CardPreview.
- `form` — хранит экземпляр представления Form.

**Методы:**

- `init` — инициализация приложения, загрузка данных, установка начальных значений.
- `handleAddToBasket` — обработка добавления товара в корзину.
- `handleRemoveFromBasket` — обработка удаления товара из корзины.
- `handlePreview` — обработка открытия превью товара.
- `handleSubmitOrder` — обработка отправки заказа.
- `handleResetForm` — обработка сброса формы.
- `updateView` — обновление представления на основе данных модели.


### Заключение

Проект представляет собой модульное, событийно-ориентированное веб-приложение, в котором используются современные подходы к разработке и архитектуре. Каждая часть приложения, будь то модель данных, представление или презентатор, четко разделена и имеет свои обязанности, что обеспечивает удобство в разработке, тестировании и поддержке кода.
