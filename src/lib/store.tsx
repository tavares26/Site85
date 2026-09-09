"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { PRODUCTS, getProduct, type Product } from "@/data/products";
import {
  computeTotals,
  makeOrderId,
  quoteShipping,
  type Coupon,
  type ShippingOption,
  type Totals,
} from "@/lib/commerce";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type BagLine = {
  /** productId::color::size — one line per unique configuration. */
  key: string;
  productId: string;
  color: string;
  size: string;
  quantity: number;
};

export type Address = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
};

export type DemoOrder = {
  id: string;
  placedAt: string;
  lines: Array<{
    productId: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  address: Address;
  shipping: ShippingOption;
  couponCode: string | null;
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  cardLast4: string;
};

type State = {
  /** False until localStorage has been read — guards against hydration drift. */
  ready: boolean;
  lines: BagLine[];
  favorites: string[];
  couponCode: string | null;
  cep: string;
  shippingId: string | null;
  orders: DemoOrder[];
};

const EMPTY_STATE: State = {
  ready: false,
  lines: [],
  favorites: [],
  couponCode: null,
  cep: "",
  shippingId: null,
  orders: [],
};

type Action =
  | { type: "hydrate"; state: Omit<State, "ready"> }
  | { type: "add"; line: Omit<BagLine, "key" | "quantity">; quantity: number }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clearBag" }
  | { type: "toggleFavorite"; productId: string }
  | { type: "setCoupon"; code: string | null }
  | { type: "setCep"; cep: string }
  | { type: "setShipping"; id: string | null }
  | { type: "addOrder"; order: DemoOrder };

function lineKey(productId: string, color: string, size: string) {
  return `${productId}::${color}::${size}`;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { ...action.state, ready: true };

    case "add": {
      const key = lineKey(action.line.productId, action.line.color, action.line.size);
      const existing = state.lines.find((l) => l.key === key);
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.key === key
              ? { ...l, quantity: Math.min(10, l.quantity + action.quantity) }
              : l
          ),
        };
      }
      return {
        ...state,
        lines: [...state.lines, { key, ...action.line, quantity: action.quantity }],
      };
    }

    case "setQuantity": {
      if (action.quantity <= 0) {
        return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };
      }
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.key === action.key ? { ...l, quantity: Math.min(10, action.quantity) } : l
        ),
      };
    }

    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };

    case "clearBag":
      return { ...state, lines: [], couponCode: null, shippingId: null };

    case "toggleFavorite":
      return {
        ...state,
        favorites: state.favorites.includes(action.productId)
          ? state.favorites.filter((id) => id !== action.productId)
          : [...state.favorites, action.productId],
      };

    case "setCoupon":
      return { ...state, couponCode: action.code };

    case "setCep":
      return { ...state, cep: action.cep };

    case "setShipping":
      return { ...state, shippingId: action.id };

    case "addOrder":
      return { ...state, orders: [action.order, ...state.orders].slice(0, 20) };

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Persistence                                                         */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "north85:store:v1";

function readStorage(): Omit<State, "ready"> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<State>;
    // Drop any line whose product no longer exists in the catalogue.
    const lines = (parsed.lines ?? []).filter((l) =>
      PRODUCTS.some((p) => p.id === l.productId)
    );
    return {
      ...EMPTY_STATE,
      ...parsed,
      lines,
      favorites: (parsed.favorites ?? []).filter((id) =>
        PRODUCTS.some((p) => p.id === id)
      ),
    };
  } catch {
    return EMPTY_STATE;
  }
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

export type ResolvedLine = BagLine & {
  product: Product;
  unitPrice: number;
  lineTotal: number;
  image: string;
};

