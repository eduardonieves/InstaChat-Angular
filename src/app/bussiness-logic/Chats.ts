export class Chats {
  constructor(
    public chat_id: string,
    public chat_name: string,
    public owner_id: string,
    public number_of_users: string,

  ) { }

  static fromJSON(json: Object): Chats {
    return new Chats(
      json['chat_id'],
      json['chat_name'],
      json['owner_id'],
      json['number_of_users']
    );
  }

  static fromList(list: Object[]): Chats[] {
    const users: Chats[] = [];
    list.map( item => {
      users.push(Chats.fromJSON(item));
    });
    return users;
  }
}

