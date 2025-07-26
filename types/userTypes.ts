interface User {
  _id: {
    $oid: string;
  };
  name: string;
  mobile: string;
  email: string;
  receive_mail: string;
  created_at: string;
  password: string;
  privacy: string;
  updated_at: string;
  coordinates: number[];
  summary: string;
  avatar: string;
  ai_avatar: string;
  country: string;
  gender: string;
  interests: string[];
  personality: string[];
  token: string;
  username: string;
  anynomous: boolean;
}

interface AuthUser {
  _id: {
    $oid: string;
  };
  token: string;
}

interface NearbyUser {
  id: number;
  room: string;
  name: string;
  summary: string;
  avatar: string;
  distance: number;
  ai_avatar: string;
  username: string;
  interests: string[];
  personality: string[];
}
