import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamMember } from "@/types/team";

interface TeamState {
  teamMembers: TeamMember[];
}

const initialState: TeamState = {
  teamMembers: [],
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeamMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.teamMembers = action.payload;
    },
    clearTeamMembers: (state) => {
      state.teamMembers = [];
    },
  },
});

export const { setTeamMembers, clearTeamMembers } = teamSlice.actions;

export default teamSlice.reducer;
