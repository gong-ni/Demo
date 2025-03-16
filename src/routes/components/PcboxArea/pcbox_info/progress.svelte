<script>
    import { invoke } from "@tauri-apps/api/core";
    import { onMount, onDestroy } from "svelte";

    export let pcbox;

    const radius = 70;
    const innerRadius = 55;
    const circumference = 2 * Math.PI * radius;

    $: progress = pcbox.progress;

</script>

<div>

  <div class="progress-circle">
    <svg class="circular-chart" viewBox="0 0 200 200" width="200" height="200">

      <circle class="circle-bg"
        cx="100" cy="100" r={radius}
        stroke="#e6e6e6" stroke-width="13" fill="none"/>
      <circle class="circle"
        cx="100" cy="100" r={radius}
        stroke="#01565b" stroke-width="13" fill="none" 
        stroke-dasharray={circumference}
        stroke-dashoffset={circumference * (1 - progress / 100)}
        style="transform: rotate(-90deg); transform-origin: center;
        transition: stroke-dashoffset 1s ease;"/>
      {#if pcbox.running}
        <circle class="circle-hl"
        cx="100" cy="100" r={radius}/>
      {/if}
      <circle class="circle-inner"
        cx="100" cy="100" r={innerRadius}
        stroke="#949494"  stroke-width="2" fill="none" stroke-dasharray="2, 13"/>
    </svg>
    <div class="progress-text">{progress.toFixed(2)}%</div>
  </div>
</div>

<style>
  .progress-circle {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: transparent;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: bold;
  }

  .circle-bg {
    /* animation: pulse 2s infinite; */
    z-index: 1;
  }

  circle {
    transition: stroke-dashoffset 0.3s ease;
    transform: rotate(-90deg);
    transform-origin: center;
    z-index: 2;
  }

  .circle-hl {
    fill: none;
    stroke: #01565b;
    stroke-width: 4;
    opacity: 0.5;
    animation: pulse 2s infinite;
    filter: blur(6px);
    transition: opacity 2s ease-in-out;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.7;
    }
    50% {
      opacity: 0;
    }
  }

</style>