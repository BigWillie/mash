const pingSound = new Audio('splat.mp3');


const App = {
  data() {
    return {
        categories: [
          {
            title: "Occupation",
            lifeChoices: [
              "Professional Queue Jumper",
              "Biscuit Dunking Champion",
              "UFO Chaser",
              "Extreme Ironing Athlete",
              "Pillow Fight Referee",
            ],
          },
          {
            title: "Transportation",
            lifeChoices: [
              "Unicycle on Cobbled Streets",
              "Haunted Black Cab",
              "Rocket-Powered Wheelie Bin",
              "Self-Driving Shopping Trolley",
              "Hovering Deckchair",
            ],
          },
          {
            title: "Celebrity Spouse",
            lifeChoices: [
              "Stephen Fry",
              "Olivia Colman",
              "David Tennant",
              "Emily Blunt",
              "Idris Elba",
            ],
          },
          {
            title: "Pet",
            lifeChoices: [
              "Football-Playing Hedgehog",
              "Dancing Seagull",
              "Shakespeare-Quoting Parrot",
              "Wellie-Wearing Duck",
              "Tea Cosy-Wearing Tortoise",
            ],
          },
          {
            title: "Hometown",
            lifeChoices: [
              "Underwater Village",
              "Inside a Giant Maze",
              "A Town Made of Cake",
              "Upside-Down City",
              "Village on a Cloud",
            ],
          },
          {
            title: "Superpower",
            lifeChoices: [
              "The Ability to Summon a Rain Cloud",
              "Instant Pudding-Making",
              "Sarcasm Detection",
              "Perfect Umbrella Control",
              "Teleportation to Any Pub",
            ],
          },
          {
            title: "Best Friend",
            lifeChoices: [
              "A Sarcastic Ghost",
              "A Time-Travelling Dinosaur",
              "A Shape-Shifting Postbox",
              "A Talking Traffic Cone",
              "A Polite Robot",
            ],
          },
          {
            title: "Holiday Destination",
            lifeChoices: [
              "Inside a Giant Jelly",
              "A Zero-Gravity Theme Park",
              "A Cloud Castle",
              "A Haunted Seaside Resort",
              "A Floating Island with Invisible Bridges",
            ],
          },
        ],
      magicNumber: 0,
      totalCells: 9,
      maxCategoryCounter: 0,
      lifeChoices: [
        
      ],
      message: ''
    };
  },

  // what would I do differently? Tests, TypeScript, better naming, better structure, better algorithm... the lot really
  // An accessible UI that works on mobile as well as desktop

  methods: {
    reset() {
        this.lifeChoices = [];
        this.message = '';
        this.maxCategoryCounter = 0;
    },
    playMash() {
      // this is absolutely rubbish... it doesn't even use the magicNumber... I spent a good few hours trying to make a perfect
      // implementation of the wikihow algorithm but I couldn't get it to work. I hit too many edge cases
      // I lack the skill... Although when I played it out on paper, it didn't seem to match the wikihow?
      // anyhow - apologies for this.
      // Create an array of promises for each lifeChoice
const promises = this.lifeChoices.map((lifeChoice, idx) => {
    return new Promise((resolve) => {
        // loop over lifeChoice.lifeChoices x this.magicNumber and stop
        const index = Math.floor(Math.random() * lifeChoice.lifeChoices.length);
        console.log(index);

        // Set a delay for each lifeChoice
        setTimeout(() => {
            lifeChoice.lifeChoices[index].selected = true;

            // Play the ping sound... maybe do a different sound for each category?
            pingSound.cloneNode().play();

            // Resolve the promise. I would have done this differently too - but building on sand
            resolve();
        }, idx * 1000); // 1000 ms delay between each selection
    });
});
Promise.all(promises).then(() => {
        // find all the selected life choices, their name and their parent title
        const selectedLifeChoices = this.lifeChoices.reduce((acc, lifeChoice) => {
          const selectedLifeChoice = lifeChoice.lifeChoices.find(lifeChoice => lifeChoice.selected);
          acc.push({ title: lifeChoice.title, name: selectedLifeChoice.name });
          return acc;
        },[])

        const messageParts = selectedLifeChoices.map(lifeChoice => {
            switch (lifeChoice.title) {
              case 'Occupation':
                return `You will be a ${lifeChoice.name}.`;
              case 'Transportation':
                return `You will travel by ${lifeChoice.name}.`;
              case 'Celebrity Spouse':
                return `You will marry ${lifeChoice.name}.`;
              case 'Pet':
                return `You will have a ${lifeChoice.name} as a pet.`;
              case 'Hometown':
                return `You will live in ${lifeChoice.name}.`;
              case 'Superpower':
                return `You will have the superpower of ${lifeChoice.name}.`;
              case 'Best Friend':
                return `Your best friend will be ${lifeChoice.name}.`;
              case 'Holiday Destination':
                return `You will go on holiday to ${lifeChoice.name}.`;
              default:
                return '';
            }
          });
        
          // Set the message - but delay it by a second...
          setTimeout(() => {
            this.message = messageParts.join(' ');
        }, 1000);


    });
    },
    // this is pointless - just there to display something on the screen
    // it did have greater purpose in a previous iteration
    getMagicNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // should have really disbled the buttons that are already selected... but checking for duplicates
    chooseCategory(categoryTitle) {
        const maxCategories = 4; // cos you might want to make a mega grid one day.... or not
      
        // Check if the categoryTitle already exists
        const isDuplicate = this.lifeChoices.some(lifeChoice => lifeChoice.title === categoryTitle);
        // using a set below to prevent duplicates... doing something different here
        if (!isDuplicate && this.maxCategoryCounter < maxCategories) {
          this.lifeChoices.push({ title: categoryTitle, lifeChoices: [] });
          this.maxCategoryCounter++; // increment the counter
      
          if (this.maxCategoryCounter === maxCategories) {
           
            // this needs a refactor cos I decided to add sound effects and fiddle with time etc. It comes in far too quickly
                this.pluckRandomLifeChoices(); // defaults to 4... but you could have a massive list of life choices
                // set MagicNumber up here - but it does nothing...
                this.magicNumber = this.getMagicNumber(3, 10);
           
          }
        }
      },
    pluckRandomLifeChoices() {
        const getRandomLifeChoices = (availableLifeChoices, count = 4) => {
            const lifeChoices = [];
            const indices = new Set();
           // using set here because it doesn't allow duplicates... "just because" - which isnt a good reason...
            while (indices.size < count) {
              const randomIndex = Math.floor(Math.random() * availableLifeChoices.length);
              indices.add(randomIndex);
            }
          
            for (const index of indices) {
              lifeChoices.push({ name: availableLifeChoices[index], selected: false });
            }
          
            return lifeChoices;
          };
          
          this.lifeChoices.forEach((lifeChoice) => {
            const matchingCategory = this.categories.find(category => category.title === lifeChoice.title);
            lifeChoice.lifeChoices = getRandomLifeChoices(matchingCategory.lifeChoices);
          });
    },
  },
};

Vue.createApp(App).mount("#app");
