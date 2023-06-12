/**
 * @jest-environment jsdom
 */

// Only put unit tests here that do not require mock functions from main.js or historyHelpers.js
import {
  saveToHistory,
  getHistory,
  deleteFromHistory,
} from '../assets/scripts/historyHelpers.js';

import { timeout } from '../assets/scripts/main.js';

import { loadProfiles } from '../assets/scripts/aboutus.js'

// Mock console log
global.console = {
  log: jest.fn(),
};
// Mock fetch
const expectedJSON = [
  {
    "profileSrc": "./assets/images/profile_images/faith.jpg",
    "name": "Faith Rivera",
    "role": "Team Lead",
    "description": "Faith is a 2nd year undergraduate studying Computer Science in Sixth College. She is interested in pursuing more knowledge in design and chemistry. Her favorite animals are cheetahs and dogs. She loves to dance and also has a twin sister at UCSD!",
    "profilePos": "left"
  },
  {
    "profileSrc": "./assets/images/profile_images/henry.jpeg",
    "name": "Henry Zhang",
    "role": "Team Lead",
    "description": "Henry is a 2nd year studying Computer Science in Sixth College. His favorite animal is the lion and a fun fact is his middle name is his favorite animal.",
    "profilePos": "right"
  },
  {
    "profileSrc": "./assets/images/profile_images/chay.png",
    "name": "Chay Park",
    "role": "Designer",
    "description": "Chay is a designer with a keen interest in exploring the worlds of Virtual Reality, Augmented Reality, and web design. She is currently in her 4th year studying Computer Science at Sixth College. She is excited about merging technology and creativity to craft engaging experiences across various platforms, including the web. Her favorite animal is a dog.",
    "profilePos": "left"
  },
  {
    "profileSrc": "./assets/images/profile_images/jiaen.jpg",
    "name": "Jiaen Yu",
    "role": "Planner",
    "description": "Jiaen is a 2nd graduate student of UCSD's Computer Science and Engineering department. He is a cat person, coconut water lover, soccer fan and amateur football player.",
    "profilePos": "right"
  },
  {
    "profileSrc": "./assets/images/profile_images/chris.jpg",
    "name": "Chris Tian",
    "role": "Developer",
    "description": "Chris is a 2nd year Computer Science major in Eleanor Roosevelt College. His favorite animal is the cheetah because it is the fastest animal on earth and he is impressed by its hunting ability. He's a pretty adventurous guy but afraid of the feeling of weightlessness such as bungee jumping and riding roller coasters.",
    "profilePos": "left"
  },
  {
    "profileSrc": "./assets/images/profile_images/mico.jpg",
    "name": "Mico Guinto",
    "role": "Developer",
    "description": "Mico is a 4th year studying Computer Engineering at Muir College. His favorite animal is the Emperor Penguin. His go-to In-N-Out order is 2 4x4s Animal Style, extra tomatoes, no pickles, cut in half, with banana peppers.",
    "profilePos": "right"
  },
  {
    "profileSrc": "./assets/images/profile_images/nick.JPG",
    "name": "Nick Yousefi",
    "role": "Developer",
    "description": "Nick is a 4th year bioinformatics major at Revelle College. His favorite animal is the peacock. He enjoys being out in nature and playing board games with his friends from church. Although he does not endorse the practice of palm reading, he has enjoyed learning about software engineering in CSE 110.",
    "profilePos": "left"
  },
  {
    "profileSrc": "./assets/images/profile_images/michael.jpg",
    "name": "Michael Ye",
    "role": "Developer",
    "description": "Michael is a 2nd year Computer Science major in Eleanor Roosevelt College. His favorite animal is the brown bear and he has visited over 20 countries so far.",
    "profilePos": "right"
  },
  {
    "profileSrc": "./assets/images/profile_images/anh.png",
    "name": "Anh Pham",
    "role": "Developer",
    "description": "Greetings from Anh- a 3rd year in Revelle College. He is a Computer Science major student who hates math (not your typical Asian 😬...) but loves coding and creating amazing things with technology. Fun fact- he can rap in three languages.🎤",
    "profilePos": "left"
  },
  {
    "profileSrc": "./assets/images/profile_images/dylan.jpg",
    "name": "Dylan Olivares",
    "role": "Developer",
    "description": "Dylan is a 3rd year Computer Science major in Muir College. His favorite animal is a dog because they are man's best friend. His hobbies outside of school-related things are playing volleyball and going to the gym.",
    "profilePos": "right"
  }
]
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(expectedJSON),
  })
);


