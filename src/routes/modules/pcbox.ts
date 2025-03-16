import { writable, get } from 'svelte/store';
import { open as openDialog} from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";

import { isCtrlPressed, isShiftPressed } from "./keyStates";
import { defaultPgmPath } from './config';

import * as areaHandler from './area';
import * as pgmHandler from './pgm';

  export let pcboxes = writable(
      Array.from({length:25}, (_, pcboxIndex) => ({
      index: pcboxIndex,
      
      // type //
      pcbox_type: null,

      // status //
      selected: false,
      active: true,
      running: false,
      pcbox_info_visible: false,

      // pgm //
      pgmPath: get(defaultPgmPath),
      pgmContent: null,
      pgmList: [],
      progress: 0,

      //time
      start_time: null,
      elapsed_time: null,
      end_time: null,

      areas: Array.from({ length: 8 }, (_, areaIndex) => ({
        index: areaIndex,
        selected: false,
        status: null,
        position: areaHandler.getPositionForArea(areaIndex),
      })),
      }))
    );

  export let selectedPcboxes = [];
  export let lastSelectedPcbox = null;

  export let pcboxMenuVisible = writable(false);
  export let pcboxMenuPosition = writable({ x: 0, y: 0 });

  export function updateAllPcboxes(updates) {
    pcboxes.update(pcboxArray => 
      pcboxArray.map(pcbox => 
        ({ ...pcbox, ...updates }))
    );
    return;
  };

  export const updateOnlySelectedPcbox = (id, updates, preserves) => {
    pcboxes.update(pcboxArray => 
      pcboxArray.map(pcbox => 
        pcbox.index === id ? { ...pcbox, ...updates } : {...pcbox, ...preserves }
      )
    );
  }

  export const updatePcbox = (id, updates) => {
    pcboxes.update(pcboxArray => 
      pcboxArray.map(pcbox => 
        pcbox.index === id ? { ...pcbox, ...updates } : pcbox
      )
    );
    
    console.log("updatePcbox", get(pcboxes));
  };

  export const RefreshSelectedPcbox = () => {
    pcboxes.update((pcboxArray) => {
        selectedPcboxes = pcboxArray.filter(pcbox => pcbox.selected);
        return pcboxArray;
      });  
  };
  
  export const pcboxLeftClick = (event, pcbox) => {
    areaHandler.clearAreaSelection();

    if (get(isShiftPressed) && lastSelectedPcbox !== null) {
      const start = Math.min(lastSelectedPcbox, pcbox.index);
      const end = Math.max(lastSelectedPcbox, pcbox.index);
      
      for (let i = start; i <= end; i++) {
        updatePcbox(i, {selected: true});
      }
    } else if (get(isCtrlPressed)) {
      updatePcbox(pcbox.index, {selected: !pcbox.selected});
    } else {
      updateOnlySelectedPcbox(pcbox.index, {selected: !pcbox.selected}, {selected: false})
      lastSelectedPcbox = pcbox.index;
    }
    RefreshSelectedPcbox();

  };

  export const togglePcboxInfo = (event, pcbox) => {
    updateOnlySelectedPcbox(pcbox.index, {pcbox_info_visible: !pcbox.pcbox_info_visible},
                                         {pcbox_info_visible: false});
  };

  export function calculateMenuPosition(clientX: number, clientY: number): void {
    const menuWidth = 340;
    const menuHeight = 300;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
  
    let x = clientX;
    let y = clientY;
  
    if (x + menuWidth > windowWidth) {
      x = x - menuWidth;
    }
  
    if (y + menuHeight > windowHeight) {
      y = y - menuHeight;
    }
  
    pcboxMenuPosition.set({ x, y });
  }


  export const pcboxRightClick = (event, pcbox) => {
    areaHandler.clearAreaSelection();

    const isAlreadySelected = selectedPcboxes.includes(pcbox);
    if (!isAlreadySelected) {
      updateOnlySelectedPcbox(pcbox.index, {selected: true}, {selected: false});
    }

    RefreshSelectedPcbox();
    
    lastSelectedPcbox = pcbox.index;
    
    pcboxMenuVisible.set(true);
    console.log(event.clientX, event.clientY);
    calculateMenuPosition(event.clientX, event.clientY);
  };

  export async function allPcboxMenuAction(action) {
    pcboxes.update((pcboxArray) => {
        selectedPcboxes = pcboxArray.filter(pcbox => pcbox.active);
        return pcboxArray;
      });
    
    await selectedPcboxMenuAction(action);
  }; 

  export async function selectedPcboxMenuAction(action) {
    let pgm = {};
    console.log('selectedPcboxes', selectedPcboxes)

    if (action === "PGM Change"){
      await pgmHandler.getPgmInfo(get(defaultPgmPath), pgm);
    }

    console.log('before', get(pcboxes));

    await Promise.all(selectedPcboxes.map(async (pcbox) =>
      { await pcboxMenuAction(pcbox, action, pgm) }
    ));

    console.log('after', get(pcboxes));

    clearPcboxSelections();
    hidePcboxMenu();

  }

  export async function pcboxMenuAction(pcbox, action, pgm) {
    let updatedArea = pcbox.areas;

    console.log('pcbox', pcbox);
    
    switch (action) {
      case "PGM Run":
        if (!pcbox.active) break;

        if (pcbox.pgmPath) {
          await pgmHandler.readPgmContent(pcbox);
          pgmHandler.runPgm(pcbox);
          updatedArea.forEach(area => area.status = areaHandler.STATUS.RUNNING);
          updatePcbox(pcbox.index, {areas: updatedArea});
        };
        break;
      
      case "PGM Abort":
        pgmHandler.abortPgm(pcbox);
        updatedArea.forEach(area => area.status = areaHandler.STATUS.NULL);
        updatePcbox(pcbox.index, {areas: updatedArea});
        break;

      case "PGM End":
        pgmHandler.endPgm(pcbox);
        updatedArea.forEach(area => area.status = areaHandler.STATUS.PASS);
        updatePcbox(pcbox.index, {areas: updatedArea});
        break;

      case "PGM Change":
        updatePcbox(pcbox.index, {pgmPath: pgm.pgmPath, pgmContent: pgm.pgmContent, pgmList: pgm.pgmList});
        break;

      case "PCBOX EN/DIS":
        if (pcbox.running) return;
        updatePcbox(pcbox.index, {active: !pcbox.active});
        break;
      
      case "PCBOX Init":
        if (pcbox.running) return;
        updatedArea.forEach(area => area.status = areaHandler.STATUS.NULL);
        updatePcbox(pcbox.index, {pgmContent: null, pgmList: [], progress: 0,
                                  start_time: "", elapsed_time: "", end_time: "",
                                  areas: updatedArea
        })
        break;

      case "PCBOX Info":
        updatePcbox(pcbox.index, {pcbox_info_visible: true});
        break;
      
      case "cut":
      case "copy":
      case "paste":
      default:
    };
    
    clearPcboxSelections();
    hidePcboxMenu();
  };

  export const hidePcboxMenu = () => {
    pcboxMenuVisible.set(false);
  };

  function clearPcboxSelections() {
    updateAllPcboxes({selected: false});
    RefreshSelectedPcbox();
  }