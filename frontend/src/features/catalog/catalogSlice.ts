import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

const productsAdapter = createEntityAdapter<Product>()


function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('PageNumber', productParams.pageNumber.toString());
    params.append('PageSize', productParams.pageSize.toString());
    params.append('OrderBy', productParams.orderBy);
    if (productParams.searchTerm) params.append('SearchTerm', productParams.searchTerm);
    if (productParams.brands) params.append('Brands', productParams.brands.toString());
    if (productParams.types) params.append('Types', productParams.types.toString());
    return params;
}


interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;
    metaData: MetaData | null;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
    "catalog/fetchProductsAsync",
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try {
            const response = await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    "catalog/fetchProductAsync",
    async (productID, thunkAPI) => {
        try {
            return await agent.Catalog.details(productID);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchFiltersAsync = createAsyncThunk(
    "catalog/fetchFilters",
    async () => {
        try {
            return await agent.Catalog.fetchFilters();
        } catch (error) {
            console.log(error)
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: "name"
    }
}

export const catalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        status: "idle",
        filtersLoaded: false,
        brands: [],
        types: [],
        productParams: initParams(),
        metaData: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload, pageNumber: 1 }
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload }
        },
        resetProductParams: (state) => {
            state.productParams = initParams()
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        }

    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = "pendingFetchProducts";
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.productsLoaded = true;
        })
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = "pendingFetchProduct"
        })
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = "idle";
        })
        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(fetchFiltersAsync.pending, (state) => {
            state.status = "pendingFetchFilters"
        })
        builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = "idle";
        })
        builder.addCase(fetchFiltersAsync.rejected, (state) => {
            state.status = "idle";
        });
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);

export const { setProductParams, resetProductParams, setMetaData, setPageNumber } = catalogSlice.actions;