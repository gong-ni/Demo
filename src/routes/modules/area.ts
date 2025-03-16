import { get } from "svelte/store";
import { open as openShell} from "@tauri-apps/plugin-shell";
import { pcboxes, selectedPcboxes, lastSelectedPcbox } from './pcbox';
import { defaultLogPath } from './config'
import * as pcboxHandler from './pcbox';

export const STATUS = {
  NULL: null,
  RUNNING: "running",
  FAIL: "fail",
  PASS: "pass"
};

export function getPositionForArea(areaIndex) {
    const pcboxWidth = 200;
    const pcboxHeight = 300;

    if (areaIndex === 0) {
      return { top: 0, left: 0, width: pcboxWidth, height: pcboxHeight * 0.2 };
    } else {
      const areaHeight = pcboxHeight * 0.8 / 8;
      return {
        top: pcboxHeight * 0.2 + (areaIndex - 1) * areaHeight,
        left: 0,
        width: pcboxWidth,
        height: areaHeight,
      };
    }
  }

  export const areaDoubleClick = async (pcboxIndex, areaIndex) => {
    clearAreaSelection();
    pcboxHandler.updatePcbox(pcboxIndex, {selected: false});
    pcboxes.update(pcboxArray => 
      pcboxArray.map(pcbox => 
        pcbox.index === pcboxIndex ? { ...pcbox,
          area: pcbox.areas.map((areaItem, index) =>
          index === areaIndex ? {...areaItem, selected: true} : areaItem) } : pcbox
      )
    );

    const filePath = `${get(defaultLogPath)}/slot${areaIndex + 1}.txt`;
    try {
      await openShell(`${filePath}`);
    } catch (error) {
      console.error('파일을 여는 중에 오류가 발생했습니다:', error);
    }
  }

  export function clearAreaSelection() {
    pcboxes.update(pcboxArray => {
      pcboxArray.forEach((pcbox) => {
        pcbox.areas.forEach(area => {area.selected = false;});
      });
      return pcboxArray;
    });
  }