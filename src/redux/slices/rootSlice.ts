import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Bucky Barnes',
        description: "A monster created by Hydra",
        comics_appeared_in: 200,
        super_power: 'super-strength, faster than normal humans, has a really cool metal arm'
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseDescription: (state, action) => { state.description = action.payload},
        chooseComic: (state, action) => { state.comics_appeared_in = action.payload},
        choosePower: (state, action) => { state.super_power = action.payload}

    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseDescription, chooseComic, choosePower } = rootSlice.actions;