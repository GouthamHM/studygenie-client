import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { tags } from './tags.reducer';
import { views } from './view.reducer';
import { votes } from './vote.reducer';
import { notes } from './note.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
    tags,
    views,
    votes,
    notes,
  alert
});

export default rootReducer;