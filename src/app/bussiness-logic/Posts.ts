export class Posts {
  constructor(
    public post_caption: string,
    public post_date: string,
    public user_id: string,
    public post_id: string,
    public likes: number,
    public dislikes: number

  ) { }

  static fromJSON(json: Object): Posts {
    return new Posts(
      json['post_caption'],
      json['post_date'],
      json['post_id'],
      json['user_id'],
      0,
      0
    );
  }

  static fromList(list: Object[]): Posts[] {
    const users: Posts[] = [];
    list.map( item => {
      users.push(Posts.fromJSON(item));
    });
    return users;
  }
}

