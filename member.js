function constructMember(memberdata) {
  const Options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const MemberObject = {
    id: memberdata.id,
    name: memberdata.firstName,
    active: memberdata.isActiveMember,
    competitive: memberdata.isCompetitive,
    birthday: new Date(memberdata.dateOfBirth).toLocaleString("da-DK", Options),
    email: memberdata.email,
    gender: memberdata.gender,
    image: memberdata.image,
    hasPayed: memberdata.hasPayed,

    get fullName() {
      const fullName = `${this.name} ${memberdata.lastName}`

      return fullName;
    },

    get age() {
      const birthdateInMillisec = new Date(memberdata.dateOfBirth).getTime();
      const todayInMillisec = new Date().getTime();
      const ageInYears = Math.abs(Math.floor((birthdateInMillisec - todayInMillisec) / 1000 / 60 / 60 / 24 / 365));

      return ageInYears;
    },

    isJunior() {
      if (this.age >= 18) {
        return "Senior";
      } else {
        return "Junior";
      }
    },

    isSenior() {
      console.log();
      if (this.age < 18) {
        return "No";
      } else {
        return "Yes";
      }
    },

    isActiveMember() {
      if (this.active) {
        return `Aktiv`;
      } else {
        return `Zzz`;
      }
    },
  };

  Object.defineProperty(MemberObject, 'id', { writable: false });

  // console.log(memberdata);
  return MemberObject;
}

export { constructMember };