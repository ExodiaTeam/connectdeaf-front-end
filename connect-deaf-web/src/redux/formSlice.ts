import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
    selectedType: 'client' | 'professional' | null;
    addressData: any;
    professionalData?: any;
    clientData?: any;
    loading?: boolean;
    error?: string | null;
}

const initialState: FormState = {
    selectedType: null,
    addressData: {},
    professionalData: {},
    clientData: {},
    loading: false,
    error: null,
}

const createUser = createAsyncThunk(
    'create/user',
    async (dadosUsuario: any, { rejectWithValue }) => {
        try {
            const response = await fetch('URL_DO_SEU_BACKEND/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosUsuario)
            });

            if (!response.ok) {
                throw new Error('Erro ao criar usuário');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);
 
const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setUserType: ( state, action: PayloadAction<'client' | 'professional'> ) => {
            state.selectedType = action.payload;
        },
        setAddressData: ( state, action: PayloadAction<any> ) => {
            state.addressData = action.payload;
        },
        setProfessionalData: ( state, action: PayloadAction<any> ) => {
            state.professionalData = action.payload;
        },
        setClientData: ( state, action: PayloadAction<any> ) => {
            state.clientData = action.payload;
        },
        submitCreateUserForm: (state) => {
            const combinedData: any = {
                selectedType: state.selectedType,
                addressData: state.addressData,
            };

            if (state.selectedType === 'professional') {
                combinedData.professionalData = state.professionalData;
            } else if (state.selectedType === 'client') {
                combinedData.clientData = state.clientData;
            }

            createUser(combinedData);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setUserType, setAddressData, setProfessionalData, setClientData, submitCreateUserForm } = formSlice.actions;
export default formSlice.reducer;