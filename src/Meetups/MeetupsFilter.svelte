<script>
  import { createEventDispatcher } from "svelte";

  let option = 0;

  const dispatch = createEventDispatcher();

  function emitOption(value) {
    option = value;
    dispatch("filter", value);
  }
</script>

<style>
  div {
    font-size: 0px;
  }

  button {
    background: #aaaaaa;
    font: inherit;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid #aaaaaa;
    padding: 0.5rem 1rem;
  }

  button:focus {
    outline: none;
  }

  button:first-of-type {
    border-radius: 5px 0 0 5px;
  }

  button:last-of-type {
    border-radius: 0 5px 5px 0;
  }

  button:hover,
  .active {
    background: #e6196d;
    border-color: #e6196d;
    color: white;
  }

  button:active,
  .active {
    background: #cf0056;
    border-color: #cf0056;
    color: white;
  }
</style>

<div>
  <button
    class:active={option === 0}
    type="button"
    on:click={() => emitOption(0)}>
    All
  </button>
  <button
    class:active={option === 1}
    type="button"
    on:click={() => emitOption(1)}>
    Favorites
  </button>
</div>
