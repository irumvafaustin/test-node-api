// class Person
// {
//     constructor(name){
//         this.name=name;

//     }
//     getName(){
//         return this.name;
//     }
//     setName(newName){
//         newName = newName.trim();
//         if (newName === ''){
//             throw 'the new name cannot be empty';

//         }
// this.name = newName
//     }
// }
// let john = new Person('faustin');
// console.log(john);

// john.setName('faustin irumva');

// console.log(john.getName());



// let meeting = {
//     attendees: [],
//     add(attendee) {
//         console.log(`${attendee} joined the meeting.`);
//         this.attendees.push(attendee);
//         return this;
//     },
//     get latest() {
//         let count = this.attendees.length;
//         return count == 0 ? undefined : this.attendees[count - 1];
//     }
// };

// meeting.add('John').add('Jane').add('Peter');
// console.log(`The latest attendee is ${meeting.latest}.`);

