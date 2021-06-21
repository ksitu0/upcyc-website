let tresholds = new Array(50);
for(let i=0; i<50; i++){
	tresholds[i] = i/50;
}

const areaEntryOptions = {
  rootMargin: '0px',
  threshold: tresholds,
}




// demo entry
const demoRight = document.querySelector('#demo-right');
const appearDemo = (entries, observer) => {
	entries.map((entry) => {
		if (entry.intersectionRatio <= 0.2) {
			entry.target.style.opacity= 0.0;
		} else {
			entry.target.style.opacity=1.0;
		}
	});
};
const demoObserver = new IntersectionObserver(appearDemo, areaEntryOptions);
demoObserver.observe(demoRight);


// new item entry
const lastAd = document.querySelector('#demo-left > div:last-child');
const newItem = document.querySelector('#new-item');
const oldItem = document.querySelector('#old-item');
const newItemEntryOptions = {
  rootMargin: '0px',
  threshold: tresholds,
}

var intHeight = 0.9*window.innerHeight;
const callback = (entries, observer) => {
    entries.map((entry) => {
		 if (entry.intersectionRatio >= 0.35) {
			newItem.style.opacity=1.0;
			demoRight.style.backgroundColor="#FFFFFF";
		} else if(entry.intersectionRect.bottom > intHeight) {
			if (entry.intersectionRatio <= 0.1) {
				newItem.style.opacity=0.0;
				demoRight.style.backgroundColor="#000000";
			} else {
				newItem.style.opacity=4*(entry.intersectionRatio-0.1);
				let bgColor = Math.floor(256*4*(entry.intersectionRatio-0.1));
				demoRight.style.backgroundColor="#"+bgColor.toString(16)+bgColor.toString(16)+bgColor.toString(16);
			}
		}
    });
};

const newItemObserver = new IntersectionObserver(callback, newItemEntryOptions);
newItemObserver.observe(lastAd);

// info entry
const pictures = document.querySelectorAll('.cols-3 > *');	
const infoDescription = document.querySelector('#info-description');
const appearColumns = (entries, observer) => {
	entries.map((entry) => {
		if (entry.intersectionRatio <= 0.7) {
			entry.target.style.opacity= 0.0;
			entry.target.style.paddingTop= '5vh';
			entry.target.style.paddingBottom= 0;
		} else {
			entry.target.style.opacity=1.0;
			entry.target.style.paddingTop=0;
			entry.target.style.paddingBottom= '5vh';
		}
	});
};
const columnsObserver = new IntersectionObserver(appearColumns, areaEntryOptions);
pictures.forEach( pic => columnsObserver.observe(pic));
columnsObserver.observe(infoDescription);

// PUTTING YALLS BEAUTIFUL FACES ON THERE
var teamList = document.querySelector('#team-list');
membersData.forEach((person) => {
	addPerson(person.fName + " " + person.lName, "assets/teamInfo/" + person.profile, person.role);
});

function addPerson(fullName, profile, role) {
	teamList.innerHTML += `<div class="person">
				<img class="profile-pic" src="` + profile + `">
				<div class="body opensans centered">` + fullName + `</div>
				<div class="body opensans centered">` + role + `</div>
			</div>`
}