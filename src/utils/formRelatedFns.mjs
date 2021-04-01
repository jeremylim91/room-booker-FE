import { deleteFromStorage } from "@rehooks/local-storage";

export const handleNextPage = (setMode, writeStorage, formStep, nextPage) => {
 setMode(nextPage);
    writeStorage(formStep,nextPage);
}; 

export const handleCancelForm = (deleteFromStorage, createBookingForm, formStep) => {
    // setMode('ABOUT_ITEMS');
    window.location = '/';
    deleteFromStorage(createBookingForm);
    deleteFromStorage(formStep);
  };