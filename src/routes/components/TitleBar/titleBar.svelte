<script lang="ts">
    import { invoke } from "@tauri-apps/api/core";
    import Icons from '../utils/icons.svelte';
  
    // ----------------------- window ----------------------- //
    export async function minimizeWindow() {
      await invoke("minimize_window");
    }
  
    export async function maximizeWindow() {
      await invoke("maximize_window");
    }
  
    export async function closeWindow() {
      await invoke("close_window");
    }
  
    export const onMouseMove = async(event) => {
      if (event.detail === 1)
        await invoke("drag_window");
    };
  
    // ------------------------menu------------------------ //
    let activeMenu = null;
    let isMenuClicked = false;
  
    function toggleMenu(menu) {
      if (activeMenu === menu) {
        activeMenu = null;
        isMenuClicked = false;
      } else {
        activeMenu = menu;
        isMenuClicked = true;
      }
    }
  
    function openMenu(menu) {
      if (isMenuClicked) {
        activeMenu = menu;
      }
    }
  
    function closeAllMenus() {
      activeMenu = null;
      isMenuClicked = false;
    }
  
  </script>
  
  <div>
      <div class="titlebar">
          <!-- icon -->
          <div class="icon-container" on:mousedown={onMouseMove} on:dblclick={maximizeWindow}>
            <img src="/깜자.png" alt="App Icon" class="app-icon">
          </div>
        
          <!-- menus -->
          <ul class="menu" on:mouseleave={closeAllMenus}>
            <li on:mouseenter={() => openMenu('files')}>
              <a href="#" on:click={() => toggleMenu('files')}>파일(F)</a>
              <ul class="submenu" class:open={activeMenu === 'files'}>
                <li><a href="#">pgm 수정</a></li>
              </ul>
            </li>
        
            <li on:mouseenter={() => openMenu('edit')}>
              <a href="#" on:click={() => toggleMenu('edit')}>편집(E)</a>
              <ul class="submenu" class:open={activeMenu === 'edit'}>
                <li><a href="#"><span class="left">실행 취소</span><span class="right">Ctrl+Z</span></a></li>
                <li><a href="#"><span class="left">다시 실행</span><span class="right">Ctrl+Y</span></a></li>
                <li class="separator"></li>
                <li><a href="#"><span class="left">잘라내기</span><span class="right">Ctrl+X</span></a></li>
                <li><a href="#"><span class="left">복사</span><span class="right">Ctrl+C</span></a></li>
                <li><a href="#"><span class="left">붙여넣기</span><span class="right">Ctrl+V</span></a></li>
              </ul>
            </li>
        
            <li on:mouseenter={() => openMenu('execute')}>
              <a href="#" on:click={() => toggleMenu('execute')}>실행(R)</a>
              <ul class="submenu" class:open={activeMenu === 'execute'}>
                <li><a href="#"><span class="left">스크린샷</span><span class="right">Ctrl+PrtScn</span></a></li>
              </ul>
            </li>
        
            <li on:mouseenter={() => openMenu('terminal')}>
              <a href="#" on:click={() => toggleMenu('terminal')}>터미널(T)</a>
              <ul class="submenu" class:open={activeMenu === 'terminal'}>
                <li><a href="#"><span class="left">터미널 실행</span><span class="right">Ctrl+T</span></a></li>
              </ul>
            </li>
        
            <li on:mouseenter={() => openMenu('settings')}>
              <a href="#" on:click={() => toggleMenu('settings')}>설정(S)</a>
              <ul class="submenu" class:open={activeMenu === 'settings'}>
                <li><a href="#"><span class="left">단축키 설정</span><span class="right">Ctrl+K</span></a></li>
                <li><a href="#">테마 변경</a></li>
              </ul>
            </li>
        
            <li on:mouseenter={() => openMenu('help')}>
              <a href="#" on:click={() => toggleMenu('help')}>도움말(H)</a>
              <ul class="submenu" class:open={activeMenu === 'help'}>
                <li><a href="#">매뉴얼</a></li>
                <li class="separator"></li>
                <li><a href="#">정보</a></li>
                <li><a href="#">문의</a></li>
              </ul>
            </li>
    
            <li class="rest" on:dblclick={maximizeWindow} on:mousedown={onMouseMove}></li>
          </ul>  
        
          <!-- buttons -->
          <div class="button-container">
            <Icons type="minimize"  size={14} on:click={() => minimizeWindow()}/>
            <Icons type="maximize"  size={14} on:click={() => maximizeWindow()}/>
            <Icons type="close"     size={14} on:click={() => closeWindow()}/>
          </div>
        </div>    
  </div>
  
  <style>
    .titlebar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgb(246, 246, 246);
      height: 34px;
      width: 100%;
      position: relative;
      box-sizing: border-box;
    }
  
    /* icons */
    .icon-container {
      display: flex;
      align-items: center;
    }
  
    .app-icon {
      width: 30px;
      height: 30px;
    }
  
    .menu {
      list-style-type: none;
      display: flex;
      justify-content: flex-start;
      padding-left: 14px;
      flex-grow: 1;
      background-color: rgb(246, 246, 246);
    }
  
    .menu > li {
      position: relative;
    }
  
    .menu > li > a {
      cursor: default;
      display: block;
      color: #373737;
      padding: 7px 12px;
      margin: 1px 3px;
      text-decoration: none;
      font-size: 13px;
      transition: all 0.2s ease;
    }
  
    .menu > li > a:hover {
      background-color: #e1e1e1;
  
    }
  
    .menu > li > a:focus,
    .menu > li > a:active {
      outline: none;
      color: inherit;
    }
  
    .menu .rest {
      flex-grow: 1;
    }
  
    .submenu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: rgb(253, 253, 253);
      list-style-type: none;
      padding: 0;
      margin: 0;
      margin-bottom: 0;
      width: 270px;
      white-space: nowrap;
      border-radius: 5px;
      box-shadow: 0 0 0 0.5px #787878,
                  2px 4px 10px rgba(0, 0, 0, 0.2);
      z-index: 9999;
    }
  
    .submenu li a {
      display: flex;
      justify-content: space-between;
      color: #373737;
      padding: 4px 25px;
      margin: 0px 4px;
      text-decoration: none;
      text-align: left;
      font-size: 13px;
      border-radius: 5px;
    }
  
    .submenu > li:first-child {
      margin-top: 4px;
    }
  
    .submenu > li:last-child {
      margin-bottom: 4px;
    }
  
    .submenu li a:hover {
      background-color: #e1e1e1;
    }
  
    ul.menu > li:nth-child(6) .submenu {
      width: 130px;
    }
  
    .submenu.open {
      display: block;
    }
  
    .button-container {
      display: flex;
      justify-content: flex-end;
    }
  
  </style>