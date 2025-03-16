<script>
  import { invoke } from "@tauri-apps/api/core";
  import { onMount, onDestroy } from "svelte";
  import { writable, get } from 'svelte/store';

  import { pcboxes } from './modules/pcbox';
  import { pcboxMenuVisible, pcboxMenuPosition } from './modules/pcbox'

  import * as keyHandler from './modules/keyStates';
  import * as pcboxHandler from './modules/pcbox';
  import * as pgmHandler from './modules/pgm';
  import * as areaHandler from './modules/area';
  import * as configHandler from './modules/config';

  import Titlebar from './components/TitleBar/titleBar.svelte';
  import Sidebar from './components/SideBar/sideBar.svelte';
  import PcboxArea from './components/pcboxArea/pcboxArea.svelte';
  import PcboxMenu from './components/pcboxArea/pcboxMenu.svelte';
  import PcboxInfo from "./components/pcboxArea/pcboxInfo.svelte";

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  document.addEventListener('dblclick', (event) => {
    event.preventDefault();
  });

  onMount(() => {
      window.addEventListener('keydown', keyHandler.handleKeydown);
      window.addEventListener('keyup', keyHandler.handleKeyup);
      window.addEventListener("click", pcboxHandler.hidePcboxMenu);
    });
  
    onDestroy(() => {
      window.removeEventListener('keydown', keyHandler.handleKeydown);
      window.removeEventListener('keyup', keyHandler.handleKeyup);
      window.addEventListener("click", pcboxHandler.hidePcboxMenu);
    });
  
</script>

<main>
  <div class="main-container">
    <div class="titlebar"><Titlebar/></div>
  </div>

  <div class="body-container">
    <div class="sidebar"><Sidebar/></div>
    <div class="pcboxArea"><PcboxArea/></div>

    {#if $pcboxMenuVisible}
      <PcboxMenu/>
    {/if}

    {#each $pcboxes as pcbox}
      {#if pcbox.pcbox_info_visible}
        <div class="pcbox-info-popup-overlay" on:click={(event) => pcboxHandler.togglePcboxInfo(event, pcbox)}>
          <div class="pcbox-info-popup" on:click|stopPropagation>
            <PcboxInfo {pcbox}/>
          </div>
        </div>
      {/if}
    {/each}

  </div>
</main>


<style>
  :global(body){
    margin: 0;
    padding: 0;
    /* font-family: 'Noto Sans'; */
    font-family: 'Roboto', sans-serif;
    /* user-select: none; */
    background: linear-gradient(135deg, #c3c7d3, #c3c7d3);
    overflow: hidden;
  }

  main {
    margin: 0;
    padding: 0;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* ------------------------------ body container ---------------------------- */
  .body-container {
    display: flex;
    flex-grow: 1;
    height: calc(100vh - 34px);
  }

  /* ------------------------------ pcbox Area ---------------------------- */
  .pcboxArea {
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }

  /* -------- pcbox info -------- */

  .pcbox-info-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(194, 196, 210, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9000;
  }

  .pcbox-info-popup {
    position: relative;
    width: 50%;
    height: 70%;
    background: #f4f6f9;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    z-index: 10000;
  }


</style>