interface QuickstartState {
  linkSuccess: boolean;
  inProgress: boolean;
  isItemAccess: boolean;
  isPaymentInitiation: boolean;
  linkToken: string | null;
  accessToken: string | null;
  itemId: string | null;
  isError: boolean;
  backend: boolean;
  products: string[];
  linkTokenError: {
    error_message: string;
    error_code: string;
    error_type: string;
  };
}

const initialState: QuickstartState = {
  linkSuccess: false,
  inProgress: false,
  isItemAccess: true,
  isPaymentInitiation: false,
  linkToken: "", // Don't set to null or error message will show up briefly when site loads
  accessToken: null,
  itemId: null,
  isError: false,
  backend: true,
  products: ["transactions", "auth", "balance"],
  linkTokenError: {
    error_type: "",
    error_code: "",
    error_message: "",
  },
};

export default initialState;
