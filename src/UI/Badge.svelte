<script>
  import { scale } from "svelte/transition";
</script>

<style>
  span {
    display: inline-block;
    margin: 0 0.25rem;
    border-radius: 4px;
    border: 1px solid #cf0056;
    background-color: #cf0056;
    color: #fff;
    padding: 0 0.25rem;
    font-size: 0.8rem;
  }
</style>

<span transition:scale>
  <slot />
</span>
