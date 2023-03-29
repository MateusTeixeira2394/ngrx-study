import { createReducer, on } from '@ngrx/store';
import { setTitle } from '../actions/status-bar.actions';
import StatusBar from '../../../models/status-bar.model';

export const titleInitialState: StatusBar = {
    title: "Home"
}

export const statusBarReducer = createReducer<StatusBar>(
    titleInitialState,
    on(setTitle, (state, {statusbar}) => ({title: statusbar.title}))
);