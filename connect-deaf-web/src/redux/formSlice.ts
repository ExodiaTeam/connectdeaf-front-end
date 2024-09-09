import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index"; // Assumindo que você tenha o tipo RootState definido no seu store

interface FormState {
  selectedType: "client" | "professional" | null;
  addressData: any;
  professionalData?: any;
  clientData?: any;
  loading?: boolean;
  error?: string | null;
  combinedData?: any;
}

const initialState: FormState = {
  selectedType: null,
  addressData: {},
  professionalData: {},
  clientData: {},
  loading: false,
  error: null,
  combinedData: null,
};

const createClient = createAsyncThunk(
  "create/client",
  async (dadosUsuario: any, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosUsuario),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Falha na requisição');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<"client" | "professional">) => {
      state.selectedType = action.payload;
    },
    setAddressData: (state, action: PayloadAction<any>) => {
      state.addressData = action.payload;

      const combinedData: any = {
        ...state.combinedData,
        addresses: Array.isArray(state.addressData) ? state.addressData : [state.addressData],
      };

      if (state.selectedType === "professional") {
        combinedData.professionalData = { ...state.professionalData };
      } else if (state.selectedType === "client") {
        combinedData.name = state.clientData.name;
        combinedData.email = state.clientData.email;
        combinedData.password = state.clientData.password;
        combinedData.phoneNumber = state.clientData.phoneNumber;
      }

      state.combinedData = combinedData;
    },
    setProfessionalData: (state, action: PayloadAction<any>) => {
      state.professionalData = action.payload;
    },
    setClientData: (state, action: PayloadAction<any>) => {
      state.clientData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectCombinedData = (state: RootState) => state.form.combinedData;
export const selectedType = (state: RootState) => state.form.selectedType;

export const {
  setUserType,
  setAddressData,
  setProfessionalData,
  setClientData,
} = formSlice.actions;
export { createClient };
export default formSlice.reducer;