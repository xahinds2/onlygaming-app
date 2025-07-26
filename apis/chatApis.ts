export async function fetchRooms(user_id: string, searchInput: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/nearby/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, name: searchInput }),
      }
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
}

export async function fetchMessageByRoomId(
  token: string,
  selectedRoom: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PRO}://${process.env.NEXT_PUBLIC_API_URL}/api/chat/${selectedRoom}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch messages");
  }
}
