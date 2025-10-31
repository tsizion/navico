export class User {
  constructor({ firstName, lastName, email, phoneNumber, password, profilePicture }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.profilePicture = profilePicture || "default-profile.jpg";
  }
}
