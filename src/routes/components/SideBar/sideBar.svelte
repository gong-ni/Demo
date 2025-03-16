<script>
    import { showConfigPopup } from '../../modules/config';
    import { defaultPgmPath, defaultLogPath, defaultPrtScrPath } from '../../modules/config'
    import Icons from '../utils/icons.svelte';

    import * as pcboxHandler from '../../modules/pcbox';
    import * as pgmHandler from '../../modules/pgm';
    import * as configHandler from '../../modules/config';
</script>

<div>
    <div class="sidebar">
        <div class="sidebar-above">
          <Icons type="refresh" on:click={() => pcboxHandler.allPcboxMenuAction("PCBOX Init")}/>
          <Icons type="file"    on:click={() => pcboxHandler.allPcboxMenuAction("PGM Change")}/>
          <Icons type="start"   on:click={() => pcboxHandler.allPcboxMenuAction("PGM Run")}/>
          <Icons type="end"     on:click={() => pcboxHandler.allPcboxMenuAction("PGM End")}/>
          <Icons type="stop"    on:click={() => pcboxHandler.allPcboxMenuAction("PGM Abort")}/>
        </div>
        <div class="sidebar-below">
          <Icons type="settings" on:click={() => configHandler.openConfig()}/>
        </div>

        {#if $showConfigPopup}
        <div class="config-popup-container">
          <div class="config-popup" on:click|stopPropagation={configHandler.onPopupOpen}>
            <div class="config-popup-header">
              <div class="config-title" style="margin-left: 10px;">
                <span><strong>Configuration</strong></span>
              </div>
              <button id="close-button" on:click={configHandler.closeConfig}>X</button>
            </div>
            <div class="separator"></div>
              <div class="config-popup-content">
                <div class="path-display">로그 저장 경로</div>
                <div class="change-path-button" on:click={configHandler.changedefaultLogPath}>{defaultLogPath}</div>
                <div class="path-display">스크린샷 저장 경로</div>
                <div class="change-path-button" on:click={configHandler.changedefaultPrtScrPath}>{defaultPrtScrPath}</div>
              </div>
            </div>
          </div> 
        {/if}
      </div>    
</div>

<style>
  /* ------------------------------ pgm menu ---------------------------- */
  .sidebar {
    background-color: rgb(246, 246, 246);
    border-top: 1px solid #e1e1e1;
    width: 48px;
    height: calc(100vh - 34px);
    padding-top: 10px;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .sidebar-above {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
    gap: 15px;
  }

  .sidebar-below {
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    margin-bottom: 10px;
  }

  .config-popup-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }

  .config-popup-container > div {
    /* pointer-events: none; */
  }

  .config-popup {
    background-color: white;
    width: 600px;
    height: 600px;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: left;
    animation: fadeIn 0.3s ease-in;
  }

  .config-popup-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 5%;
    align-items: center;
  }

  .config-popup-content {
    text-align: left;
    font-size: 14px;
    margin: 15px 30px;
    /* border: 1px solid black; */
  }

  .path-display {
    padding: 8px 5px;
    flex: 1;
  }

  .change-path-button {
    padding: 7px 15px;
    border-radius: 6px;
    background-color: rgb(246,246,246);
    margin-top: 2px;
    margin-bottom: 40px;
    font-size: 12px;
  }

  .change-path-button:hover {
    background-color: #ddd;
  }


</style>