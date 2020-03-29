<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupsFilter from "./MeetupsFilter.svelte";
  import Button from "../UI/Button.svelte";

  const dispatch = createEventDispatcher();

  export let meetups;

  let filterFavorites = false;

  $: filteredMeetups = filterFavorites
    ? meetups.filter(meetup => meetup.isFavorite)
    : meetups;

  function filterMeetups(event) {
    filterFavorites = Boolean(event.detail);
  }
</script>

<style>
  .meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  .controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    .meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section class="controls">
  <MeetupsFilter on:filter={filterMeetups} />
  <Button on:click={() => dispatch('newmeetup')}>New Meetup</Button>
</section>
<section class="meetups">
  {#each filteredMeetups as meetup (meetup.id)}
    <div transition:fade animate:flip={{ duration: 400 }}>
      <MeetupItem {meetup} on:showdetails on:edit />
    </div>
  {/each}
</section>
