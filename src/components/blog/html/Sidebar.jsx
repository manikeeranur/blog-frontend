import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useBlog } from "../context/BlogContext";
import { Link } from "react-scroll";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const { blogData } = useBlog();
  const toggleDrawer = (value) => () => {
    setOpen(value);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton>
              <em className="bi bi-filetype-html"></em> HTML Blog{" "}
            </ListItemButton>
          </ListItem>
          {blogData?.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <Link
                  to={item.menuName.replace(/\s+/g, "-")}
                  smooth={true}
                  duration={400}
                  offset={-80}
                  className="nav-link text-secondary text-capitalize cursor-pointer"
                >
                  HTML {item.menuName}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
