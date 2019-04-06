export class User {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public userId: string,
    public userName: string
  ) { }

  static fromJSON(json: Object): User {
    return new User(
      json['email'],
      json['firstName'],
      json['lastName'],
      json['userId'], json['firstName'] + ' ' + json['lastName']
    );
  }

  static fromList(list: Object[]): User[] {
    const users: User[] = [];
    list.map( item => {
      users.push(User.fromJSON(item));
    });
    return users;
  }
}

