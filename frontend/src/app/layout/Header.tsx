import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" }
]

const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" }
]

const navStyles = {
    color: "inherit",
    typography: "h6",
    "&:hover": {
        color: "grey.500"
    },
    "&.active": {
        color: "text.secondary"
    },
    textDecoration: "none"

}

export default function Header({ darkMode, handleThemeChange }: Props) {
    const { basket } = useAppSelector(state => state.basket);
    const { user } = useAppSelector(state => state.account);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <Box display="flex" alignItems="center" >
                    <Typography variant="h6" component={NavLink}
                        to={"/"}
                        sx={navStyles}
                    >
                        RE-STORE
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                    <IconButton color="inherit">
                        {darkMode ? <Brightness2Icon /> : <WbSunnyIcon />}
                    </IconButton>
                </Box>



                <List sx={{ display: "flex" }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box display="flex" alignItems="center">
                    <IconButton component={Link} to="/basket" size="large" edge="start" color="inherit" sx={{ margin: 2 }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    {user ? (
                        <SignedInMenu />
                    ) : (
                        <List sx={{ display: "flex" }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Toolbar>
        </AppBar >
    )
}