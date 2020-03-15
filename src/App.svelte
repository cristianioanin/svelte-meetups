<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";

  const meetups = [
    {
      id: 1,
      title: "Coding Bootcamp",
      subtitle: "Learn to Code in some amount of hrs",
      description: "Lorem ipsum Vadim lorem lorem dobitoaca",
      imageUrl:
        "https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      address: "32nd Nerdy Roady, 43242 Craiova",
      contactEmail: "code@email.com"
    },
    {
      id: 1,
      title: "Swimming Summer Camp",
      subtitle: "Learn to Swim in some amount of hrs",
      description: "Lorem ipsum Vadim lorem lorem drac mort si rata-necata",
      imageUrl:
        "https://images.unsplash.com/photo-1538992409240-dc1a2ae11e7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      address: "32nd Swimmy Roady, 43242 Craiova",
      contactEmail: "swim@email.com"
    }
  ];
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  <MeetupGrid {meetups} />
</main>
