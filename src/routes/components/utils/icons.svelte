<script>
    export let type;
    export let size = 24;
  </script>
  
  <style>
    button {
      border: none;
      background: none;
      padding: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
  
    button:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #007bff;
    }
  
    .close-icon:hover {
      background-color: rgba(255, 0, 0, 0.1);
      color: red;    
    }
  
    svg {
      stroke: currentColor;
      pointer-events: none;
    }
  </style>
  
  <button class="icon {type}-icon" on:click>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {#if type === 'minimize'}
        <line x1="4" y1="12" x2="20" y2="12" />
      {:else if type === 'maximize'}
        <rect x="4" y="4" width="16" height="16" />
      {:else if type === 'close'}
        <line x1="4" y1="4" x2="20" y2="20" />
        <line x1="20" y1="4" x2="4" y2="20" />
      {:else if type === 'refresh'}
        <path d="M20 4v5h-5" />
        <path d="M4 20v-5h5" />
        <path d="M20 9a9 9 0 1 1-5-5" />
      {:else if type === 'file'}
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      {:else if type === 'start'}
        <polygon points="5 3 19 12 5 21 5 3" />
      {:else if type === 'end'}
        <line x1="5" y1="3" x2="5" y2="21" />
        <polygon points="10 3 21 12 10 21 10 3" />
      {:else if type === 'stop'}
        <rect x="4.5" y="4.5" width="15" height="15" />
      {:else if type === 'settings'}
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V20a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V4a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H20a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      {:else}
      <text x="12" y="12" text-anchor="middle" dominant-baseline="middle" font-size="10">
        ?
      </text>
      {/if}
    </svg>
  </button>
  