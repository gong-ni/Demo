import { writable, get } from 'svelte/store';
import { pcboxes, selectedPcboxes } from './pcbox';
import * as pcboxHandler from './pcbox';

export let isCtrlPressed = writable(false);
export let isShiftPressed = writable(false);

  export const handleKeydown = (event) => {
    if (event.key === 'Control')  isCtrlPressed.set(true);
    if (event.key === 'Shift')    isShiftPressed.set(true);

    if (get(isCtrlPressed) && (event.key === 'a' || event.key === 'A')) {
      event.preventDefault();

      let length;
      pcboxes.subscribe(pcboxArray => {
        length = pcboxArray.length;
      });

      if (selectedPcboxes.length == length){
        pcboxHandler.updateAllPcboxes({selected: false});
      } else {
        pcboxHandler.updateAllPcboxes({selected: true});
      }
      pcboxHandler.RefreshSelectedPcbox();

    }
  };

  export const handleKeyup = (event) => {
    if (event.key === 'Control')  isCtrlPressed.set(false);
    if (event.key === 'Shift')    isShiftPressed.set(false);
  };