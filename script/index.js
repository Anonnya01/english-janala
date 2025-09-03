const loadLessons = () => {
  // promis of response
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json()) //promise of json data
    .then((data) => displayLesson(data.data));
};
// ----------for words----------//
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};


const displayLevelWord = (words) => {
  const wordCont = document.getElementById("word-container");
  wordCont.innerHTML=""
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
      <div
        class="bg-white rounded-xl shadow-sm text-center pt-10 py-6 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="font-bangla text-2xl font-medium">"${word.meaning}/ ${word.pronunciation}"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordCont.append(card);
  });
};

const displayLesson = (lessons) => {
  // 1.get container-----//
  const levelCont = document.getElementById("level-container");
  levelCont.innerHTML = "";
  //  2.get into every lessons
  for (let lesson of lessons) {
    // console.log(lesson);

    // 3.create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
         <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>
                Lesson - ${lesson.level_no}</button>
        
        `;
    // 4.append
    levelCont.append(btnDiv);
  }
};

loadLessons();
