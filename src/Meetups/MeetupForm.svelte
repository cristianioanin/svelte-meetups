<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  const dispatch = createEventDispatcher();

  let newMeetup = {
    title: "",
    subtitle: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
    address: "",
    contactEmail: "",
    isFavorite: false
  };

  function updateNewMeetupValue(event, key) {
    newMeetup = {
      ...newMeetup,
      [key]: event.target.value
    };
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Meetup Details" on:cancel>
  <form>
    <TextInput
      label="Title"
      id="title"
      value={newMeetup.title}
      on:input={e => updateNewMeetupValue(e, 'title')} />
    <TextInput
      label="Subtitle"
      id="subtitle"
      value={newMeetup.subtitle}
      on:input={e => updateNewMeetupValue(e, 'subtitle')} />
    <TextInput
      label="Address"
      id="address"
      value={newMeetup.address}
      on:input={e => updateNewMeetupValue(e, 'address')} />
    <TextInput
      label="Image URL"
      id="imageUrl"
      value={newMeetup.imageUrl}
      on:input={e => updateNewMeetupValue(e, 'imageUrl')} />
    <TextInput
      label="e-Mail"
      id="contactEmail"
      type="email"
      value={newMeetup.contactEmail}
      on:input={e => updateNewMeetupValue(e, 'contactEmail')} />
    <TextInput
      label="Description"
      id="description"
      type="textarea"
      value={newMeetup.description}
      on:input={e => updateNewMeetupValue(e, 'description')} />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={() => dispatch('cancel')}>
      Cancel
    </Button>
    <Button type="button" on:click={() => dispatch('save', newMeetup)}>
      Save
    </Button>
  </div>
</Modal>
