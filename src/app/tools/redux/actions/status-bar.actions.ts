import { createAction, props } from '@ngrx/store';
import StatusBar from '../../../models/status-bar.model';

export const setTitle = createAction('[Statusbar] setTitle', props<{ statusbar: StatusBar }>());