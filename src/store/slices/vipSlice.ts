import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { vipApi } from '@/api/vip';
import { VipInfo, TokenState, VipType } from '@/types/vip';
import { VIP_BENEFITS } from '@/constants/vip';

interface VipState {
  vipInfo: VipInfo | null;
  tokenState: TokenState;
  loading: boolean;
  error: string | null;
}

const initialState: VipState = {
  vipInfo: {
    level: VipType.FREE,
    expireTime: '',
    benefits: VIP_BENEFITS[VipType.FREE]
  },
  tokenState: {
    dailyToken: VIP_BENEFITS[VipType.FREE].tokenPerDay,
    permanentToken: 0,
    usedToken: 0,
    lastRefreshTime: new Date().toISOString()
  },
  loading: false,
  error: null
};

// Async thunks
export const fetchVipInfo = createAsyncThunk(
  'vip/fetchVipInfo',
  async () => {
    const response = await vipApi.getVipInfo();
    return response.data;
  }
);

export const refreshDailyToken = createAsyncThunk(
  'vip/refreshDailyToken',
  async () => {
    const response = await vipApi.refreshDailyToken();
    return response.data;
  }
);

const vipSlice = createSlice({
  name: 'vip',
  initialState,
  reducers: {
    updateTokenState(state, action) {
      state.tokenState = {
        ...state.tokenState,
        ...action.payload
      };
    },
    consumeToken(state, action) {
      const amount = action.payload;
      if (state.tokenState.dailyToken >= amount) {
        state.tokenState.dailyToken -= amount;
        state.tokenState.usedToken += amount;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVipInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVipInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.vipInfo = action.payload;
      })
      .addCase(fetchVipInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch VIP info';
      })
      .addCase(refreshDailyToken.fulfilled, (state, action) => {
        state.tokenState.dailyToken = action.payload.amount;
        state.tokenState.lastRefreshTime = new Date().toISOString();
      });
  }
});

export const { updateTokenState, consumeToken } = vipSlice.actions;
export default vipSlice.reducer;