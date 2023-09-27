import { initTabs } from "./tabs.js";
import * as member from "./member.js"
import * as result from "./result.js"

window.addEventListener("load", initApp);

const members = [];
const results = [];

function findMemberObject(id) {
  members.find(checkId);

  function checkId(member) {
    return member.id === id;
  }
}

async function initApp() {
  initTabs();

  // TODO: Make the rest of the program ...
  await buildMembersList();
  await buildResultsList();

  // members.sort((a, b) => a.age - b.age);
  members.sort((a, b) => a.name.localeCompare(b.name));
  results.sort((a, b) => a._time - b._time);

  displayMembers(members);
  displayResults(results);

  console.log(members);
  console.log(results);
}

//fetch members
async function fetchMembers() {
  const resp = await fetch("./data/members.json");
  const data = await resp.json();
  return data;
}

async function buildMembersList() {
  const originalObjects = await fetchMembers();

  for (const orgobj of originalObjects) {
    const memberObj = member.constructMember(orgobj);
    members.push(memberObj);
  }
}

//fetch results
async function fetchResults() {
  const response = await fetch("./data/results.json");
  const data = response.json();

  return data;
}

async function buildResultsList() {
  const originalObjects = await fetchResults();

  for (const orgobj of originalObjects) {
    const resultObject = result.constructResult(orgobj);
    results.push(resultObject);
  }
}

//display members
function displayMembers(members) {
  const table = document.querySelector("table#members tbody");
  table.innerHTML = "";
  for (const member of members) {
    // console.log(member);
    const html = /*html*/ `
    <tr>
      <td>${member.name}</td>
      <td>${member.isActiveMember()}</td>
      <td>${member.birthday}</td>
      <td>${member.age}</td>
      <td>${member.isJunior()}</td>
      <!--<td>${member.isSenior()}</td>-->
      <!--<td>${member.email}</td>-->
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

//display results
function displayResults(results) {
  const table = document.querySelector("table#results tbody");
  table.innerHTML = "";

  for (const resultObject of results) {

    function competition() {
      if (resultObject.isCompeting()) {
        return `Stævne`;
      } else {
        return `Træning`;
      }
    }

    function disciplineToDanish() {
      let str = "";
      if (resultObject.discipline === "freestyle") {
        str = "Fri stil";
      } else if (resultObject.discipline === "breaststroke") {
        str = "Brystsvømning";
      } else if (resultObject.discipline === "backstroke") {
        str = "Rygsvømning";
      } else if (resultObject.discipline === "butterfly") {
        str = "Butterfly";
      }

      return str;
    }

    const htmlResult = /*html*/ `
            <tr>
                <td>${resultObject.date}</td>
                <td>${resultObject.memberId}</td>
                <td>${disciplineToDanish()}</td>
                <td>${competition()}</td>
                <td>${resultObject.time}</td>
            <tr>
        `;

    table.insertAdjacentHTML("beforeend", htmlResult);
  }
}

export { findMemberObject };