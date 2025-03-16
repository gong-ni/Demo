import { invoke } from "@tauri-apps/api/core";
import { get } from "svelte/store"
import { open as openDialog} from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";

import { pcboxes, selectedPcboxes, lastSelectedPcbox } from './pcbox';
import { defaultPgmPath } from "./config";
import * as pcboxHandler from './pcbox';

const testFunctions = ['test_1', 'test_2', 'test_3', 'test_4', 'test_5'];

let abortController;

export async function getPgmInfo(defaultPath, pgm) {
  try {
      pgm.pgmPath = await openDialog({
          directory: false,
          title: 'PGM 경로 변경',
          defaultPath: defaultPath
      });
  } catch (error) {
      console.error('경로 변경 중 오류 발생:', error);
  }
  pgm.pgmContent = await readTextFile(pgm.pgmPath);
  pgm.pgmList = pgm.pgmContent.split(/\s+/).map((num, index) => ({
                  id: index,
                  num: Number(num),
                  active: true,
                  progress: 0
                  }));

  return;
  };

  export async function readPgmContent(pcbox) {
    try {
      pcbox.pgmContent = await readTextFile(pcbox.pgmPath);
      return pcbox;
    } catch (error) {
      console.error('PGM read 중 오류 발생', error);
    }
  };

  export async function inputPgmPath() {
    let pgm = {};
    await getPgmInfo(get(defaultPgmPath), pgm);
    pcboxHandler.updateAllPcboxes({pgmPath: pgm.pgmPath, pgmContent: pgm.pgmContent, pgmList: pgm.pgmList});
  };


  export const runtest = async (pcbox, startTime) => {
    let pgmLength = pcbox.pgmList.length;
    let activeCount = pcbox.pgmList.filter(item => item.active).length;
    let pgmCnt = 0;

    for (let i = 0; i < pgmLength; i++) {
      if (!pcbox.pgmList[i].active) continue;

      const pgmNum = pcbox.pgmList[i].num - 1;
      await invoke(testFunctions[pgmNum]);
      
      const updatedPgmList = get(pcboxes)[pcbox.index].pgmList.map((pgm, index) =>
                index === i ? {...pgm, progress: 100} : pgm);
      pgmCnt++;

      const progress = ((pgmCnt) / activeCount) * 100;
      pcboxHandler.updatePcbox(pcbox.index, {progress: progress, gmList: updatedPgmList});

      if (i === pgmLength - 1){
        const endTime = new Date();
        const elapsedTime = Math.floor((endTime - startTime) / 1000);
        pcboxHandler.updatePcbox(pcbox.index, {running: false, elapsed_time: elapsedTime, end_time: endTime});
      }
    }
  }

  export const runPgm = async (pcbox) => {
    if (pcbox.running) return;
    
    const startTime = new Date();
    pcbox.start_time = startTime;
    pcbox.running = true;

    abortController = new AbortController();
    runtest(pcbox, startTime);
  };
  
  export const abortPgm = (pcbox) => {
    if (!pcbox.running) return;

    abortController.abort()
    pcbox.running = false;
  };


  export const endPgm = async (pcbox) => {
    if (pcbox.running) return;

    const endTime = new Date();
    pcboxHandler.updatePcbox(pcbox.index, {end_time: endTime});

  };
