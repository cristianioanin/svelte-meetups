<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import MeetupForm from "./Meetups/MeetupForm.svelte";
  import Button from "./UI/Button.svelte";

  let meetups = [
    {
      id: "meet1",
      title: "Coding Bootcamp",
      subtitle: "Learn to Code in some amount of hrs",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum doloribus, veritatis, quis omnis consequatur quidem ad odio neque modi suscipit nam aut distinctio temporibus esse expedita voluptates nesciunt ipsa qui.Corrupti, quo hic, quisquam nulla voluptatibus enim porro ipsa reiciendis eligendi velit rerum. Consequatur quibusdam repudiandae officiis error, similique ratione velit possimus labore temporibus. Fuga beatae vero facilis a assumenda!",
      imageUrl:
        "https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      address: "32nd Nerdy Roady, 43242 Craiova",
      contactEmail: "code@email.com",
      isFavorite: false
    },
    {
      id: "meet2",
      title: "Swimming Summer Camp",
      subtitle: "Learn to Swim in some amount of hrs",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iusto at recusandae officiis distinctio vero, ipsam dolore obcaecati veniam harum rerum nostrum porro, non tempora quidem aperiam voluptate accusantium mollitia.",
      imageUrl:
        "https://images.unsplash.com/photo-1538992409240-dc1a2ae11e7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      address: "32nd Swimmy Roady, 43242 Craiova",
      contactEmail: "swim@email.com",
      isFavorite: false
    }
  ];

  let editMode = false;

  function addMeetup(event) {
    const newMeetup = event.detail;

    meetups = [
      ...meetups,
      {
        ...newMeetup,
        id: `meet${Math.random().toString()}`
      }
    ];

    editMode = false;
  }

  function toggleFavorite(event) {
    const id = event.detail;

    meetups = meetups.map(meetup => {
      if (meetup.id === id) {
        return {
          ...meetup,
          isFavorite: !meetup.isFavorite
        };
      }

      return meetup;
    });
  }

  function cancelEdit() {
    editMode = false;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-form-control {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="meetup-form-control">
    <Button on:click={() => (editMode = true)}>New Meetup</Button>
  </div>
  {#if editMode}
    <MeetupForm on:save={addMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>
