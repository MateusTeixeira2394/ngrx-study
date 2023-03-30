import { createReducer, on } from '@ngrx/store';
import { openModal, closeModal, setModal } from '../actions/modal.actions';
import Modal from 'src/app/models/modal.model';

export const titleInitialState: Modal = {
    opened: false,
    text: ''
}

export const modalReducer = createReducer<Modal>(
    titleInitialState,
    on(setModal, (state, { modal }) => ({...modal})),
    on(openModal, (state)=>({...state, opened: true})),
    on(closeModal, (state)=>({...state, opened: false}))
);