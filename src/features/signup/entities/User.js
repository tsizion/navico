export class User {
  constructor({
    id = null,
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    profilePicture,
    emailVerified = false,
    token = null, // optional token
  }) {
    this.id = id; // optional
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.profilePicture = profilePicture || "default-profile.jpg";
    this.emailVerified = emailVerified; // assign value
    this.token = token; // optional
  }
}
