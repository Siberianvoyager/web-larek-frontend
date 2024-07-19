// Описание типов для товара
export interface IProductItem {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number | null;
  }
  
  // Описание состояния приложения
  export interface IAppState {
    catalog: IProductItem[];
    preview: string;
    basket: IProductItem[];
    order: IOrder;
  }
  
  // Описание списка товаров
  export interface IProductsList {
    products: IProductItem[];
  }
  
  // Описание формы заказа
  export interface IOrderForm {
    payment?: string;
    address?: string;
    phone?: string;
    email?: string;
  }
  
  // Описание заказа
  export interface IOrder extends IOrderForm {
    items: IProductItem[];
  }
  
// Описание ошибок формы
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

  
  // Описание результата заказа
  export interface IOrderResult {
    id: string;
  }
  
  // Описание действий для карточки товара
  export interface ICardActions {
    onClick: (event: MouseEvent) => void;
  }
  
  // Описание действий для превью карточки товара
  export interface ICardPreviewActions {
    onClick: (event: MouseEvent) => void;
  }
  
  // Описание действий для корзины
  export interface ICardBasketActions {
    onClick: (event: MouseEvent) => void;
  }
  
  // Описание действий для страницы
  export interface IPageActions {
    onClick: (event: MouseEvent) => void;
  }
  
  // Описание действий для модального окна
  export interface IModalActions {
    onClick: (event: MouseEvent) => void;
  }
  
  // Описание действий для корзины в модальном окне
  export interface IBasketActions {
    onClick: (event: MouseEvent) => void;
  }
  
  // Описание действий для формы
  export interface IFormActions {
    onClick: (event: MouseEvent) => void;
  }
  
  // Описание состояния формы
  export interface IFormState {
    valid: boolean;
    errors: string[];
  }
  
  // Описание действий для успешного заказа
  export interface ISuccessActions {
    onClick: () => void;
  }
  
  // Описание данных для модального окна
  export interface IModalData {
    content: HTMLElement;
  }
  