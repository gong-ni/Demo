<script>
    import { get } from "svelte/store";
    import { pcboxes } from '../../modules/pcbox';
    import * as pcboxHandler from '../../modules/pcbox';
    import { defaultPgmPath } from '../../modules/config';

    import Timer from '../utils/timer.svelte';
    import Progress from './pcbox_info/progress.svelte';
    import Pgmlist from './pcbox_info/pgmList.svelte';

    export let pcbox;

    $: index = pcbox.index;
    $: active = pcbox.active;

    function togglePcboxActive (pcbox) {
      if (pcbox.running) return;

      pcboxHandler.updatePcbox(index, {active: !active});
    }
</script>


<div>
  <div class="overlay {active ? '' : 'visible'}"></div>
  <div class="pcbox-info">
    <div class="pcbox-info-header">
      <h4 class="pcbox-name">PCBOX {pcbox.index + 1}</h4>
      <div class="pcbox-active-button {active ? 'active' : 'inactive'}"
                  on:click={() => togglePcboxActive(pcboxes, pcbox)}>
        <div class="inner-circle {active ? 'active' : 'inactive'}"></div>
      </div>
    </div>
    <div class="pcbox-info-container">
        <div class="status-time-group">
            <div class="pcbox-info-box">
                <h4 style="margin-bottom: 2%;">Progress</h4>
                <div class="pcbox-progress"><Progress {pcbox} /></div>
            </div>
            <div class="pcbox-info-box">
                <h4 style="margin-top: 5%; margin-bottom: 0;">Time</h4>
                <div class="pcbox-timer"><Timer {pcbox} /></div>
            </div>
        </div>
        <div class="pcbox-info-box" style="justify-content: flex-start;">
            <h4 style="margin-top: 8%; margin-bottom: 0;">PGM</h4>
            <div class="pcbox-pgmlist" style="justify-self: top;">
            <Pgmlist {pcbox} />
            </div>
        </div>
        <div class="pcbox-info-box">
            <h4 style="margin-top: 0; margin-bottom: 0;">PCBOX Info</h4>
        </div>
    </div>
  </div>
</div>

<style>
  .pcbox-info {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .pcbox-info-header {
    flex: 0 0 auto;
    height: 7%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .pcbox-name {
    align-self: flex-start;
    margin-left: 4%;
  }

  .pcbox-active-button {
    width: 22px;
    height: 9px;
    border-radius: 20px;
    display: flex; 
    align-items: center;
    padding: 5px;
    cursor: pointer;
    position: relative;
    transition: background-color 0.5s ease;
    margin-top: 1%;
    margin-right: 4%;
    z-index: 2;
  }

  .pcbox-active-button.active {
    background-color: #01565b;
  }

  .pcbox-active-button.inactive {
    background-color: #e6e6e6;
  }

  .inner-circle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    transition: all 0.5s ease;
  }

  .inner-circle.active{
    transform: translateX(11px);
  }

  .inner-circle.inactive{
    transform: translateX(0px);
  }

  .pcbox-info-container {
    flex: 1 1 auto;
    display: flex;
    width: 94%;
    height: 89%;
    gap: 2%;
    margin-bottom: 3%;
  }

  .pcbox-info-box {
    width: 33%;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    font-size: 14px;
    position: relative;
  }

  .status-time-group {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 3%;
  }

  .status-time-group .pcbox-info-box {
    height: 50%;
    width: 100%;
  }

  .pcbox-timer {
    width: 80%;
    margin-top: 5%;
  }

  .pcbox-pgmlist {
    width: 100%;
    height: 100%;
    margin-top: 5%;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease;
  }

  .overlay.visible {
    opacity: 1;
    visibility: visible;
    transition: all 0.5s ease;
  }

</style>