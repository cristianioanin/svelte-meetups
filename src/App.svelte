<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";

  let newMeetup = {
    title: "",
    subtitle: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
    address: "",
    contactEmail: ""
  };

  let meetups = [
    {
      id: "meet1",
      title: "Coding Bootcamp",
      subtitle: "Learn to Code in some amount of hrs",
      description: "Lorem ipsum Vadim lorem lorem dobitoaca",
      imageUrl:
        "https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      address: "32nd Nerdy Roady, 43242 Craiova",
      contactEmail: "code@email.com"
    },
    {
      id: "meet2",
      title: "Swimming Summer Camp",
      subtitle: "Learn to Swim in some amount of hrs",
      description: "Lorem ipsum Vadim lorem lorem drac mort si rata-necata",
      imageUrl:
        "https://images.unsplash.com/photo-1538992409240-dc1a2ae11e7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      address: "32nd Swimmy Roady, 43242 Craiova",
      contactEmail: "swim@email.com"
    }
  ];

  function addMeetup() {
    meetups = [
      ...meetups,
      {
        ...newMeetup,
        id: `meet${Math.random().toString()}`
      }
    ];
  }

  function updateNewMeetupValue(event, key) {
    newMeetup = {
      ...newMeetup,
      [key]: event.target.value
    };
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
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
    <Button type="submit" caption="Save" />
  </form>

  <MeetupGrid {meetups} />
</main>
