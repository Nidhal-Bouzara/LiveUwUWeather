console.log('hello world!');
const autocomplete = async (input, apikey) => {
  const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${input}`);
  if (!response.ok) {
    return 'error';
  }
  const data = await response.json();
  return data;
}
// current weather
const getWeather = async (id, apikey) => {
  const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${apikey}`);
  const data = await response.json();
  return data;
}

function User(name, pass) {
  this.username = name;
  this.password = pass;
  this.arnold = null;
}

// User.prototype.logIn = () {
//   console.log(`${this.username} has logged in`);
// }
// User.prototype.logOut = () {
//   console.log(`${this.username} has logged out`);
// }
 Admin(name, pass, title){
   User.call(this, name, pass);
   this.title = title;
 }
 Admin.prototype = Object.create(User.prototype);

 class User {
   constructor(name, pass) {
     this.username = name;
     this.password = pass;
     this.arnold = null;
   }
   function logIn() {
     console.log(`${this.username} has logged in`);
   }
   function logOut() {
     console.log(`${this.username} has logged out`);
   }
 }

class Admin extends User {
  constructor(name, pass, title) {
    super(name, pass);
    this.title = title
  }
  function bark() {
    console.log(`${this.title} barks!!`);
  }
}
