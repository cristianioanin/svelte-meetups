<script>
  import { createEventDispatcher } from "svelte";
  import meetups from "./meetups-store.js";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";

  const dispatch = createEventDispatcher();

  export let meetup;

  function toggleFavorite() {
    fetch(
      `https://meetups-svelte-c57f3.firebaseio.com/meetups/${meetup.id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ isFavorite: !meetup.isFavorite }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        if (!res.ok) {
          throw new Error("Favorite setting for Meetup failed...");
        }

        meetups.toggleFavorite(meetup.id);
      })
      .catch(console.log);
  }
</script>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>

<article>
  <header>
    <h1>
      {meetup.title}
      {#if meetup.isFavorite}
        <Badge>&#10084;</Badge>
      {/if}
    </h1>
    <h2>{meetup.subtitle}</h2>
    <p>{meetup.address}</p>
  </header>
  <div class="image">
    <img
      src={meetup.imageUrl}
      alt="An image for visual feedback of the following Meetup: {meetup.title}" />
  </div>
  <div class="content">
    <p>{meetup.description}</p>
  </div>
  <footer>
    <Button
      type="button"
      mode="outline"
      context={meetup.isFavorite ? null : 'success'}
      on:click={toggleFavorite}>
      {meetup.isFavorite ? 'Remove Favorite' : 'Add Favorite'}
    </Button>
    <!-- <Button href="mailto:{meetup.contactEmail}">Contact</Button> -->
    <Button
      type="button"
      mode="outline"
      on:click={() => dispatch('edit', meetup.id)}>
      Edit
    </Button>
    <Button type="button" on:click={() => dispatch('showdetails', meetup.id)}>
      Show Details
    </Button>
  </footer>
</article>
