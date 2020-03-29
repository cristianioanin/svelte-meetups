import { writable } from 'svelte/store';

const meetups = writable([
  {
    id: "meet1",
    title: "Coding Bootcamp",
    subtitle: "Learn to Code in some amount of hrs",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum doloribus, veritatis, quis omnis consequatur quidem ad odio neque modi suscipit nam aut distinctio temporibus.",
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
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iusto at recusandae officiis distinctio vero.",
    imageUrl:
      "https://images.unsplash.com/photo-1538992409240-dc1a2ae11e7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    address: "32nd Swimmy Roady, 43242 Craiova",
    contactEmail: "swim@email.com",
    isFavorite: false
  }
]);

const meetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetup) => {
    meetups.update(items => ([
      {
        ...meetup,
        id: `meet${Math.random().toString()}`
      },
      ...items
    ]));
  },
  updateMeetup: (meetup) => {
    meetups.update(items => {
      return items.map(entry => {
        if (entry.id === meetup.id) {
          return meetup;
        }

        return entry;
      });
    })
  },
  removeMeetup: (id) => {
    meetups.update(items => items.filter(entry => entry.id !== id));
  },
  toggleFavorite: (id) => {
    meetups.update(items => {
      return items.map(meetup => {
        if (meetup.id === id) {
          return {
            ...meetup,
            isFavorite: !meetup.isFavorite
          };
        }

        return meetup;
      });
    });
  }
};

export default meetupsStore;