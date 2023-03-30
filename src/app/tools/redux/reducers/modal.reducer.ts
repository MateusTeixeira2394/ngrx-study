import { createReducer, on } from '@ngrx/store';
import { open, close, setModal } from '../actions/modal.actions';
import Modal from 'src/app/models/modal.model';

export const titleInitialState: Modal = {
    opened: false,
    text: ''
}

export const modalReducer = createReducer<Modal>(
    titleInitialState,
    on(setModal, (state, { modal }) => ({...modal})),
    on(open, (state)=>({...state, opened: true})),
    on(close, (state)=>({...state, opened: false}))
);