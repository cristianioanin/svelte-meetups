import { writable } from 'svelte/store';

const meetups = writable([]);

const meetupsStore = {
  subscribe: meetups.subscribe,
  setMeetups: (list) => {
    meetups.set(list);
  },
  addMeetup: (meetup) => {
    meetups.update(items => ([
      meetup,
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