<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import MeetupForm from "./Meetups/MeetupForm.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";

  import Button from "./UI/Button.svelte";

  let editMode = false;
  let editData = {
    id: null
  };
  let detailMode = false;
  let detailData = {
    id: null
  };

  function addMeetup(event) {
    meetups.addMeetup(event.detail);
    editMode = false;
  }

  function updateMeetup(event) {
    meetups.updateMeetup(event.detail);
    resetEditForm();
  }

  function deleteMeetup(event) {
    meetups.removeMeetup(event.detail);
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
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

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
    <MeetupGrid
      meetups={$meetups}
      on:showdetails={showDetails}
      on:edit={showEditForm}
      on:newmeetup={() => (editMode = true)} />
  {:else}
    <MeetupDetail id={detailData.id} on:close={closeDetails} />
  {/if}
</main>