type StoreContextValue = {
  /** False until localStorage has been read — guards against hydration drift. */
  ready: boolean;
  lines: ResolvedLine[];
  count: number;
  favorites: string[];
  favoriteProducts: Product[];
  coupon: Coupon | null;
  couponCode: string | null;
  cep: string;
  shippingOptions: ShippingOption[];
  shipping: ShippingOption | null;
  totals: Totals;
  orders: DemoOrder[];
  bagOpen: boolean;
  searchOpen: boolean;
  lastAdded: ResolvedLine | null;
  addToBag: (input: { productId: string; color: string; size: string; quantity?: number }) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearBag: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  applyCoupon: (code: string | null) => void;
  setCep: (cep: string) => void;
  selectShipping: (id: string | null) => void;
  placeOrder: (input: { address: Address; cardLast4: string }) => DemoOrder | null;
  getOrder: (id: string) => DemoOrder | undefined;
  openBag: () => void;
  closeBag: () => void;
  openSearch: () => void;
  closeSearch: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

import { COUPONS } from "@/lib/commerce";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, EMPTY_STATE);
  const [bagOpen, setBagOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null);
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read once on mount. Until this lands the tree renders the empty state on
  // both server and client, so there is nothing to mismatch.
  useEffect(() => {
    dispatch({ type: "hydrate", state: readStorage() });
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => {
      try {
        // `ready` is transient — it should never come back from storage.
        const persisted: Partial<State> = { ...state };
        delete persisted.ready;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
      } catch {
        /* Private browsing, quota, or a locked-down browser — not fatal here. */
      }
    }, 120);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [state]);

  const lines = useMemo<ResolvedLine[]>(() => {
    return state.lines.flatMap((line) => {
      const product = PRODUCTS.find((p) => p.id === line.productId);
      if (!product) return [];
      const colorIndex = Math.max(
        0,
        product.colors.findIndex((c) => c.name === line.color)
      );
      return [
        {
          ...line,
          product,
          unitPrice: product.price,
          lineTotal: product.price * line.quantity,
          image: product.images[colorIndex % product.images.length],
        },
      ];
    });
  }, [state.lines]);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.lineTotal, 0),
    [lines]
  );

  const coupon = useMemo(
    () => COUPONS.find((c) => c.code === state.couponCode) ?? null,
    [state.couponCode]
  );

  const shippingOptions = useMemo(
    () => (state.cep ? quoteShipping(state.cep) : []),
    [state.cep]
  );

  const shipping = useMemo(
    () => shippingOptions.find((o) => o.id === state.shippingId) ?? null,
    [shippingOptions, state.shippingId]
  );

  const totals = useMemo(
    () => computeTotals(subtotal, coupon, shipping),
    [subtotal, coupon, shipping]
  );

  const favoriteProducts = useMemo(
    () => state.favorites.flatMap((id) => PRODUCTS.filter((p) => p.id === id)),
    [state.favorites]
  );

  const addToBag = useCallback<StoreContextValue["addToBag"]>(
    ({ productId, color, size, quantity = 1 }) => {
      dispatch({ type: "add", line: { productId, color, size }, quantity });
      setLastAddedKey(lineKey(productId, color, size));
      setBagOpen(true);
    },
    []
  );

  const placeOrder = useCallback<StoreContextValue["placeOrder"]>(
    ({ address, cardLast4 }) => {
      if (lines.length === 0) return null;
      const resolvedShipping =
        shipping ?? quoteShipping(state.cep || "01310-100")[0];

      const order: DemoOrder = {
        id: makeOrderId(24 + state.orders.length),
        placedAt: new Date().toISOString(),
        lines: lines.map((l) => ({
          productId: l.productId,
          name: l.product.name,
          color: l.color,
          size: l.size,
          quantity: l.quantity,
          price: l.unitPrice,
          image: l.image,
        })),
        address,
        shipping: resolvedShipping,
        couponCode: state.couponCode,
        subtotal: totals.subtotal,
        discount: totals.discount,
        shippingCost: totals.shipping,
        total: totals.total,
        cardLast4,
      };

      dispatch({ type: "addOrder", order });
      dispatch({ type: "clearBag" });
      return order;
    },
    [lines, shipping, state.cep, state.couponCode, state.orders.length, totals]
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      ready: state.ready,
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      favorites: state.favorites,
      favoriteProducts,
      coupon,
      couponCode: state.couponCode,
      cep: state.cep,
      shippingOptions,
      shipping,
      totals,
      orders: state.orders,
      bagOpen,
      searchOpen,
      lastAdded: lines.find((l) => l.key === lastAddedKey) ?? null,
      addToBag,
      setQuantity: (key, quantity) => dispatch({ type: "setQuantity", key, quantity }),
      removeLine: (key) => dispatch({ type: "remove", key }),
      clearBag: () => dispatch({ type: "clearBag" }),
      toggleFavorite: (productId) => dispatch({ type: "toggleFavorite", productId }),
      isFavorite: (productId) => state.favorites.includes(productId),
      applyCoupon: (code) => dispatch({ type: "setCoupon", code }),
      setCep: (cep) => dispatch({ type: "setCep", cep }),
      selectShipping: (id) => dispatch({ type: "setShipping", id }),
      placeOrder,
      getOrder: (id) => state.orders.find((o) => o.id === id),
      openBag: () => setBagOpen(true),
      closeBag: () => setBagOpen(false),
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
    }),
    [
      state.ready, lines, state.favorites, state.couponCode, state.cep, state.orders,
      favoriteProducts, coupon, shippingOptions, shipping, totals, bagOpen,
      searchOpen, lastAddedKey, addToBag, placeOrder,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

export { getProduct };
