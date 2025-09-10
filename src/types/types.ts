// src/types/types.ts

import Stripe from "stripe";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
}