describe('loadProfiles', () => {
  it ('loads valid URL and returns JSON object', async () => {
    const URL = 'https://raw.githubusercontent.com/cse110-sp23-group3/cse110-sp23-group3/main/source/assets/json/aboutprofiles.json';
    
    const actualJSON = await loadProfiles(URL);

    expect(actualJSON).toEqual(expectedJSON);

  });
});

describe('Save to History', () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
  });

  it('saves generic chat to history when history empty', () => {
    const chatArrMock = ['message1', 'message2', 'message3', 'message4'];
    const currentSessionMock = '12345';
    const sessionNameMock = 'my first session';

    saveToHistory(chatArrMock, currentSessionMock, sessionNameMock);

    const palmReadings = JSON.parse(
      window.localStorage.getItem('palmReadings')
    );
    expect(palmReadings).toEqual({
      12345: {
        displayName: 'my first session',
        chatArr: ['message1', 'message2', 'message3', 'message4'],
      },
    });
  });

  it('does not save when chatArr == 3', () => {
    const chatArrMock = ['message1', 'message2', 'message3'];
    const currentSessionMock = '12345';
    const sessionNameMock = 'my first session';

    saveToHistory(chatArrMock, currentSessionMock, sessionNameMock);

    const palmReadings = JSON.parse(
      window.localStorage.getItem('palmReadings')
    );
    expect(palmReadings).toBeNull();
  });

  it('does not save when chatArr < 3', () => {
    const chatArrMock = ['message1'];
    const currentSessionMock = '12345';
    const sessionNameMock = 'my first session';

    saveToHistory(chatArrMock, currentSessionMock, sessionNameMock);

    const palmReadings = JSON.parse(
      window.localStorage.getItem('palmReadings')
    );
    expect(palmReadings).toBeNull();
  });

  it('should log error to console if JSON data is badly formatted', () => {
    window.localStorage.setItem('palmReadings', '{ asdfa![}}}');
    const chatArrMock = ['message1', 'message2', 'message3', 'message4'];
    const currentSessionMock = '12345';
    const sessionNameMock = 'my first session';

    saveToHistory(chatArrMock, currentSessionMock, sessionNameMock);

    expect(console.log).toHaveBeenCalled();
  });

  it('saves generic chat to history when history has stuff in it', () => {
    // pre-existing chats in history
    const mockData = {
      1686445888833: {
        displayName: '',
        chatArr: [
          {
            message: "Hi, I'm Simba!",
            isIncoming: true,
          },
          {
            message: 'Which palm line?',
            isIncoming: true,
          },
          {
            image: './assets/images/palm-diagram.jpeg',
          },
        ],
      },
      1686445888834: {
        displayName: '',
        chatArr: [
          {
            message: "Hi, I'm Simba!",
            isIncoming: true,
          },
          {
            message: 'Which palm line?',
            isIncoming: true,
          },
          {
            image: './assets/images/palm-diagram.jpeg',
          },
        ],
      },
    };

    localStorage.setItem('palmReadings', JSON.stringify(mockData));

    // new chat to save
    const chatArrMock = [
      { message: "Hi, I'm Scar!", isIncoming: true },
      { message: 'Which palm line?', isIncoming: true },
      { image: './assets/images/palm-diagram.jpeg' },
      { image: './assets/images/palm-diagram.jpeg' },
    ];
    const currentSessionMock = '12345';
    const sessionNameMock = 'my first session';

    saveToHistory(chatArrMock, currentSessionMock, sessionNameMock);

    const palmReadings = JSON.parse(
      window.localStorage.getItem('palmReadings')
    );
    expect(palmReadings).toEqual({
      1686445888833: {
        displayName: '',
        chatArr: [
          {
            message: "Hi, I'm Simba!",
            isIncoming: true,
          },
          {
            message: 'Which palm line?',
            isIncoming: true,
          },
          {
            image: './assets/images/palm-diagram.jpeg',
          },
        ],
      },
      1686445888834: {
        displayName: '',
        chatArr: [
          {
            message: "Hi, I'm Simba!",
            isIncoming: true,
          },
          {
            message: 'Which palm line?',
            isIncoming: true,
          },
          {
            image: './assets/images/palm-diagram.jpeg',
          },
        ],
      },
      12345: {
        displayName: 'my first session',
        chatArr: [
          { message: "Hi, I'm Scar!", isIncoming: true },
          { message: 'Which palm line?', isIncoming: true },
          { image: './assets/images/palm-diagram.jpeg' },
          { image: './assets/images/palm-diagram.jpeg' },
        ],
      },
    });
  });
});

