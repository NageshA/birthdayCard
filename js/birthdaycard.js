//initialize random colors
var cardBgColors = [
  "#00897b",
  "#263238",
  "#aa00ff",
  "#3e2723",
  "#304ffe",
  "#00b8d4",
  "#00c853",
  "#ffd600",
  "#c51162"
];

let nameCard;
// set width and height of the day card
var cw = 183;
var birthdayList;
var weekdays;
var birthdayYear;

// function to cal nextsquareroot
function findNextSquareroot(count) {
  let n = Math.floor(Math.sqrt(count) + 1);
  return n * n;
}

// on document ready
$(document).ready(() => {
  birthdayList = eval($("#birthdayContent").val());
  displayCards();
});

//on update button click
function updateData() {
  birthdayYear = $("#birthdayYear").val();
  var startDate = new Date(`${birthdayYear}-01-01`);
  var endDate = new Date(`${birthdayYear}-31-12`);
  birthdayList = eval($("#birthdayContent").val()).filter(bl => {
    var birthDate = new Date(bl.birthday);
    return birthDate.getFullYear() === startDate.getFullYear();
  });
  displayCards();
}

//initialize the data on change of data
function initializeData() {
  weekdays = [
    { day: "SUN", birthdays: [] },
    { day: "MON", birthdays: [] },
    { day: "TUE", birthdays: [] },
    { day: "WED", birthdays: [] },
    { day: "THU", birthdays: [] },
    { day: "FRI", birthdays: [] },
    { day: "SAT", birthdays: [] }
  ];
  $(".birthday-card").html("");
}

//display card
function displayCards() {
  initializeData();

  birthdayList.map(item => {
    weekdays[new Date(item.birthday).getDay()].birthdays.push(item);
  });

  weekdays.map(week => {
    // cw = $(".day-card-person-list").width();
    // console.log()
    // $(".day-card-person-list").css({ height: cw + "px" });
    getName(week);
    $(".birthday-card").append(`<div class="day-card mx-2">
              <div class="day-card-header d-flex px-1 text-white">
                  <span class="ml-auto">${week.day}</span>
              </div>
              <div class="day-card-person-list bg-white d-flex flex-row flex-wrap align-content-start">
                  ${nameCard}
              </div>
              <div class="mt-2 birthday-count">${displayCount(
                week.birthdays
              )}</div>
          </div>
          `);
  });
}

//function to display count 
function displayCount(birthday) {
  let count = birthday.length;
  if (count > 0) {
    if (count > 1) {
      return `${birthday.length} birthdays`;
    } else {
      return `${birthday.length} birthday`;
    }
  } else {
    return "No birthdays";
  }
}

//get initials from the name 
function getInitials(name) {
  let nameArr = name.split(" ");
  if (nameArr.length >= 2) {
    return (
      nameArr[0].charAt(0).toUpperCase() + nameArr[1].charAt(0).toUpperCase()
    );
  } else {
    return nameArr[0].charAt(0).toUpperCase();
  }
}


// function findSquareWidth(count) {
//   let squareNumber;
//   if (Math.sqrt(count) % 1 === 0) {
//     squareNumber = count;
//   } else {
//     squareNumber = findNextSquareroot(count);
//   }
//   $(".child").css({
//     width: Math.sqrt((cw * cw) / squareNumber) + "px",
//     height: Math.sqrt((cw * cw) / squareNumber) + "px"
//   });
// }


function getName(week) {
  if (week.birthdays.length === 0) {
    nameCard = `<div
        class="d-flex align-items-center justify-content-center bg-none" style="width:${cw}px; height:${cw}px;"
        >
        --
        </div>`;
  } else {
    let squareNumber;
    let count = week.birthdays.length;
    if (Math.sqrt(count) % 1 === 0) {
      squareNumber = count;
    } else {
      squareNumber = findNextSquareroot(count);
    }
    nameCard = "";
    week.birthdays.map((birth, index) => {
      nameCard = `${nameCard}<div
              class="d-flex child align-items-center justify-content-center" style="
              background-color:${cardBgColors[index]};
              width: ${Math.sqrt((cw * cw) / squareNumber)}px;
              height: ${Math.sqrt((cw * cw) / squareNumber)}px"
              >
              ${getInitials(birth.name)}
              </div>`;
    });
  }
}
