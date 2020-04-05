<script>
  import { onMount } from "svelte";
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/Header.svelte";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import MeetupForm from "./Meetups/MeetupForm.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import Error from "./UI/Error.svelte";

  import Button from "./UI/Button.svelte";

  let editMode = false;
  let editData = {
    id: null
  };
  let detailMode = false;
  let detailData = {
    id: null
  };
  let loading = true;
  let error;

  function addMeetup(event) {
    meetups.addMeetup(event.detail);
    editMode = false;
  }

  function updateMeetup(event) {
    meetups.updateMeetup(event.detail);
    resetEditForm();
  }

  function deleteMeetup(event) {
    fetch(
      `https://meetups-svelte-c57f3.firebaseio.com/meetups/${event.detail}.json`,
      {
        method: "DELETE"
      }
    )
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error while deleting meetup id ${event.detail}...`);
        }

        meetups.removeMeetup(event.detail);
      })
      .catch(err => (error = err));

    resetEditForm();
  }

  function cancelEdit() {
    resetEditForm();
  }

  function showDetails(event) {
    detailData.id = event.detail;
    detailMode = true;
  }

  function closeDetails() {
    detailMode = false;
    detailData.id = null;
  }

  function showEditForm(event) {
    editData.id = event.detail;
    editMode = true;
  }

  function resetEditForm() {
    editMode = false;
    editData.id = null;
  }

  function closeErrorModal() {
    error = null;
  }

  onMount(() => {
    fetch("https://meetups-svelte-c57f3.firebaseio.com/meetups.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("Error while fetching meetups...");
        }

        return res.json();
      })
      .then(data => {
        const meetupsData = Object.keys(data).map(id => ({ ...data[id], id }));
        setTimeout(() => {
          loading = false;
          meetups.setMeetups(meetupsData.reverse());
        }, 600);
      })
      .catch(err => {
        loading = false;
        error = err;
      });
  });
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

{#if error}
  <Error message={error.message} on:cancel={closeErrorModal} />
{/if}
<Header />

<main>
  {#if !detailMode}
    {#if editMode}
      <MeetupForm
        id={editData.id}
        on:save={addMeetup}
        on:update={updateMeetup}
        on:cancel={cancelEdit}
        on:delete={deleteMeetup} />
    {/if}
    {#if loading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:showdetails={showDetails}
        on:edit={showEditForm}
        on:newmeetup={() => (editMode = true)} />
    {/if}
  {:else}
    <MeetupDetail id={detailData.id} on:close={closeDetails} />
  {/if}
</main>