describe('getHistory', () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
  });

  it('should return an empty object if there is no data', () => {
    const history = getHistory();
    expect(history).toEqual({});
  });

  it('should return the stored data if it exists', () => {
    const mockData = { HeartLine: 'Your future is bright!' };
    localStorage.setItem('palmReadings', JSON.stringify(mockData));

    const history = getHistory();
    expect(history).toEqual(mockData);
  });

  it('should catch and log error if localStorage data is not valid JSON', () => {
    const invalidData = '{ HeartLine: Your future is bright!';
    localStorage.setItem('palmReadings', invalidData);

    const history = getHistory();
    expect(console.log).toHaveBeenCalled();
    expect(history).toBeUndefined();
  });
});

describe('Delete From History', () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
  });

  it('check to see if entry is deleted from local storage', () => {
    const mockData = {
      key1: 'Your future is bright!',
      key2: '12345',
      key3: 'deleteMe',
    };
    window.localStorage.setItem('palmReadings', JSON.stringify(mockData));

    deleteFromHistory('key3');

    const newMockData = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(newMockData).toEqual({
      key1: 'Your future is bright!',
      key2: '12345',
    });
  });

  it('check deleteFromHistory when palmReadings not in local storage', () => {
    deleteFromHistory('deleteMe');

    const newMockData = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(newMockData).toEqual({});
  });

  it('check deleteFromHistory when one chat session in local storage', () => {
    const mockData = { key1: 'Your future is bright!' };
    window.localStorage.setItem('palmReadings', JSON.stringify(mockData));

    deleteFromHistory('key1');

    const newMockData = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(newMockData).toEqual({});
  });

  it('check deleteFromHistory when key does not exist', () => {
    const mockData = {
      key1: 'Your future is bright!',
      key2: 'Your future is dark!',
    };
    window.localStorage.setItem('palmReadings', JSON.stringify(mockData));

    deleteFromHistory('key3');

    const newMockData = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(newMockData).toEqual({
      key1: 'Your future is bright!',
      key2: 'Your future is dark!',
    });
  });

  it('check deleteFromHistory when palmReadings exists but no chats saved', () => {
    const mockData = {};
    window.localStorage.setItem('palmReadings', JSON.stringify(mockData));

    deleteFromHistory('key1');

    const newMockData = JSON.parse(window.localStorage.getItem('palmReadings'));
    expect(newMockData).toEqual({});
  });

  it('should log error to console if JSON data is badly formatted', () => {
    window.localStorage.setItem('palmReadings', '{ asdfa![}}}');

    deleteFromHistory('key1');

    expect(console.log).toHaveBeenCalled();
  });
});

describe('timeout', () => {
  it('returns a resolved promise with expected value', async () => {
    const start = Date.now();
    await timeout(1000);
    const end = Date.now();

    const diff = Math.round((end - start) / 1000) * 1000;
    expect(diff).toEqual(1000);
  });
});
