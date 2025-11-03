export class User {
  constructor({ id = null, firstName, lastName, email, phoneNumber, password, profilePicture }) {
    this.id = id; // optional
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.profilePicture = profilePicture || "default-profile.jpg";
  }
}
