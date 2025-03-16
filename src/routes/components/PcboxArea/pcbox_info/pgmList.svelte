<script>
    import { get, derived } from "svelte/store";
    import { open as openDialog} from "@tauri-apps/plugin-dialog";
    import { readTextFile } from "@tauri-apps/plugin-fs";
    import { dndzone } from "svelte-dnd-action";
    import { flip } from 'svelte/animate';
    
    import { pcboxes } from '../../../modules/pcbox';
    import { defaultPgmPath } from "../../../modules/config";

    import * as pcboxHandler from '../../../modules/pcbox';
    import * as pgmHandler from '../../../modules/pgm';
    import { onMount } from "svelte";

    export let pcbox;

    $: pgmPath = pcbox.pgmPath;
    $: pgmList = (pcbox).pgmList || [];


    export function togglePgmActive(pcbox, pgmIndex) {
      if (pcbox.running) return;

      let updatedPgmList = pcbox.pgmList;

      updatedPgmList = updatedPgmList.map(pgm => pgm.id === pgmIndex ? 
      { ...pgm, active: !pgm.active} : pgm);

      pcboxes.update(pcboxArray => 
        pcboxArray.map(box => 
          box.index === pcbox.index ? { ...box, pgmList: [...updatedPgmList] } : box
        )
      );

    }

    async function changePgmPath(pcbox) {
      let pgm = {};
      await pgmHandler.getPgmInfo(pgmPath, pgm);
      pcboxHandler.pcboxMenuAction(pcbox, "PGM Change", pgm);

  }

  function handleDndEvent(event) {
    pgmList = event.detail.items;
    pcbox.pgmList = pgmList;
  }

  const flipDurationMs = 250;


</script>


<div>
  <div class="container">
    <div class="separator"></div>
    {#if pgmList.length === 0}
      <div class="pgm-input"
      on:click={() => changePgmPath(pcbox)}>
        <div class="pgm-input-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="13" fill="none" stroke="#01565b" stroke-width="0px"/>
            <text x="50%" y="50%" fill="#01565b" font-size="27" text-anchor="middle" alignment-baseline="middle">+</text>
          </svg>
        </div>
      </div>
    {:else}

    <div class="layout">
      
      <div class="layout-index">
        {#each pgmList as item, index}
        <div class="index">{index + 1}</div>
        <div class="separator"></div>
        {/each}
      </div>
      <div class="layout-wrapper">

        <div use:dndzone={{ items: pgmList, flipDurationMs, dropTargetStyle: {} }}
          on:consider={handleDndEvent} on:finalize={handleDndEvent}>
          {#each pgmList as item (item.id)}
            <div class="wrapper {item.active ? 'active' : 'inactive'}"
                  animate:flip="{{ duration: flipDurationMs }}">
              <div class="pgm-box">
                <div class="name-progress">
                  <div class="pgm-name">{item.num}</div>
                  <div class="pgm-progress">{item.progress}%</div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: {item.progress}%"></div>
                </div>
              </div>
              <div class="check-box" on:click={() => togglePgmActive(pcbox, item.id )}></div>
              <div class="drag-handle"></div>
            </div>
          {/each}
        </div>
      </div>


    </div>


  
    {/if}
  </div>
</div>

<style>
  .container {
    position: absolute;
    height: 90%;
    width: 100%;
    align-items: center;
    justify-items: center;
    transition: opacity 1s ease, transform 1s ease;
    overflow-y: auto;
  }

  .pgm-input {
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
  }

  .layout {
    width: 95%;
    height: 97%;
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .layout-index {
    height: 100%;
    width: 11%;
  }

  .layout-index .separator {
    width: 910%;
  }

  .layout-wrapper {
    height: 100%;
    width: 89%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .index {
    line-height: 50px;
    height: 50px;
    width: 95%;
    padding-left: 5%;
    text-align: center;
    align-items: center;
    font-weight: bold;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    height: 51px;
    width: 100%;
    align-items: center;
    transition: transform 0.8s ease;
    pointer-events: none;
    outline: none;
  }

  .pgm-box {
    display: flex;
    flex-direction: column;
    margin: 15px;
    flex-grow: 1;
  }

  .name-progress {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .pgm-name {
    margin-left: 4%;
  }
  
  .pgm-progress {
    color: #393939;
    margin-right: 4%;
  }

  .progress-bar-container {
    width: 100%;
    height: 6px;
    margin-top: 3%;
    border-radius: 20px;
    background-color: #e6e6e6;
    transition: width 0.5s ease-in-out;
  }

  .progress-bar {
    height: 100%;
    background-color: #01565b;
    border-radius: 20px;
    transition: width 0.7s ease-in-out;
  }

  .check-box {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    margin: 8px 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.2s ease;
    pointer-events: auto;
  }

  .check-box:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transform: scale(1.07);
  }

  .wrapper.active .check-box {
    background-color: rgb(1, 86, 91);
  }

  .wrapper.inactive .check-box {
    background-color: #e6e6e6;
  }

  .separator {
    height: 1px;
    width: 95%;
    background: #787878;
    transform: scaleY(0.5);
  }

  .drag-handle {
    cursor: default;
    background-color: rgb(128, 128, 128, 0.1);
    height: 100%;
    width: 5%;
    margin-left: 2%;
    pointer-events: auto;
  }

  .drag-handle:hover {
    background-color: rgb(128, 128, 128, 0.3);
    transition: all 0.3s ease;
    cursor: pointer;
  }

</style>