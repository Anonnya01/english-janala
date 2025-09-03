function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const createElements = (arr)=>{
    const elements =arr.map(el=> `<span class="btn  bg-[#EDF7FF]">${el}</span>`)
    return(elements.join(" "));  
}

// ---loading----//
const manageSpin =(status)=>{
    if(status == true){
        document.getElementById("spinner")
        .classList.remove("hidden")
        document.getElementById("word-container")
        .classList.add("hidden")
    }
    else{
         document.getElementById("word-container")
        .classList.remove("hidden")
        document.getElementById("spinner")
        .classList.add("hidden")
    }
}

const loadLessons = () => {
  // promis of response
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json()) //promise of json data
    .then((data) => displayLesson(data.data));
};
 
const removeActive=()=>{
    const lessonButtons= document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons);
    lessonButtons.forEach(btn=> btn.classList.remove("active"))
    
}

// ----------for words----------//
const loadLevelWord = (id) => {
    manageSpin(true)
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        const clickedBtn =document.getElementById(`lesson-btn-${id}`)
        // console.log(clickedBtn);
        clickedBtn.classList.add("active")
        displayLevelWord(data.data)
    });
};

const loadWordDetail= async(id) => {
   const url = `https://openapi.programming-hero.com/api/word/${id}`
   console.log(url);
   const res=await fetch(url)
   const details = await res.json()
   dispayDetails(details.data);
}

const dispayDetails= (word)=>{
 console.log(word);
 const detailBox =document.getElementById("details-container")
 detailBox.innerHTML=`
 
 <div class="">
            <h2 class="font-bold text-2xl">
              ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold ">
              Meaning
            </h2>
            <h3>${word.meaning}</h3>
          </div>
          <div class="">
            <h2 class="font-bold ">
              Example
            </h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold mb-4  ">
              সমার্থক শব্দ গুলো
            </h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
 `
 document.getElementById("my_modal_5").showModal()
}

const displayLevelWord = (words) => {
  const wordCont = document.getElementById("word-container");
  wordCont.innerHTML=""
  if(words.length == 0){
    wordCont.innerHTML=`
    <div class="text-center col-span-full py-10">
         <img src="assets/alert-error.png" class=" mx-auto" alt="">
        <p class="text-[#79716B] font-bangla text-sm mb-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h3 class="text-[34px] font-bangla  font-semibold ">নেক্সট Lesson এ যান</h3>
     </div>
    `
    manageSpin(false)
    return
  }
  words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
      <div
        class="bg-white rounded-xl shadow-sm text-center pt-10 py-6 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${word.word ? word.word: "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="font-bangla text-2xl font-medium">"${word.meaning ? word.meaning : " অর্থ পাওয়া যায়নি"  }
        / ${word.pronunciation? word.pronunciation : " অর্থ পাওয়া যায়নি" }"</div>
        <div class="flex justify-between items-center">

          <button onClick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>

          </button>
          <button onClick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordCont.append(card);
  });
  manageSpin(false)
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
         <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" 
         class="btn btn-outline btn-primary lesson-btn"
                ><i class="fa-solid fa-book-open"></i>
                Lesson - ${lesson.level_no}</button>
        
        `;
    // 4.append
    levelCont.append(btnDiv);
  }
};

loadLessons();


// -----------for search----------//

document.getElementById("search-btn")
.addEventListener("click",()=>{
    removeActive()
    const input=document.getElementById("input-search")
    const searchVal=input.value.trim().toLowerCase()
    console.log(searchVal);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res=>res.json())
    .then(data =>{
        const allWord=data.data
        console.log(allWord)
        const filterWords=allWord.
        filter(word=>word.word.toLowerCase().includes(searchVal))
        // console.log(filterWords);
        displayLevelWord(filterWords)
        
    })
    
})




