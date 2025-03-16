<script>
    import { pcboxes } from '../../modules/pcbox';

    import * as pcboxHandler from '../../modules/pcbox';
    import * as areaHandler from '../../modules/area';

</script>

<div>
    <div class="pcboxes">
        {#each $pcboxes as pcbox}
          <div class="pcbox {pcbox.selected ? 'selected' : ''}
                            {pcbox.active ? 'active' : 'inactive'}
                            {pcbox.running ? 'running' : ''}"
          on:click={(event) => pcboxHandler.pcboxLeftClick(event,pcbox)}
          on:contextmenu={(event) => pcboxHandler.pcboxRightClick(event, pcbox)}>
          <div class="pcboxarea" on:dblclick={(event) => pcboxHandler.togglePcboxInfo(event, pcbox)}>
            <div class="pcboxname">PCBOX {pcbox.index + 1}
              <div class="status-bar"></div>
            </div>
          </div>
            {#each pcbox.areas as area}
              <div class="slotarea {area.selected ? 'selected' : ''}
                                   {area.status === areaHandler.STATUS.NULL ? 'null' : ''}
                                   {area.status === areaHandler.STATUS.RUNNING ? 'running' : ''}
                                   {area.status === areaHandler.STATUS.FAIL ? 'fail' : ''}
                                   {area.status === areaHandler.STATUS.PASS ? 'pass' : ''}"
              on:dblclick={(event) => areaHandler.areaDoubleClick(pcbox.index, area.index)}>
                <div class="number-box">{area.index + 1}</div>
                {#if area.status === areaHandler.STATUS.RUNNING}
                  <div class="content">
                    <div class="pgm-content">{pcbox.pgmContent}</div>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/each}
    </div>
</div>

<style>
  .pcboxes {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, auto);
    padding: 16px;
    gap: 16px;
    flex-grow: 1;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  .pcbox {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
    gap: 0px;
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    transition: all 0.3s ease;
  }

  .pcbox:hover {
    background-color: rgb(226, 247, 255);
  }

  .pcboxarea {
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    font-size: 14px;
    font-weight: bold;
    z-index: 2;
    padding: 2px;
    z-index: 1000;
  }

  .pcboxname {
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    font-size: 14px;
    font-weight: bold;
    z-index: 2;
    margin: 9px;
  }

  .pcbox.selected {
    position: relative;
    transform: translateY(-3px);
  }
  
  .pcbox.selected::after {
    content:"";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(226, 247, 255);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    z-index: 999;
    transition: all 0.3s ease;
  }
  
  .pcbox.inactive {
    background-color: #e1e1e1;
  }

  .pcbox.inactive::after {
    content:"";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* pointer-events: none; */
  }

  .pcbox.inactive .number-box {
    visibility: hidden;
  }
  
  .status-bar {
    position: absolute;
    box-sizing: border-box;
    aspect-ratio: 1;
    width: auto;
    top: 0;
    right: 0;
    height: 110%;
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: #01565b;
    transition: transform 1s linear;
  }

  .pcbox.running .status-bar {
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .slotarea {
    display: flex;
    height: 100%;
    justify-content: space-between;
    border-top: 1px solid #e1e1e1;
    align-items: center;
    background-color: transparent;
    z-index: 1000;
    position: relative;
    overflow: hidden;
  }

  .slotarea.selected {
    position: relative;
  }

  .slotarea.selected::after {
    content:"";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(67, 176, 219, 0.15);
    /* pointer-events: none; */
    z-index: 10000;
  }

  .slotarea.running {
    background-color: rgba(249, 255, 180, 0.482);
  }

  .slotarea.fail {
    background-color: rgba(255, 223, 180, 0.482);
  } 

  .slotarea.pass {
    background-color: rgba(180, 255, 190, 0.482);
  } 

  .slotarea.running .number-box,
  .slotarea.fail .number-box,
  .slotarea.pass .number-box
  {
    background-color: white;
  }

  .slotarea .number-box {
    height: 100%;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60%;
    font-weight: bold;
    border-right: 1px solid #e1e1e1;
    z-index: 1000;
  }

  .slotarea .content {
    width: 100%;
    height: 100%;
    margin-left: 10px;
    position: relative;
  }

  .slotarea .content .pgm-content {
    width: 100%;
    height: 100%;
    justify-content: left;
    line-height: 0;
    display: flex;
    align-items: center;
    animation: scroll-text 3s linear infinite;
    font-size: 12px;
    z-index: 999;
    position: absolute;
  }

  @keyframes scroll-text {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }

</style>