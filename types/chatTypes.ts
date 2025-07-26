export interface Message {
  content: string;
  sender: string;
  type: string;
  sender_id: string;
}

export interface Room {
  _id: {
    $oid: string;
  };
  room: string;
  avatar: string;
  ai_avatar: string;
  name: string;
  distance: number;
  username: string;
}
