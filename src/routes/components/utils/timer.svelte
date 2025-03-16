<script>
    import { onMount, onDestroy } from "svelte";

    export let pcbox;
    let elapsedTime = 0;
    let formattedElapsedTime = "00:00:00";
    let timerId;

    $: running = pcbox.running;
    $: start_time = pcbox.start_time;
    $: elapsed_time = pcbox.elapsed_time;
    $: end_time = pcbox.end_time;
    
    function updateElapsedTime(startTime) {
        if (!(startTime instanceof Date)) return;

        if (running){
            const now = new Date();
            elapsedTime = Math.floor((now - startTime) / 1000);
            const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, "0");
            const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, "0");
            const secs = String(elapsedTime % 60).padStart(2, "0");
            formattedElapsedTime = `${hours}:${minutes}:${secs}`;
        }
    }

    function formatElapsedTime(elapsed_time) {
        const hours = String(Math.floor(elapsed_time / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((elapsed_time % 3600) / 60)).padStart(2, "0");
        const secs = String(elapsed_time % 60).padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    }


    function formatTime(date) {
        if (!(date instanceof Date) || isNaN(date.getTime()))  return "-";
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}
        ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    }

    onMount(() => {
        if (running)    timerId = setInterval(() => updateElapsedTime(pcbox.start_time), 1000);
        else            clearInterval(timerId);
    });

    onDestroy(() => {
        clearInterval(timerId);
    })

</script>

<div>
    <div class="container">
        <div class="time-text"><div class="triangle-icon"></div>Start Time</div>
        <div class="time-display">{formatTime(start_time)}</div>
        <div class="separator"></div>
        <div class="time-text"><div class="triangle-icon"></div>Elapsed Time</div>
        {#if (running)}
           <div class="time-display">{formattedElapsedTime}</div>
        {:else}
            <div class="time-display">{formatElapsedTime(elapsed_time)}</div>
        {/if}
        <div class="separator"></div>
        <div class="time-text"><div class="triangle-icon"></div>End Time</div>
        <div class="time-display">{formatTime(end_time)}</div>
    </div>
</div>

<style>
    .triangle-icon {
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 10px solid #01565b;
        margin-right: 8px;
        transform: rotate(270deg);
        margin-left: 10%;
    }

    .time-text {
        font-size: 15px;
        margin-top: 6%;
        display: flex;
        align-items: center;
    }

    .time-display {
        margin-top: 4%;
        margin-bottom: 6%;
        margin-left: 8%;
        font-size: 15px;
        margin-left: 20%;        
    }

    .separator {
        height: 1px;
        margin-left: -100;
        width: 100%;
        /* background: #787878; */
        background: transparent;
        transform: scaleY(0.5);
        margin: 4px 0px;
        z-index: inherit;
  }

</style>