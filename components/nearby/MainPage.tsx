import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ListFilter,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  MessageSquareDot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NearbyParentComponent from "./NearbyPage";
import { useState } from "react";
import { ModeToggle } from "../toggle/toggleButton";

interface DashboardProps {
  authInfo?: AuthUser;
  userData: User;
  localCoords: number[];
}

const Dashboard = ({ userData, authInfo, localCoords }: DashboardProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [sortKey, setSortKey] = useState("distance");
  const [reverse, setReverse] = useState(false);
  const [coords, setCoords] = useState<number[]>(localCoords);

  const handleSortChange = (key: string) => {
    setSortKey(key);
    setReverse(!reverse);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleLocationUpdate = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const latestCoords = [latitude, longitude];
        setCoords(latestCoords);
        document.cookie = `localCoords=${JSON.stringify(latestCoords)}`;
      },
      (error) => console.error("Geolocation error:", error)
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-16">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <div className="flex flex-col justify-between h-full">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="/"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Nearby</span>
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Home
                  </Link>
                  <Link
                    href="/chat"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <MessageSquareDot className="h-5 w-5" />
                    Chat
                  </Link>
                </nav>

                <nav className="mt-auto flex flex-col  gap-4 px-2 py-4 border-1 border-primary rounded-md w-full bg-secondary">
                  <div className="h-5 font-semibold flex gap-4 text-muted-foreground hover:text-foreground items-center">
                    <ModeToggle />
                    <span className="flex">Theme</span>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              onChange={handleInputChange}
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src={userData.avatar || userData.ai_avatar}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={"/" + userData.username}>
                <DropdownMenuItem>{userData.username}</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              {userData.anynomous ? (
                <Link href="/login">
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
              ) : (
                <Link href="/logout">
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="favourite" className="hidden sm:flex">
                  Favourite
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter by
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      onClick={() => handleSortChange("name")}
                    >
                      Name
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() => handleSortChange("distance")}
                    >
                      Distance
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  className="h-7 gap-1"
                  onClick={handleLocationUpdate}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Locate me
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-1">
                <CardHeader>
                  <CardTitle>People </CardTitle>
                  Find people around you.
                  <NearbyParentComponent
                    searchInput={searchInput}
                    sortKey={sortKey}
                    reverse={reverse}
                    authInfo={authInfo}
                    coords={coords}
                  />
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
