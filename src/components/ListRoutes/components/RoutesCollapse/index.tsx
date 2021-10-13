import React from "react";

import { ListItemIcon, ListItem, Divider, ListItemText, List, Collapse } from "@mui/material";

export type RoutesCollapseType = {
    openChildren: {
        fatherIndex: number;
        selectedChildIndex: number;
        isOpen: boolean;
    };
    fatherId: number;
    item: {
        id: number;
        name: string;
        path: string;
        icon: string;
    }[];
    handleListItemClick: (
        index: number,
        path: string | undefined,
        hasChildren: boolean,
        fatherIndex: number
    ) => void;
};

const RoutesCollapse: React.FC<RoutesCollapseType> = (props: RoutesCollapseType) => {
    const { openChildren, fatherId, item, handleListItemClick } = props;
    return (
        <Collapse
            in={openChildren.fatherIndex == fatherId && openChildren.isOpen}
            timeout="auto"
            unmountOnExit
        >
            <List component="div" disablePadding>
                {item?.map((itemChildren) => {
                    return (
                        <ListItem
                            button
                            sx={{ pl: 3 }}
                            key={itemChildren?.id}
                            selected={openChildren.selectedChildIndex === itemChildren.id}
                            onClick={() =>
                                handleListItemClick(
                                    itemChildren.id,
                                    itemChildren.path,
                                    false,
                                    fatherId
                                )
                            }
                        >
                            <ListItemIcon>
                                <img
                                    src={itemChildren?.icon}
                                    width="30px"
                                    height="auto"
                                    alt="icon"
                                />
                            </ListItemIcon>
                            <ListItemText primary={itemChildren?.name} />
                        </ListItem>
                    );
                })}
            </List>
            <Divider />
        </Collapse>
    );
};

export default RoutesCollapse;
