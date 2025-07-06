import { configureStore } from '@reduxjs/toolkit';
import urlReducer from '../src/pages/URL/Redux/UrlSlice';
import memberReducer from '../src/TeamMember/Teammember';
import chooseReducer from '../src/Choose/ChooseSlice';
import categoryReducer from '../src/TeamMember/Redux/CategorySlice';
import courseReducer from '../src/TeamMember/Redux/CourseSlice';


export const store = configureStore({
  reducer: {
    urls: urlReducer,
    members: memberReducer,
     choose: chooseReducer,
     category: categoryReducer,
    course: courseReducer,
   
    
     
  },
});