import { writable, get } from 'svelte/store';
import { open as openDialog} from "@tauri-apps/plugin-dialog";

export let defaultPgmPath = writable('C:/temp_pgm_path');
export let defaultLogPath = writable('C:/temp_log_folder');
export let defaultPrtScrPath = writable('C:/temp_prt_scr_folder');

export let showConfigPopup = writable(false);
  
export const openConfig = () => {
  showConfigPopup.set(true);
}

export const closeConfig = () => {
  showConfigPopup.set(false);
} 

let popupTimer: any;
export function onPopupOpen() {
  clearInterval(popupTimer);
  popupTimer = setInterval(() => {
    document.querySelector('.popup')?.classList.toggle('blink');
  }, 1000);
}

export async function changedefaultPgmPath() {
  try {
    const selectedPath = await openDialog({
      directory: true,
      title: 'Pgm 저장 경로 선택',
      defaultPath: get(defaultPgmPath)
    });

    if (selectedPath) {
      defaultPgmPath.set(selectedPath);
    }
  } catch (error) {
    console.error('경로 변경 중 오류 발생:', error);
  }
}

export async function changedefaultLogPath() {
  try {
    const selectedPath = await openDialog({
      directory: true,
      title: '로그 저장 경로 선택',
      defaultPath: get(defaultLogPath)
    });

    if (selectedPath) {
      defaultLogPath.set(selectedPath);
    }
  } catch (error) {
    console.error('경로 변경 중 오류 발생:', error);
  }
}

export async function changedefaultPrtScrPath() {
  try {
    const selectedPath = await openDialog({
      directory: true,
      title: '스크린샷 저장 경로 선택',
      defaultPath: get(defaultPrtScrPath)
    });

    if (selectedPath) {
      defaultPrtScrPath.set(selectedPath);
    }
  } catch (error) {
    console.error('경로 변경 중 오류 발생:', error);
  }
}