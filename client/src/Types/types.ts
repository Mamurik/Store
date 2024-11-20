
export interface IBook {
    id: number;
    title: string;
    author: string;
    price: number;
    genre: string;
    img:string,
    desc:string 
  }
  
  export interface IUser {
    id: number;
    name: string;
    password: string; 
    role: 'user' | 'admin';
    cart?:IBook[]
  }
  
  export interface IReview {
    id: number;
    bookId: number;
    userId: number;
    rating: number; 
    comment: string;
  }
  