import { ActionCreatorProps, createAction, props } from '@ngrx/store';
import Modal from 'src/app/models/modal.model';

interface State {
    modal: Modal;
};

export const openModal = createAction('[Modal] openModal');
export const closeModal = createAction('[Modal] closeModal');
export const setModal = createAction('[Modal] setModal', props<State>());