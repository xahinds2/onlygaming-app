import { useRouter } from "next/navigation";

const NearbyUsers: React.FC<{ nearbyUsers: any[] }> = ({ nearbyUsers }) => {
	const router = useRouter()
	 function goToChat(room_id:any){
		router.push(`/chat/?room_id=${room_id}`)
		return;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-7xl mt-16 font-bold mb-4 text-center ">Nearby Users</h1>
			<ul className="divide-y divide-gray-700">
				{nearbyUsers.map((user, index) => (
					<li key={index} className="py-4 flex justify-between items-center">
						<div className="flex-1">

							<div className="flex justify-between ">
								<h3 className=" text-xl">{user.name}</h3>
								<div className="flex justify-center items-center flex-col mr-8">
									<p>({user.distance.toFixed(2)} km) </p>
								</div>
							</div>
						</div>
						<div>
							<button onClick={() => goToChat(user.room)} className="px-4 py-2 bg-green-500 text-white rounded">Chat</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NearbyUsers;