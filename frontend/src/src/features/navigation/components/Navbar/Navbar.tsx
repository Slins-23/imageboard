import {
    faHouse,
    faTags,
    faGear,
    faMessage,
    faBell,
} from "@fortawesome/free-solid-svg-icons";
import CreatePostBtn from "./CreatePostBtn";
import SearchIconBtn from "./SearchIconBtn";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import UserMenuBtn from "./UserMenuBtn";
import LinkButton from "../LinkButton/LinkButton";

export default function Navbar() {
    const isSignedIn = true;

    return (
        <div style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <nav
                style={{
                    display: "flex",
                    marginTop: "10px",
                    marginLeft: "10px",
                    marginRight: "10px",
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                    }}
                >
                    <LinkButton
                        route="/"
                        icon={faHouse}
                        width="50px"
                        height="50px"
                        iconSize="25px"
                    />
                    <LinkButton
                        route="/tags"
                        icon={faTags}
                        width="50px"
                        height="50px"
                        iconSize="25px"
                    />

                    {isSignedIn && (
                        <LinkButton
                            route="/user/settings/profile"
                            parentRoute="/user/settings/"
                            icon={faGear}
                            width="50px"
                            height="50px"
                            iconSize="25px"
                        />
                    )}
                </div>

                <SearchIconBtn />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                    }}
                >
                    {isSignedIn && <CreatePostBtn />}
                    {isSignedIn && (
                        <IconButton
                            hasNotifications={true}
                            notificationProps={{
                                defaultCount: 32,
                            }}
                            icon={faMessage}
                            width="50px"
                            height="50px"
                            iconSize="25px"
                        />
                    )}
                    {isSignedIn && (
                        <IconButton
                            hasNotifications={true}
                            notificationProps={{
                                defaultCount: 55,
                            }}
                            icon={faBell}
                            width="50px"
                            height="50px"
                            iconSize="25px"
                        />
                    )}

                    <UserMenuBtn />
                </div>
            </nav>
        </div>
    );
}
