<script>

</script>

<div>

</div>

<style>
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