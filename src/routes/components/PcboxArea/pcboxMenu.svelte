<script>
    import * as pcboxHandler from '../../modules/pcbox';
    import { pcboxMenuPosition } from '../../modules/pcbox'
</script>

<div>
    <ul class="pcbox-menu" id="pcbox-menu" style="top:{$pcboxMenuPosition.y}px; left:{$pcboxMenuPosition.x}px;">
        <li on:click={() => pcboxHandler.selectedPcboxMenuAction("PGM Run")}><span class="left">PGM 실행</span><span class="right">Ctrl+R</span></li>
        <li on:click={() => pcboxHandler.selectedPcboxMenuAction("PGM Abort")}><span class="left">PGM 중단</span><span class="right">Ctrl+S</span></li>
        <li on:click={() => pcboxHandler.selectedPcboxMenuAction("PGM End")}><span class="left">PGM 마침</span><span class="right">Ctrl+E</span></li>
        <li on:click={() => pcboxHandler.selectedPcboxMenuAction("PGM Change")}><span class="left">PGM 변경</span><span class="right"></span></li>          
        <li class="separator"></li>
        <li on:click={() => pcboxHandler.selectedPcboxMenuAction("PCBOX EN/DIS")}><span class="left">PCBOX 활성화/비활성화</span><span class="right"></span></li>
        <li on:click={() => pcboxHandler.selectedPcboxMenuAction("PCBOX Init")}><span class="left">PCBOX 비우기</span><span class="right">Del</span></li>          
        <li on:click={() => pcboxHandler.selectedPcboxMenuAction("PCBOX Info")}><span class="left">PCBOX 정보</span><span class="right">Ctrl+I</span></li>          
        <li class="separator"></li>
        <li on:click={() => pcboxHandler.selectedPcboxMenuAction("Cut")}><span class="left">잘라내기</span><span class="right">Ctrl+X</span></li>
        <li on:click={() => pcboxHandler.selectedPcboxMenuAction("Copy")}><span class="left">복사</span><span class="right">Ctrl+C</span></li>
        <li on:click={() => pcboxHandler.selectedPcboxMenuAction("Paste")}><span class="left">붙여넣기</span><span class="right">Ctrl+V</span></li>
    </ul>
</div>

<style>
      /* ------- pcbox menu ------- */

  .pcbox-menu {
    position: absolute;
    background: white;
    padding: 0px;
    list-style-type: none;
    margin: 0px;
    box-shadow: 0 0 0 0.5px #787878,
                2px 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    border-radius: 6px;
    width: 340px;
    z-index: 100001;
  }

  .pcbox-menu li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 30px;
    font-size: 12px;
    cursor: pointer;
    margin: 0px 5px;
    border-radius: 5px;
  }

  .pcbox-menu > li:first-child {
    margin-top: 5px;
  }

  .pcbox-menu > li:last-child {
    margin-bottom: 5px;
  }

  .pcbox-menu li .left{ text-align: left; }
  .pcbox-menu li .right{ text-align: right; }

  .pcbox-menu .separator {
    margin: 5px 0px;
    padding: 0px;
  }

  .pcbox-menu li:hover {
    background-color: #e1e1e1;
  }

  .separator {
    height: 1px;
    width: 100%;
    background: #787878;
    transform: scaleY(0.5);
    /* pointer-events: none; */
    margin: 4px 0px;
    z-index: inherit;
  }
</style>