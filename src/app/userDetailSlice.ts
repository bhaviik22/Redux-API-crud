import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import UserType  from '../model/UserDetail';

export const createUser = createAsyncThunk("createUser", async (data : any,{rejectWithValue}) => {
    const response = await fetch("https://6632249cc51e14d695637eb9.mockapi.io/crud",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data),
    })
    try{
        const result = await response.json();
        return result;
    }
    catch(error){
        return rejectWithValue(error);
    }
})

export const readUser = createAsyncThunk("readUser", 
    async () => {
    const response = await fetch("https://6632249cc51e14d695637eb9.mockapi.io/crud");

    try{
        const result = await response.json();
        return result;
    }
    catch(error){
        return error;
    }
})

export const deleteUser = createAsyncThunk("deleteUser", async (id:number) => {
    const response = await fetch(`https://6632249cc51e14d695637eb9.mockapi.io/crud/${id}`,{
        method: 'DELETE'
    });

    try{
        const result = await response.json();
        return result;
    }
    catch(error){
        return error;
    }
})

export const updateUser = createAsyncThunk("updateUser", async (data : any,{rejectWithValue}) => {
    const response = await fetch(`https://6632249cc51e14d695637eb9.mockapi.io/crud/${data.id}`,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data),
    })
    try{
        const result = await response.json();
        return result;
    }
    catch(error){
        return rejectWithValue(error);
    }
})

interface userState{
    users: UserType[],
    loading: boolean,
    error: string | null
    searchText: string
}

const initialState: userState = {
    users: [],
    loading: false,
    error: null,  
    searchText: ''
}
export const userDetail = createSlice({
    name:'userDetail',
    initialState,
    reducers:{
        searchData: (state, action) => {
            state.searchText = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(createUser.fulfilled, (state, action:PayloadAction<UserType[]>) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })
        .addCase(readUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(readUser.fulfilled, (state, action:PayloadAction<UserType[]>) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(readUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })
        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            const {id} = action.payload;
            if(id){
                state.users = state.users.filter((item) => item.id !== id);
            }
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })
        .addCase(updateUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.map((item) => (
                item.id === action.payload.id ? action.payload : item
            ))
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })
    }
});

export default userDetail.reducer;

export const { searchData }  = userDetail.actions;