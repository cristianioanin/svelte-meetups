<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isRequired, isValidEmail } from "../helpers/form-validation.js";

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

  let optionalFields = ["description", "imageUrl"];

  $: formValidation = initValidationMap(newMeetup);
  $: isFormValid = Array.from(formValidation.values()).every(val => !!val);

  function updateNewMeetupValue(event, key) {
    newMeetup = {
      ...newMeetup,
      [key]: event.target.value
    };
  }

  function initValidationMap(meetup) {
    const validationMap = new Map(Object.entries(meetup));
    validationMap.forEach((val, key) => {
      if (optionalFields.includes(key)) {
        validationMap.set(key, true);
      } else if (key === "contactEmail") {
        validationMap.set(key, isValidEmail(val) && isRequired(val));
      } else {
        validationMap.set(key, isRequired(val));
      }
    });

    return validationMap;
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
      valid={formValidation.get('title')}
      errorMessage="This field is required."
      value={newMeetup.title}
      on:input={e => updateNewMeetupValue(e, 'title')} />
    <TextInput
      label="Subtitle"
      id="subtitle"
      valid={formValidation.get('subtitle')}
      errorMessage="This field is required."
      value={newMeetup.subtitle}
      on:input={e => updateNewMeetupValue(e, 'subtitle')} />
    <TextInput
      label="Address"
      id="address"
      valid={formValidation.get('address')}
      errorMessage="This field is required."
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
      valid={formValidation.get('contactEmail')}
      errorMessage="Required. Please check email address format."
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
    <Button
      type="button"
      disabled={!isFormValid}
      on:click={() => dispatch('save', newMeetup)}>
      Save
    </Button>
  </div>
</Modal>
