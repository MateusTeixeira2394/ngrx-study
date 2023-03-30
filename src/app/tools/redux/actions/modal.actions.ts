import { ActionCreatorProps, createAction, props } from '@ngrx/store';
import Modal from 'src/app/models/modal.model';

interface State {
    modal: Modal;
};

export const open = createAction('[Modal] open');
export const close = createAction('[Modal] close');
export const setModal = createAction('[Modal] setModal', props<State>());