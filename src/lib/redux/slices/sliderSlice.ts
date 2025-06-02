import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the slide item interface
export interface SlideItem {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
}

// Define the slider state interface
interface SliderState {
  slides: SlideItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: SliderState = {
  slides: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching slides from Strapi API
export const fetchSlides = createAsyncThunk(
  'slider/fetchSlides',
  async (_, { rejectWithValue }) => {
    try {
      // In a real implementation, this would be the actual API endpoint
      const response = await fetch('http://your-strapi-api-url/api/slides');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      // Transform the data to match our SlideItem interface
      // This transformation depends on the actual Strapi API response structure
      const slides: SlideItem[] = data.data.map((item: any) => ({
        id: item.id,
        title: item.attributes.title,
        description: item.attributes.description,
        image: item.attributes.image.data.attributes.url,
        buttonText: item.attributes.buttonText,
        buttonLink: item.attributes.buttonLink,
      }));
      
      return slides;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create the slider slice
const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    // Add any additional reducers here if needed
    setSlides: (state, action: PayloadAction<SlideItem[]>) => {
      state.slides = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlides.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSlides.fulfilled, (state, action: PayloadAction<SlideItem[]>) => {
        state.status = 'succeeded';
        state.slides = action.payload;
        state.error = null;
      })
      .addCase(fetchSlides.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { setSlides } = sliderSlice.actions;
export default sliderSlice.reducer;
