// interfaces/Story.ts
interface Story {
    id: string;
    image: string;
    user: string;
    viewed: boolean;
    viewers: Viewer[];
    reactions: Reaction[];
  }
  
  interface Viewer {
    userId: string;
    username: string;
  }
  
  interface Reaction {
    userId: string;
    emoji: string;
  }
  