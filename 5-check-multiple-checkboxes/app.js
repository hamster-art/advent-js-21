const episodes = [
  {
    id: 1,
    name: "James Q Quick's Origin Story",
  },
  {
    id: 2,
    name: "Amy Dutton's Origin Story",
  },
  {
    id: 3,
    name: "The Tech Behind Compressed.fm",
  },
  {
    id: 4,
    name: "Starting a New Development Project",
  },
  {
    id: 5,
    name: "How Do you Start a New Design Project?",
  },
  {
    id: 6,
    name: "Freelancing (Part 1)",
  },
  {
    id: 7,
    name: "Freelancing (Part 2)",
  },
  {
    id: 8,
    name: "The Tech Behind jamesqquick.com",
  },
  {
    id: 9,
    name: "Teh Tech Behind SelfTeach.me",
  },
  {
    id: 10,
    name: "Design Fundamentals (Part 1)",
  },
  {
    id: 11,
    name: "Design Fundamentals (Part 2)",
  },
  {
    id: 12,
    name: "Productivity: Tools, Tips, and Workflows",
  },
  {
    id: 13,
    name: "The Future of Code with No Code",
  },
  {
    id: 14,
    name: "Building the Perfect Desk Setup",
  },
  {
    id: 15,
    name: "Everything You Need to Know to Get Started in SvelteKit",
  },
  {
    id: 16,
    name: "Live Streaming for Beginners",
  },
  {
    id: 17,
    name: "All Things Automated",
  },
  {
    id: 18,
    name: "Amy Gives James a Design Consult",
  },
  {
    id: 19,
    name: "Figma for Everyone",
  },
  {
    id: 20,
    name: "Learning and Building in Public",
  },
  {
    id: 21,
    name: "Getting Your First Dev Job",
  },
  {
    id: 22,
    name: "Hiring a Designer or Getting Your First UI / UX Job",
  },
  {
    id: 23,
    name: "IRL Freelance Proposal",
  },
  {
    id: 24,
    name: "Getting Started on YouTube",
  },
  {
    id: 25,
    name: "Starting your own Podcast",
  },
  {
    id: 26,
    name: "How Blogging Can Change Your Career",
  },
  {
    id: 27,
    name: "Talking to Some of Our Favorite Content Creators",
  },
  {
    id: 28,
    name: "Our Favorite Things: A Crossover Episode with Web Dev Weekly",
  },
  {
    id: 29,
    name: "Freelancing IRL: Unveiling a Site Redesign",
  },
  {
    id: 30,
    name: "Wordpress in 2021",
  },
  {
    id: 31,
    name: "Struggle Bus",
  },
  {
    id: 32,
    name: "Getting Started with TypeScript",
  },
  {
    id: 33,
    name: "Small Design Tweaks that Make All the Difference",
  },
  {
    id: 34,
    name: "Getting git",
  },
  {
    id: 35,
    name: "Crossover Episode with Purrfect Dev",
  },
  {
    id: 36,
    name: "SVGs FTW",
  },
  {
    id: 37,
    name: "Building a Course",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const episodesBox = document.querySelector(".episodes");
  const allCheckbox = document.querySelector("#episodes-all");

  let uncheckedCheckboxes;

  function createEpisodes(item) {
    return `<li>
          <label for="episode-${item.id}">
            <input type="checkbox" name="episode-${item.id}" id="episode-${item.id}" />
            <span>${item.id} || ${item.name}</span>
          </label>
        </li>`;
  }

  function check(checkboxes, isChecked) {
    checkboxes.forEach((item) => {
      item.checked = isChecked;
    });
  }

  function getUnchecked() {
    uncheckedCheckboxes = [...checkboxes].filter(item => item.checked === false)
  }

  episodes.forEach((item) => {
    episodesBox.innerHTML += createEpisodes(item);
  });

  const checkboxes = episodesBox.querySelectorAll('[type="checkbox"]');

  getUnchecked();

  allCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      check(checkboxes, true);
    } else {
      check(checkboxes, false);
    }
    getUnchecked();
  });

  document.addEventListener("keyup", (e) => {
    let checkedIndexes = [];

    if (e.key === "Shift") {
      uncheckedCheckboxes.forEach((item, i) => {
        if (item.checked) {
          checkedIndexes.push(i);
        }
      });


      const minInd = Math.min(...checkedIndexes);
      const maxInd = Math.max(...checkedIndexes);

      const shouldBeChecked = [...uncheckedCheckboxes].slice(
          minInd,
          maxInd
      );

      check(shouldBeChecked, true);
      getUnchecked();
    }
  });
});
